import { pgTable, primaryKey, text, timestamp } from 'drizzle-orm/pg-core'

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
