'use server'

import { db } from '@/db'
import { users, verificationToken } from '@/db/schema/users'
import { eq, sql } from 'drizzle-orm'

export async function generateVerificationToken ({ userId }: {
  userId: string
}) {
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

async function getVerificationTokenByToken (token: string) {
  const verifyToken = await db.select()
    .from(verificationToken)
    .where(eq(verificationToken.token, token))

  return verifyToken[0]
}

export async function verifyToken (token: string) {
  const existingToken = await getVerificationTokenByToken(token)

  if (!existingToken) {
    return { error: 'Invalid Token.' }
  }

  if (existingToken.expires.getTime() < new Date().getTime()) {
    await db.delete(verificationToken)
      .where(eq(verificationToken.identifier, existingToken.identifier))

    return {
      error: 'Token expired.'
    }
  }

  const user = await db.select().from(users)
    .where(eq(users.id, existingToken.identifier))

  const existingUser = user[0]

  if (!existingUser) {
    return {
      error: 'User not found.'
    }
  }

  await db.delete(verificationToken).where(eq(verificationToken.identifier, existingUser.id))

  await db.update(users).set({ emailVerified: new Date() }).where(eq(users.id, existingUser.id))

  return {
    success: 'Email confirmation sent!'
  }
}
