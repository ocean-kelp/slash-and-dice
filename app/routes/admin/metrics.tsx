import { define } from "@/utils.ts";
import { PageProps } from "fresh";
import {
  getMetricsSummary,
  getRecentRequests,
} from "@/middlewares/monitoring.ts";
import { appConfig } from "@/utilities/config.ts";

/**
 * Admin metrics dashboard - shows resource consumption and performance data
 * Access: /admin/metrics?key=YOUR_SECRET_KEY
 * Authentication handled by admin/_middleware.ts
 */
export const handler = define.handlers({
  GET(_ctx) {
    const summary = getMetricsSummary(100);
    const recentRequests = getRecentRequests(20);
    const maxStoredRequests = appConfig.metricsMaxRequests;

    return {
      data: { summary, recentRequests, maxStoredRequests },
    };
  },
});

export default function MetricsPage(
  { data }: PageProps<{
    summary: ReturnType<typeof getMetricsSummary>;
    recentRequests: ReturnType<typeof getRecentRequests>;
    maxStoredRequests: number;
  }>,
) {
  const { summary, recentRequests } = data;

  return (
    <div class="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-6 lg:p-8">
      <div class="max-w-7xl mx-auto">
        {/* Header */}
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-white mb-2">
            Resource Monitoring Dashboard
          </h1>
          <p class="text-gray-400">
            Real-time performance and resource consumption metrics
          </p>
        </div>

        {/* Summary Cards */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div class="text-sm text-gray-400 mb-1">Total Requests</div>
            <div class="text-3xl font-bold text-white">
              {summary.totalRequests}
            </div>
          </div>

          <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div class="text-sm text-gray-400 mb-1">Avg Duration</div>
            <div class="text-3xl font-bold text-blue-400">
              {summary.avgDuration}ms
            </div>
          </div>

          <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div class="text-sm text-gray-400 mb-1">RPS (1m)</div>
            <div class="text-3xl font-bold text-green-400">{summary.rps}</div>
          </div>

          <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div class="text-sm text-gray-400 mb-1">Latency (P95 / P99)</div>
            <div class="text-3xl font-bold text-yellow-400">
              {summary.p95}ms / {summary.p99}ms
            </div>
          </div>

          <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div class="text-sm text-gray-400 mb-1">Error Rate</div>
            <div class="text-3xl font-bold text-red-400">
              {summary.errorRate}%
            </div>
          </div>

          <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div class="text-sm text-gray-400 mb-1">Memory Used</div>
            <div class="text-3xl font-bold text-purple-400">
              {summary.memoryUsage?.heapUsed ?? "N/A"}
              {summary.memoryUsage ? " MB" : ""}
            </div>
          </div>
        </div>

        {/* Lifetime Summary (since process start) */}
        {summary.lifetimeSummary && (
          <div class="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
            <h2 class="text-xl font-bold text-white mb-4">Lifetime Summary</h2>
            <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div class="p-4 bg-gray-900/40 rounded">
                <div class="text-sm text-gray-400">Total Requests</div>
                <div class="text-2xl font-bold text-white">
                  {summary.lifetimeSummary.totalRequests}
                </div>
              </div>

              <div class="p-4 bg-gray-900/40 rounded">
                <div class="text-sm text-gray-400">Avg Duration</div>
                <div class="text-2xl font-bold text-blue-400">
                  {summary.lifetimeSummary.avgDuration}ms
                </div>
              </div>

              <div class="p-4 bg-gray-900/40 rounded">
                <div class="text-sm text-gray-400">Std Dev</div>
                <div class="text-2xl font-bold text-blue-300">
                  {summary.lifetimeSummary.stddevDuration}ms
                </div>
              </div>

              <div class="p-4 bg-gray-900/40 rounded">
                <div class="text-sm text-gray-400">Max Duration</div>
                <div class="text-2xl font-bold text-yellow-400">
                  {summary.lifetimeSummary.maxDuration}ms
                </div>
              </div>

              <div class="p-4 bg-gray-900/40 rounded">
                <div class="text-sm text-gray-400">Error Rate</div>
                <div class="text-2xl font-bold text-red-400">
                  {summary.lifetimeSummary.errorRate}%
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Memory Details */}
        {summary.memoryUsage && (
          <div class="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
            <h2 class="text-xl font-bold text-white mb-4">Memory Usage</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div class="text-sm text-gray-400">Heap Used</div>
                <div class="text-2xl font-semibold text-purple-400">
                  {summary.memoryUsage.heapUsed} MB
                </div>
              </div>
              <div>
                <div class="text-sm text-gray-400">Heap Total</div>
                <div class="text-2xl font-semibold text-purple-400">
                  {summary.memoryUsage.heapTotal} MB
                </div>
              </div>
              <div>
                <div class="text-sm text-gray-400">External</div>
                <div class="text-2xl font-semibold text-purple-400">
                  {summary.memoryUsage.external} MB
                </div>
              </div>
              <div>
                <div class="text-sm text-gray-400">RSS (process)</div>
                <div class="text-2xl font-semibold text-purple-400">
                  {summary.memoryUsage.rss ?? "N/A"} MB
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Memory metric explanations */}
        <div class="bg-gray-800 rounded-lg p-4 border border-gray-700 mb-8">
          <h3 class="text-lg font-semibold text-white mb-2">
            What these memory numbers mean
          </h3>
          <p class="text-sm text-gray-400 mb-3">
            All values are process-level and measure the running application's
            memory usage (not total machine RAM).
          </p>
          <ul class="text-sm text-gray-300 list-disc ml-5 space-y-1">
            <li>
              <strong>Heap Used:</strong>{" "}
              Memory actively used by the JS runtime (V8) to store objects and
              data.
            </li>
            <li>
              <strong>Heap Total:</strong>{" "}
              Amount of heap memory reserved/committed by V8 for the process
              (capacity V8 can use without asking the OS).
            </li>
            <li>
              <strong>External:</strong>{" "}
              Memory allocated outside V8 (native buffers, C/C++ extensions,
              binaries). Adds to total process footprint.
            </li>
          </ul>
        </div>

        {/* Slowest Request */}
        {summary.slowestRequest && (
          <div class="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
            <h2 class="text-xl font-bold text-white mb-4">Slowest Request</h2>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-gray-400">Path:</span>
                <span class="text-white font-mono">
                  {summary.slowestRequest.path}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Duration:</span>
                <span class="text-yellow-400 font-semibold">
                  {summary.slowestRequest.duration}ms
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Timestamp:</span>
                <span class="text-gray-300 text-sm">
                  {new Date(summary.slowestRequest.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Status Codes */}
        <div class="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
          <h2 class="text-xl font-bold text-white mb-4">Status Codes</h2>
          <div class="space-y-2">
            {Object.entries(summary.statusCodes).map(([status, count]) => (
              <div
                key={status}
                class="flex justify-between items-center py-2 border-b border-gray-700 last:border-0"
              >
                <span
                  class={`font-semibold ${
                    parseInt(status) >= 500
                      ? "text-red-400"
                      : parseInt(status) >= 400
                      ? "text-yellow-400"
                      : "text-green-400"
                  }`}
                >
                  {status}
                </span>
                <span class="text-gray-300">{count} requests</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Requests */}
        <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 class="text-xl font-bold text-white mb-4">
            Recent Requests (Last 20)
          </h2>
          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm">
              <thead class="border-b border-gray-700">
                <tr>
                  <th class="pb-2 text-gray-400 font-medium">Method</th>
                  <th class="pb-2 text-gray-400 font-medium">Path</th>
                  <th class="pb-2 text-gray-400 font-medium">Status</th>
                  <th class="pb-2 text-gray-400 font-medium">Duration</th>
                  <th class="pb-2 text-gray-400 font-medium">Time</th>
                </tr>
              </thead>
              <tbody>
                {recentRequests.map((req, idx) => (
                  <tr
                    key={idx}
                    class="border-b border-gray-700/50 hover:bg-gray-700/30"
                  >
                    <td class="py-2">
                      <span class="text-blue-400 font-mono font-semibold">
                        {req.method}
                      </span>
                    </td>
                    <td class="py-2">
                      <span class="text-gray-300 font-mono text-xs">
                        {req.path}
                      </span>
                    </td>
                    <td class="py-2">
                      <span
                        class={`font-semibold ${
                          req.status >= 500
                            ? "text-red-400"
                            : req.status >= 400
                            ? "text-yellow-400"
                            : "text-green-400"
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td class="py-2">
                      <span
                        class={`${
                          req.duration > 1000
                            ? "text-red-400"
                            : req.duration > 500
                            ? "text-yellow-400"
                            : "text-green-400"
                        }`}
                      >
                        {req.duration}ms
                      </span>
                    </td>
                    <td class="py-2">
                      <span class="text-gray-400 text-xs">
                        {new Date(req.timestamp).toLocaleTimeString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div class="mt-8 text-center text-gray-500 text-sm">
          <p>
            Metrics are stored in-memory (last {data.maxStoredRequests}{" "}
            requests). Refresh page for latest data.
          </p>
        </div>
      </div>
    </div>
  );
}
