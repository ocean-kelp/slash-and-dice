import { define } from "@/utils.ts";
import { getRequestById } from "@/middlewares/monitoring.ts";

export const handler = define.handlers({
  GET(ctx) {
    const url = new URL(ctx.req.url);
    const idParam = url.searchParams.get("id");
    const id = idParam ? Number(idParam) : NaN;
    if (Number.isNaN(id)) {
      return new Response(JSON.stringify({ error: "invalid id" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    const metric = getRequestById(id);
    if (!metric) {
      return new Response(JSON.stringify({ error: "not found" }), {
        status: 404,
        headers: { "content-type": "application/json" },
      });
    }

    return new Response(JSON.stringify(metric), {
      headers: { "content-type": "application/json" },
    });
  },
});
