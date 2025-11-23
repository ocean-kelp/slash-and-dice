// No-op middleware placeholder for future authentication.
// Currently, this middleware just forwards the request to the next handler.
// TODO: Implement auth logic (redirect/deny) in future iterations.

type MiddlewareContext = {
  url: URL;
  req: Request;
  next: () => Promise<Response>;
  state?: Record<string, unknown>;
  params?: Record<string, string>;
  isPartial?: boolean;
  route?: string;
  info?: unknown;
  data?: unknown;
  error?: unknown;
};

export default async function middleware(ctx: MiddlewareContext) {
  // NOTE: ctx.next() calls the next middleware or route handler in the
  // chain. Keep this function intentionally minimal for now.
  return await ctx.next();
}
