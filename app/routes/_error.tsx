import type { PageProps } from "fresh";
import { HttpError } from "fresh";

// Centralized error page. This replaces the previous redirect-to-localized-error
// behavior so we have one place that renders 404/500/other HTTP errors and
// non-HTTP errors. If you still want localized text, populate
// `ctx.state.translationData` in middleware and read it here.
export default function ErrorPage(props: PageProps) {
  // The framework will pass the thrown Error (or HttpError) in `props.error`.
  const error = props.error as Error | HttpError | undefined;

  // Determine if this is a 404 for a static asset (image, font, etc.)
  const status = error &&
      typeof (error as unknown as { status?: unknown }).status === "number"
    ? (error as unknown as { status: number }).status
    : 0;

  const isStaticAsset404 = status === 404 && props.url?.pathname &&
    /\.(png|jpg|jpeg|webp|gif|svg|ico|woff|woff2|ttf|otf|css|js|json)$/i.test(
      props.url.pathname,
    );

  // Log differently for static assets vs other errors
  if (error) {
    if (isStaticAsset404) {
      // Simple one-line log for missing static assets
      console.warn(
        `⚠️  Missing static asset: ${props.url?.pathname || "unknown"}`,
      );
    } else {
      // Full error details for actual application errors
      console.error("❌ Error page rendered:", {
        message: error.message,
        stack: error.stack,
        status: (error as unknown as { status?: number }).status,
        url: props.url,
        route: props.route,
      });
    }
  }

  // If it's an HTTP error (Fresh `HttpError`) or an object with a numeric
  // `status` property, render by status code.
  const hasNumericStatus = !!(
    error &&
    typeof (error as unknown as { status?: unknown }).status === "number"
  );

  if (error instanceof HttpError || hasNumericStatus) {
    const status = hasNumericStatus
      ? (error as unknown as { status: number }).status
      : 0;

    // 404 Not Found
    if (status === 404) {
      return (
        <>
          <head>
            <title>404 - Page not found</title>
          </head>
          <div class="min-h-screen flex items-center justify-center px-4">
            <div class="max-w-2xl w-full text-center">
              <h1 class="text-6xl font-bold text-gray-900 mb-2">404</h1>
              <h2 class="text-2xl font-semibold text-gray-700 mb-4">
                Page not found
              </h2>
              <p class="text-gray-600 mb-6">
                The page you requested could not be found.
              </p>
              <a
                href="/"
                class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md"
              >
                Go home
              </a>
            </div>
          </div>
        </>
      );
    }

    // 500 Internal Server Error
    if (status === 500) {
      return (
        <>
          <head>
            <title>500 - Internal server error</title>
          </head>
          <div class="min-h-screen flex items-center justify-center px-4">
            <div class="max-w-2xl w-full text-center">
              <h1 class="text-6xl font-bold text-gray-900 mb-2">500</h1>
              <h2 class="text-2xl font-semibold text-gray-700 mb-4">
                Internal server error
              </h2>
              <p class="text-gray-600 mb-6">
                Something went wrong on our end. Please try again later.
              </p>
              <a
                href="/"
                class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md"
              >
                Go home
              </a>
            </div>
          </div>
        </>
      );
    }

    // Other HTTP statuses
    return (
      <>
        <head>
          <title>{status} - Error</title>
        </head>
        <div class="min-h-screen flex items-center justify-center px-4">
          <div class="max-w-2xl w-full text-center">
            <h1 class="text-6xl font-bold text-gray-900 mb-2">{status}</h1>
            <h2 class="text-2xl font-semibold text-gray-700 mb-4">Error</h2>
            <p class="text-gray-600 mb-6">
              There was an error processing your request.
            </p>
            <a
              href="/"
              class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md"
            >
              Go home
            </a>
          </div>
        </div>
      </>
    );
  }

  // Non-HTTP errors: render a generic error page.
  return (
    <>
      <head>
        <title>Error - Something went wrong</title>
      </head>
      <div class="min-h-screen flex items-center justify-center px-4">
        <div class="max-w-2xl w-full text-center">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Something went wrong
          </h1>
          <p class="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
            An unexpected error occurred. Please try again.
          </p>
          <a
            href="/"
            class="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md"
          >
            Go home
          </a>
        </div>
      </div>
    </>
  );
}
