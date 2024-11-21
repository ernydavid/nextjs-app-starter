import { InferSelectModel, sql } from 'drizzle-orm'
import { pgEnum, pgTable, uuid, varchar, text, timestamp, boolean, primaryKey, integer } from 'drizzle-orm/pg-core'

// first, verify if the db have been installed "uuid-ossp"
// query: SELECT * FROM pg_extension WHERE extname = 'uuid-ossp';
// if not: ---->
// query: CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
// test successfully installed: await db.execute(sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

// query instalation 'uuid-ossp':
// await db.execute(sql`
//   DO $$
//   BEGIN
//     IF NOT EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'uuid-ossp') THEN
//       CREATE EXTENSION "uuid-ossp";
//     END IF;
//   END $$;
// `);

// if role error
// await db.execute(sql`
//   DO $$
//   BEGIN
//     IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'role_enum') THEN
//       CREATE TYPE role_enum AS ENUM ('user', 'admin');
//     END IF;
//   END $$;
// `);

// Define ENUM type for roles
const roleEnum = pgEnum('role_enum', ['user', 'admin'])

// Create Users Table
export const users = pgTable('users', {
  id: uuid('id').default(sql`uuid_generate_v4()`).primaryKey(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }),
  password: text('password'),
  role: roleEnum('role').default('user'),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
  isTwoFactorEnabled: boolean('isTwoFactorEnabled').default(false)
})

// Create Verification Token Table
export const verificationToken = pgTable(
  'verification_token',
  {
    identifier: text('identifier').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
    token: text('token').notNull()
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token]
    })
  })
)

// Create Accounts Table
export const accounts = pgTable(
  'accounts', {
    id: uuid('id').default(sql`uuid_generate_v4()`),
    userId: uuid('userId')
      .references(() => users.id, { onDelete: 'cascade' }),
    type: varchar('type', { length: 255 }).notNull(),
    provider: varchar('provider', { length: 255 }).notNull(),
    providerAccountId: varchar('providerAccountId', { length: 255 }).notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    id_token: text('id_token'),
    scope: text('scope'),
    session_state: text('session_state'),
    token_type: text('token_type')
  },
  (accounts) => ({
    compoundKey: primaryKey({
      columns: [accounts.provider, accounts.providerAccountId]
    })
  })
)

export type UserType = InferSelectModel<typeof users>
export type Role = 'user' | 'admin' | null
