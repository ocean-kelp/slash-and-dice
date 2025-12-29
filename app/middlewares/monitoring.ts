import { Context } from "fresh";
import { isClient } from "@/utilities/enviroments.ts";
import { isDev } from "@/utilities/enviroments.ts";
import { logger } from "@/utilities/logger.ts";
import { appConfig } from "@/utilities/config.ts";

interface RequestMetrics {
  id?: number;
  method: string;
  path: string;
  duration: number;
  status: number;
  timestamp: string;
  memory?: {
    heapUsed: number;
    heapTotal: number;
    external: number;
    rss?: number;
  };
}

// In-memory metrics store (last N requests)
const recentRequests: RequestMetrics[] = [];
let nextRequestId = 1;

// Configure maximum stored requests from `appConfig` (server-side)
const MAX_STORED_REQUESTS = appConfig.metricsMaxRequests;

// Running aggregates (lifetime since process start)
let aggCount = 0;
let aggMean = 0; // Welford mean
let aggM2 = 0; // Welford sum of squares of differences
let aggMaxDuration = 0;
let aggTotalRequests = 0;
let aggErrorCount = 0;
const aggStatusCodes: Record<number, number> = {};

/**
 * Monitoring middleware that logs request metrics and resource usage.
 * Tracks: request duration, status codes, memory usage, and response sizes.
 */
export async function monitoringMiddleware(
  req: Request,
  ctx: Context<unknown>,
) {
  // Skip on client
  if (isClient()) {
    return await ctx.next();
  }

  const startTime = performance.now();

  try {
    // Process the request
    const response = await ctx.next();

    // Calculate metrics
    const duration = performance.now() - startTime;
    const endMemory = Deno.memoryUsage?.();

    const metrics: RequestMetrics = {
      id: nextRequestId++,
      method: req.method,
      path: new URL(req.url).pathname,
      duration: Math.round(duration * 100) / 100, // Round to 2 decimals
      status: response.status,
      timestamp: new Date().toISOString(),
      memory: endMemory
        ? {
          heapUsed: Math.round(endMemory.heapUsed / 1024 / 1024 * 100) / 100, // MB
          heapTotal: Math.round(endMemory.heapTotal / 1024 / 1024 * 100) / 100, // MB
          external: Math.round(endMemory.external / 1024 / 1024 * 100) / 100, // MB
          // rss might not be available in all runtimes; include if present
          rss: typeof endMemory.rss === "number"
            ? Math.round(endMemory.rss / 1024 / 1024 * 100) / 100
            : undefined,
        }
        : undefined,
    };

    // Store metrics
    recentRequests.push(metrics);
    if (recentRequests.length > MAX_STORED_REQUESTS) {
      recentRequests.shift();
    }

    // Update running aggregates (Welford for stable mean/stddev)
    aggTotalRequests += 1;
    const x = metrics.duration;
    aggCount += 1;
    const delta = x - aggMean;
    aggMean += delta / aggCount;
    const delta2 = x - aggMean;
    aggM2 += delta * delta2;
    if (x > aggMaxDuration) aggMaxDuration = x;
    if (metrics.status >= 400) aggErrorCount += 1;
    aggStatusCodes[metrics.status] = (aggStatusCodes[metrics.status] || 0) + 1;

    // Log slow requests (> 1000ms)
    if (duration > 1000) {
      logger.warn({
        tag: "SLOW REQUEST",
        method: metrics.method,
        path: metrics.path,
        duration: `${duration}ms`,
      });
    }

    // Log errors
    if (response.status >= 500) {
      logger.error({
        tag: "ERROR",
        method: metrics.method,
        path: metrics.path,
        status: metrics.status,
      });
    }

    // Log every request in development
    if (isDev()) {
      logger.debug({
        tag: "REQ",
        method: metrics.method,
        path: metrics.path,
        status: metrics.status,
        duration: `${duration}ms`,
      });
    }

    return response;
  } catch (error) {
    const duration = performance.now() - startTime;
    logger.error({
      tag: "EXCEPTION",
      method: req.method,
      path: new URL(req.url).pathname,
      duration: `${duration}ms`,
      error,
    });
    throw error;
  }
}

/**
 * Get metrics summary for the last N requests
 */
export function getMetricsSummary(limit = 100) {
  const requests = recentRequests.slice(-limit);

  if (requests.length === 0) {
    return {
      totalRequests: 0,
      avgDuration: 0,
      slowestRequest: null,
      errorRate: 0,
      statusCodes: {},
      memoryUsage: null,
    };
  }

  const durations = requests.map((r) => r.duration);
  const avgDuration = durations.reduce((a, b) => a + b, 0) / durations.length;
  const slowestRequest = requests.reduce((prev, current) =>
    prev.duration > current.duration ? prev : current
  );

  const statusCodes: Record<number, number> = {};
  requests.forEach((r) => {
    statusCodes[r.status] = (statusCodes[r.status] || 0) + 1;
  });

  const errors = requests.filter((r) => r.status >= 400).length;
  const errorRate = (errors / requests.length) * 100;

  const latestMemory = requests[requests.length - 1]?.memory;

  // Compute percentile helpers (based on recent requests window)
  function percentile(arr: number[], p: number) {
    if (!arr.length) return 0;
    const sorted = arr.slice().sort((a, b) => a - b);
    const idx = Math.ceil(p * sorted.length) - 1;
    return sorted[Math.max(0, Math.min(sorted.length - 1, idx))];
  }

  // RPS over last 60 seconds (using recentRequests timestamps)
  const now = Date.now();
  const last60sCount = requests.filter((r) => {
    const t = new Date(r.timestamp).getTime();
    return t >= now - 60_000;
  }).length;
  const rps = Math.round((last60sCount / 60) * 100) / 100;

  const p95 = percentile(durations, 0.95);
  const p99 = percentile(durations, 0.99);

  // Lifetime aggregates (since process start)
  const lifetimeAvg = aggCount ? Math.round(aggMean * 100) / 100 : 0;
  const lifetimeStd = aggCount > 1
    ? Math.round(Math.sqrt(aggM2 / (aggCount - 1)) * 100) / 100
    : 0;
  const lifetimeErrorRate = aggTotalRequests
    ? Math.round(aggErrorCount / aggTotalRequests * 100 * 100) / 100
    : 0;

  return {
    // Summary based on recent requests (last `limit`)
    totalRequests: requests.length,
    avgDuration: Math.round(avgDuration * 100) / 100,
    slowestRequest: {
      path: slowestRequest.path,
      duration: slowestRequest.duration,
      timestamp: slowestRequest.timestamp,
    },
    errorRate: Math.round(errorRate * 100) / 100,
    statusCodes,
    memoryUsage: latestMemory,

    // Lifetime summary (since process start)
    lifetimeSummary: {
      totalRequests: aggTotalRequests,
      avgDuration: lifetimeAvg,
      stddevDuration: lifetimeStd,
      maxDuration: aggMaxDuration,
      errorRate: lifetimeErrorRate,
      statusCodes: { ...aggStatusCodes },
    },
    // Additional computed metrics based on recent window
    rps,
    p95,
    p99,
  };
}

/**
 * Get all recent requests (for detailed analysis)
 */
export function getRecentRequests(limit = 100) {
  return recentRequests.slice(-limit);
}

/**
 * Return a compact summary for recent error requests.
 * Each item contains `id`, `method`, `path`, `status`, `duration`, `timestamp`.
 */
export function getRecentErrorSummaries(limit = 100) {
  // iterate from newest to oldest and pick errors
  const out: Array<{
    id: number;
    method: string;
    path: string;
    status: number;
    duration: number;
    timestamp: string;
  }> = [];

  for (let i = recentRequests.length - 1; i >= 0 && out.length < limit; i--) {
    const r = recentRequests[i];
    if (r.status >= 400) {
      out.push({
        id: r.id ?? -1,
        method: r.method,
        path: r.path,
        status: r.status,
        duration: r.duration,
        timestamp: r.timestamp,
      });
    }
  }

  return out;
}

/**
 * Return full RequestMetrics by id or null if not found.
 */
export function getRequestById(id: number) {
  if (typeof id !== "number" || Number.isNaN(id)) return null;
  // linear scan (buffer expected small); could be optimized with map if needed
  for (let i = recentRequests.length - 1; i >= 0; i--) {
    const r = recentRequests[i];
    if (r.id === id) return r;
  }
  return null;
}

// Cached summary for on-demand admin views. Cache is populated when
// `getCachedMetrics` is called and refreshed only when TTL expires or
// when explicitly forced. This prevents expensive recomputation on the
// hot request path.
let cachedSummary: {
  value: ReturnType<typeof getMetricsSummary> | null;
  ts: number;
} = { value: null, ts: 0 };
const SUMMARY_TTL = 5_000; // ms

/**
 * Return cached metrics summary. If `force` is true or cache is stale,
 * recompute once and update cache.
 */
export function getCachedMetrics(limit = 100, force = false) {
  const now = Date.now();
  if (!force && cachedSummary.value && now - cachedSummary.ts < SUMMARY_TTL) {
    return { summary: cachedSummary.value, lastRefresh: cachedSummary.ts };
  }

  const v = getMetricsSummary(limit);
  cachedSummary = { value: v, ts: Date.now() };
  return { summary: v, lastRefresh: cachedSummary.ts };
}

export function invalidateCachedMetrics() {
  cachedSummary = { value: null, ts: 0 };
}
