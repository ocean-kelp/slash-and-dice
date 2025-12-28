# Resource Monitoring

This project includes a comprehensive monitoring system to track resource
consumption and performance metrics on Deno Deploy.

## Features

- ✅ Request duration tracking
- ✅ Memory usage monitoring (heap, external)
- ✅ Status code tracking
- ✅ Error rate calculation
- ✅ Slow request detection (> 1000ms)
- ✅ Recent request history (last 100)

## Setup

### 1. Add Environment Variable

Add to your `.env` file (or Deno Deploy dashboard):

```bash
# Secret key for accessing metrics (change in production!)
METRICS_SECRET_KEY=your-secret-key-here
```

### 2. Access Metrics

Two ways to view your metrics:

#### Option A: Web Dashboard (Recommended)

Visit the admin dashboard in your browser:

```
https://your-app.deno.dev/admin/metrics?key=your-secret-key-here
```

This shows:

- Total requests
- Average response time
- Error rate
- Memory usage (heap used, total, external)
- Slowest request details
- Status code breakdown
- Recent requests table

#### Option B: JSON API

For programmatic access or monitoring tools:

```bash
# Summary metrics
curl "https://your-app.deno.dev/api/metrics?key=your-secret-key-here"

# Detailed metrics with recent requests
curl "https://your-app.deno.dev/api/metrics?key=your-secret-key-here&type=detailed&limit=50"
```

## Logs

The monitoring middleware automatically logs:

### Development Mode

- All requests with method, path, status, and duration
- Example: `[GET] /characters - 200 (45.32ms)`

### Production Mode

- Only slow requests (> 1000ms)
- Only errors (status >= 500)
- Example: `[SLOW REQUEST] GET /api/search - 1543ms`
- Example: `[ERROR] POST /api/data - Status 500`

### View Logs on Deno Deploy

1. Go to your Deno Deploy dashboard
2. Select your project
3. Click on "Logs" tab
4. Filter by severity or search for specific patterns

## Integration with External Services

You can integrate with external monitoring tools by:

### Sentry (Error Tracking)

```typescript
// In your error handler
import * as Sentry from "https://deno.land/x/sentry/index.ts";

Sentry.init({ dsn: "your-sentry-dsn" });
```

### Better Stack (Log Management)

Add log shipping to Better Stack:

```typescript
// Send logs to Better Stack
fetch("https://in.logs.betterstack.com/", {
    method: "POST",
    headers: {
        "Authorization": `Bearer ${YOUR_TOKEN}`,
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: "log data" }),
});
```

### Custom Webhook

Send metrics to your monitoring service:

```typescript
// In monitoring.ts, add after storing metrics:
if (duration > 1000) {
    fetch("https://your-webhook-url.com/alert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "slow_request", duration, path }),
    });
}
```

## Metrics Explanation

### Memory Usage

- **Heap Used**: Active memory being used by your application
- **Heap Total**: Total heap memory allocated
- **External**: Memory used by C++ objects bound to JavaScript

### Request Duration

- Measured in milliseconds
- Includes full request/response cycle
- Slow requests (> 1000ms) are flagged

### Error Rate

- Percentage of requests with status >= 400
- Helps identify application issues

## Production Best Practices

1. **Set a strong secret key**: Change `METRICS_SECRET_KEY` from default
2. **Monitor regularly**: Check dashboard weekly or set up alerts
3. **Watch for patterns**: Increasing memory or slow requests may indicate
   issues
4. **Use external monitoring**: Integrate with Sentry or similar for alerts

## Limitations

- Metrics stored in-memory (last 100 requests)
- Resets on deployment or instance restart
- For persistent metrics, integrate with external service

## Troubleshooting

### "Unauthorized" error

- Check your `METRICS_SECRET_KEY` environment variable
- Ensure you're passing the correct key in the URL

### No memory data showing

- Memory API may not be available in all environments
- This is normal; other metrics will still work

### Metrics reset to zero

- Happens on deployment or instance restart
- This is expected with in-memory storage
