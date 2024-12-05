import { InferSelectModel, sql } from 'drizzle-orm'
import { pgEnum, pgTable, uuid, varchar, text, timestamp, boolean, primaryKey, integer } from 'drizzle-orm/pg-core'

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
