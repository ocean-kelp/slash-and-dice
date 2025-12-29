import { Context } from "fresh";
import { isClient } from "@/utilities/enviroments.ts";
import { isDev } from "@/utilities/enviroments.ts";
import { logger } from "@/utilities/logger.ts";

interface RequestMetrics {
  method: string;
  path: string;
  duration: number;
  status: number;
  timestamp: string;
  memory?: {
    heapUsed: number;
    heapTotal: number;
    external: number;
  };
}

// In-memory metrics store (last 100 requests)
const recentRequests: RequestMetrics[] = [];
const MAX_STORED_REQUESTS = 100;

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
        }
        : undefined,
    };

    // Store metrics
    recentRequests.push(metrics);
    if (recentRequests.length > MAX_STORED_REQUESTS) {
      recentRequests.shift();
    }

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

  return {
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
  };
}

/**
 * Get all recent requests (for detailed analysis)
 */
export function getRecentRequests(limit = 100) {
  return recentRequests.slice(-limit);
}
