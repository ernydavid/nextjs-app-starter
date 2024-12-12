import { sql } from 'drizzle-orm'
import { pgTable, primaryKey, text, timestamp, unique } from 'drizzle-orm/pg-core'

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

// Create password reset token table
export const passwordResetToken = pgTable(
  'password_reset_token',
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

export const twoFactorToken = pgTable('two_factor_token', {
  id: text('id').default(sql`gen_random_uuid()`),
  email: text('email'),
  token: text('token'),
  expiredAt: timestamp('expiredAt', { mode: 'date' })
}, (t) => ({
  unq: unique().on(t.email, t.token)
}))
