# Database Migrations

This directory contains database migrations for Deno KV.

## How Migrations Work

- Migrations are numbered files: `001_description.ts`, `002_description.ts`,
  etc.
- Each migration exports a `default` async function that performs the migration
- Migration status is tracked in KV under the `["_migrations"]` prefix
- Migrations are run in order and only once

## Local Development

Run all pending migrations:

```bash
deno task migrate
```

Run a specific migration:

```bash
deno task migrate 001
```

Run a single migration file directly:

```bash
deno run --unstable-kv -A db/migrations/001_remove_image_field.ts
```

## Production (Deno Deploy)

### Option 1: Admin API Endpoint (Recommended)

1. Set `ADMIN_SECRET` environment variable in Deno Deploy dashboard

2. Check migration status:

```bash
curl https://your-app.deno.dev/api/admin/migrate \
  -H "Authorization: Bearer YOUR_ADMIN_SECRET"
```

3. Run migrations:

```bash
curl -X POST https://your-app.deno.dev/api/admin/migrate \
  -H "Authorization: Bearer YOUR_ADMIN_SECRET" \
  -H "Content-Type: application/json"
```

4. Run specific migration:

```bash
curl -X POST https://your-app.deno.dev/api/admin/migrate \
  -H "Authorization: Bearer YOUR_ADMIN_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"migration": "001"}'
```

### Option 2: Deploy-time Hook

Add a build hook in your deployment pipeline that runs migrations automatically.

### Option 3: Lazy Migration

Some migrations can run automatically when users log in (handled by middleware).
This is good for non-critical schema changes.

## Creating New Migrations

1. Create a new file: `app/db/migrations/NNN_description.ts`
2. Use the next sequential number (e.g., `002_`, `003_`, etc.)
3. Export a default async function:

```typescript
/// <reference lib="deno.unstable" />
import { kv } from "../kv.ts";

export default async function migrate() {
  console.log("🔄 Running my migration...");

  // Your migration code here

  console.log("✅ Migration complete");
}

// Allow direct execution
if (import.meta.main) {
  try {
    await migrate();
    kv.close();
  } catch (error) {
    console.error("❌ Migration failed:", error);
    Deno.exit(1);
  }
}
```

## Security

⚠️ **Important**: Always set a strong `ADMIN_SECRET` in production!

The default `dev-admin-secret-change-in-prod` is only for local development.

## Example: Current Migration

`001_remove_image_field.ts`:

- Removes deprecated `image` field from all users
- Sets `selectedAvatarUrl` from first provider with an image
- Updates provider records to include `imageUrl`
