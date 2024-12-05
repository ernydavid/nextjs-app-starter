import { sql } from 'drizzle-orm'

export const up = async (db: any) => {
  await db.execute(
    sql`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'role_enum') THEN
        CREATE TYPE role_enum AS ENUM ('user', 'admin');
      END IF;
    END $$;
    `
  )
}

export const down = async (db: any) => {
  await db.execute(
    sql`
    DROP TYPE IF EXISTS role_enum;
    `
  )
}
