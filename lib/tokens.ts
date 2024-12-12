'use server'

import { getUserById } from '@/lib/actions'
import { db } from '@/db'
import { passwordResetToken, twoFactorToken, verificationToken } from '@/db/schema/tokens'
import { users } from '@/db/schema/users'
import { eq, sql } from 'drizzle-orm'
import Crypto from 'crypto'

// generate verification token
export async function generateVerificationToken (userId:string) {
  const existingToken = await db.select().from(verificationToken)
    .where(eq(verificationToken.identifier, userId))

  if (existingToken) {
    await db.delete(verificationToken)
      .where(eq(verificationToken.identifier, userId))
  }

  // expiration token 5 min
  const expiredDate = new Date().getTime() + 5 * 60 * 1000

  const token = await db.insert(verificationToken).values({
    identifier: userId,
    token: await sql`gen_random_uuid()`,
    expires: new Date(expiredDate)
  }).returning()

  return token[0]
}

// get verification token
async function getVerificationTokenByToken (token: string) {
  const verifyToken = await db.select()
    .from(verificationToken)
    .where(eq(verificationToken.token, token))

  return verifyToken[0]
}

// validate verification token
export async function verifyToken (token: string) {
  // verify if token exist in db
  const existingToken = await getVerificationTokenByToken(token)

  if (!existingToken) {
    return { error: 'Invalid Token.' }
  }

  // verify if token is expired
  if (existingToken.expires.getTime() < new Date().getTime()) {
    await db.delete(verificationToken)
      .where(eq(verificationToken.identifier, existingToken.identifier))

    return {
      error: 'Token expired.'
    }
  }

  // verify if user exist by token identifier
  const existingUser = await getUserById(existingToken.identifier)

  if (!existingUser) {
    return {
      error: 'User not found.'
    }
  }

  // delete token after validate
  await db.delete(verificationToken).where(eq(verificationToken.identifier, existingUser.id))

  // update user verification in db
  await db.update(users).set({ emailVerified: new Date() }).where(eq(users.id, existingUser.id))

  return {
    success: 'Email confirmed correctly!'
  }
}

// generate password reset token
export async function generatePasswordResetToken (userId: string) {
  const existingToken = await db.select()
    .from(passwordResetToken)
    .where(eq(passwordResetToken.identifier, userId))

  if (existingToken) {
    await db.delete(passwordResetToken)
      .where(eq(passwordResetToken.identifier, userId))
  }

  // set expiration token by 10min
  const expiredDate = new Date().getTime() + 10 * 60 * 1000

  // generate new token
  const token = await db.insert(passwordResetToken)
    .values({
      identifier: userId,
      expires: new Date(expiredDate),
      token: await sql`uuid_generate_v4()`
    })
    .returning()

  return token[0]
}

// get password reset token
export async function getPasswordResetTokenByToken (token: string) {
  const existingToken = await db.select()
    .from(passwordResetToken)
    .where(eq(passwordResetToken.token, token))

  return existingToken[0]
}

// validate password reset token
export async function verifyPasswordResetToken (token: string) {
// verify if token exist
  const existingToken = await getPasswordResetTokenByToken(token)

  if (!existingToken) {
    return { error: 'Invalid Token.' }
  }

  // verify if token is expired
  if (existingToken.expires.getTime() < new Date().getTime()) {
    await db.delete(passwordResetToken)
      .where(eq(passwordResetToken.identifier, existingToken.identifier))

    return {
      error: 'Token expired. Please request a new password reset token.'
    }
  }

  // verify if user exist
  const existingUser = await getUserById(existingToken.identifier)

  if (!existingUser) {
    return {
      error: 'User not found.'
    }
  }

  // delete token from db
  await db.delete(passwordResetToken)
    .where(eq(passwordResetToken.identifier, existingUser.id))

  return {
    success: existingUser.id
  }
}

// get two factor token by email
export async function getTwoFactorToken (id: string) {
  const twoFactorCode = await db.select()
    .from(twoFactorToken)
    .where(eq(twoFactorToken.id, id))

  return twoFactorCode[0]
}

// generate two factor token
export async function generateTwoFactorToken (email: string) {
  // generate 6 digits token
  const token = Crypto.randomInt(100_000, 1_000_000).toString()
  // set token expired by 5 min
  const expired = new Date().getTime() + 5 * 60 * 1000

  const existingToken = await db.select()
    .from(twoFactorToken)
    .where(eq(twoFactorToken.email, email))

  if (existingToken[0]) {
    await db.delete(twoFactorToken)
      .where(eq(twoFactorToken.email, email))
  }

  const twoFactorCode = await db.insert(twoFactorToken)
    .values({
      id: await sql`uuid_generate_v4()`,
      email,
      expiredAt: new Date(expired),
      token
    }).returning()

  return twoFactorCode[0]
}

// delete twoFactorToken
export async function deleteTwoFactor (twoFactorId:string) {
  await db.delete(twoFactorToken)
    .where(eq(twoFactorToken.id, twoFactorId))
}
