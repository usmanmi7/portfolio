/**
 * Prebuild script for Prisma provider switching.
 *
 * - Detects DATABASE_URL protocol at build time
 * - If PostgreSQL URL → switches schema provider to "postgresql"
 * - If SQLite URL → keeps schema provider as "sqlite"
 *
 * This allows the same codebase to work with:
 *   - Local dev:  SQLite (file:./db/custom.db)
 *   - Vercel:     PostgreSQL (Vercel Postgres)
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const schemaPath = resolve(__dirname, "../prisma/schema.prisma");

const databaseUrl = process.env.DATABASE_URL || "";
const isPostgres =
  databaseUrl.startsWith("postgresql://") ||
  databaseUrl.startsWith("postgres://");

let schema = readFileSync(schemaPath, "utf-8");

if (isPostgres) {
  console.log("[prebuild] Detected PostgreSQL DATABASE_URL — switching provider to postgresql");
  schema = schema.replace(
    /provider\s*=\s*"sqlite"/,
    'provider = "postgresql"'
  );
} else {
  console.log("[prebuild] Detected SQLite DATABASE_URL — keeping provider as sqlite");
  schema = schema.replace(
    /provider\s*=\s*"postgresql"/,
    'provider = "sqlite"'
  );
}

writeFileSync(schemaPath, schema);
console.log("[prebuild] schema.prisma provider updated successfully");
