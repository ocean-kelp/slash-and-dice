import { define } from "@/utils.ts";
import {
  getMetricsSummary,
  getRecentRequests,
} from "@/middlewares/monitoring.ts";

/**
 * Metrics API endpoint - provides resource consumption and performance metrics.
 * Access: GET /api/admin/metrics?key=YOUR_SECRET_KEY
 * Authentication handled by /api/admin/_middleware.ts
 */
export const handler = define.handlers({
  GET(ctx) {
    const url = new URL(ctx.req.url);
    const type = url.searchParams.get("type") || "summary";
    const limit = parseInt(url.searchParams.get("limit") || "100");

    let data;
    if (type === "detailed") {
      data = {
        requests: getRecentRequests(limit),
        summary: getMetricsSummary(limit),
      };
    } else {
      data = getMetricsSummary(limit);
    }

    return new Response(
      JSON.stringify(data, null, 2),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      },
    );
  },
});
