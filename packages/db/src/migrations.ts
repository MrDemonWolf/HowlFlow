import { TABLES, DB_VERSION } from "./schema";

export async function initDatabase(db: any): Promise<void> {
  // Create version tracking table
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS _db_meta (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
  `);

  // Check current version
  const result = (await db.getFirstAsync(
    "SELECT value FROM _db_meta WHERE key = 'version'"
  )) as { value: string } | null;
  const currentVersion = result ? parseInt(result.value, 10) : 0;

  if (currentVersion < DB_VERSION) {
    await runMigrations(db, currentVersion);
  }
}

async function runMigrations(db: any, fromVersion: number): Promise<void> {
  if (fromVersion < 1) {
    // Initial schema
    for (const sql of Object.values(TABLES)) {
      await db.execAsync(sql);
    }
  }

  // Update version
  await db.runAsync(
    "INSERT OR REPLACE INTO _db_meta (key, value) VALUES ('version', ?)",
    [DB_VERSION.toString()]
  );
}
