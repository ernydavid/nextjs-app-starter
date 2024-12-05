import { sql } from 'drizzle-orm'

export const up = async (db: any) => {
  await db.execute(
    sql`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'uuid-ossp') THEN
        CREATE EXTENSION "uuid-ossp";
      END IF;
    END $$;
    `
  )
}

export const down = async (db: any) => {
  await db.execute(
    sql`
    DROP EXTENSION IF EXISTS "uuid-ossp";
    `
  )
}
