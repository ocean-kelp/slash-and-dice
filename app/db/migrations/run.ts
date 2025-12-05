/// <reference lib="deno.unstable" />
/**
 * Migration Runner
 *
 * Tracks and runs database migrations in order.
 * Migrations are stored in db/migrations/ with format: NNN_description.ts
 *
 * Usage:
 *   deno task migrate              # Run all pending migrations
 *   deno task migrate 001          # Run specific migration
 */

import { kv } from "../kv.ts";

interface MigrationRecord {
  id: string;
  name: string;
  appliedAt: Date;
}

const MIGRATION_KEY = ["_migrations"];

async function getAppliedMigrations(): Promise<Set<string>> {
  const applied = new Set<string>();
  const iter = kv.list<MigrationRecord>({ prefix: MIGRATION_KEY });

  for await (const entry of iter) {
    const record = entry.value;
    applied.add(record.id);
  }

  return applied;
}

async function recordMigration(id: string, name: string): Promise<void> {
  await kv.set([...MIGRATION_KEY, id], {
    id,
    name,
    appliedAt: new Date(),
  });
}

async function runMigration(filePath: string): Promise<void> {
  const module = await import(filePath);

  if (typeof module.default === "function") {
    await module.default();
  } else if (typeof module.migrate === "function") {
    await module.migrate();
  } else {
    // Run the module (it will execute if import.meta.main)
    console.log(`  ℹ️  Migration ${filePath} executed on import`);
  }
}

async function runMigrations(targetMigration?: string) {
  console.log("🚀 Migration Runner Starting...\n");

  const migrationsDir = new URL(".", import.meta.url).pathname;
  const applied = await getAppliedMigrations();

  // Get all migration files
  const migrations: Array<{ id: string; name: string; path: string }> = [];

  for await (const entry of Deno.readDir(migrationsDir)) {
    if (entry.isFile && entry.name.match(/^\d{3}_.*\.ts$/)) {
      const id = entry.name.split("_")[0];
      migrations.push({
        id,
        name: entry.name.replace(/\.ts$/, ""),
        path: `${migrationsDir}${entry.name}`,
      });
    }
  }

  // Sort by ID
  migrations.sort((a, b) => a.id.localeCompare(b.id));

  if (migrations.length === 0) {
    console.log("ℹ️  No migrations found");
    return;
  }

  // Filter migrations
  const toRun = migrations.filter((m) => {
    if (targetMigration && m.id !== targetMigration) {
      return false;
    }
    if (applied.has(m.id)) {
      console.log(`⏭️  Skipping ${m.id} (already applied)`);
      return false;
    }
    return true;
  });

  if (toRun.length === 0) {
    console.log("\n✅ All migrations up to date!");
    return;
  }

  console.log(`\n📋 Running ${toRun.length} migration(s):\n`);

  for (const migration of toRun) {
    console.log(`▶️  Running migration ${migration.id}: ${migration.name}`);
    try {
      await runMigration(migration.path);
      await recordMigration(migration.id, migration.name);
      console.log(`✅ Migration ${migration.id} completed\n`);
    } catch (error) {
      console.error(`❌ Migration ${migration.id} failed:`, error);
      throw error;
    }
  }

  console.log("🎉 All migrations completed successfully!");
}

/**
 * API-friendly version that returns results instead of logging
 * Used by /api/admin/migrate endpoint
 */
export async function runMigrationsFromAPI(
  targetMigration?: string,
): Promise<{ message: string; applied: string[] }> {
  const migrationsDir = new URL(".", import.meta.url).pathname;
  const applied = await getAppliedMigrations();

  // Get all migration files
  const migrations: Array<{ id: string; name: string; path: string }> = [];

  for await (const entry of Deno.readDir(migrationsDir)) {
    if (entry.isFile && entry.name.match(/^\d{3}_.*\.ts$/)) {
      const id = entry.name.split("_")[0];
      migrations.push({
        id,
        name: entry.name.replace(/\.ts$/, ""),
        path: `${migrationsDir}${entry.name}`,
      });
    }
  }

  migrations.sort((a, b) => a.id.localeCompare(b.id));

  const toRun = migrations.filter((m) => {
    if (targetMigration && m.id !== targetMigration) return false;
    if (applied.has(m.id)) return false;
    return true;
  });

  if (toRun.length === 0) {
    return {
      message: "All migrations up to date",
      applied: [],
    };
  }

  const appliedMigrations: string[] = [];

  for (const migration of toRun) {
    await runMigration(migration.path);
    await recordMigration(migration.id, migration.name);
    appliedMigrations.push(`${migration.id}: ${migration.name}`);
  }

  return {
    message: `Successfully applied ${appliedMigrations.length} migration(s)`,
    applied: appliedMigrations,
  };
}

/**
 * Get migration status (which migrations are applied/pending)
 */
export async function getMigrationStatus(): Promise<{
  applied: Array<{ id: string; name: string; appliedAt: Date }>;
  pending: Array<{ id: string; name: string }>;
}> {
  const migrationsDir = new URL(".", import.meta.url).pathname;
  const appliedSet = await getAppliedMigrations();

  // Get applied migrations with details
  const appliedMigrations: Array<
    { id: string; name: string; appliedAt: Date }
  > = [];
  const iter = kv.list<MigrationRecord>({ prefix: MIGRATION_KEY });

  for await (const entry of iter) {
    const record = entry.value;
    appliedMigrations.push(record);
  }

  appliedMigrations.sort((a, b) => a.id.localeCompare(b.id));

  // Get all migration files
  const allMigrations: Array<{ id: string; name: string }> = [];

  for await (const entry of Deno.readDir(migrationsDir)) {
    if (entry.isFile && entry.name.match(/^\d{3}_.*\.ts$/)) {
      const id = entry.name.split("_")[0];
      allMigrations.push({
        id,
        name: entry.name.replace(/\.ts$/, ""),
      });
    }
  }

  allMigrations.sort((a, b) => a.id.localeCompare(b.id));

  // Get pending migrations
  const pendingMigrations = allMigrations.filter((m) => !appliedSet.has(m.id));

  return {
    applied: appliedMigrations,
    pending: pendingMigrations,
  };
}

if (import.meta.main) {
  try {
    const targetMigration = Deno.args[0];
    await runMigrations(targetMigration);
    kv.close();
  } catch (error) {
    console.error("💥 Migration runner failed:", error);
    kv.close();
    Deno.exit(1);
  }
}
