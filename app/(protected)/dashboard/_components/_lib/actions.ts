'use server'

import { db } from '@/db'
import { users } from '@/db/schema/users'
import { getUserById } from '@/lib/actions'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'

export async function updateNameByUserId (userId: string, name: string) {
  try {
    const result = await db.update(users)
      .set({
        name
      })
      .where(eq(users.id, userId))
      .returning()

    return result[0]
  } catch (error) {
    console.log(error)
    return {
      error: `Something went wrong. Error: ${error}`
    }
  }
}

export async function verifyCurrentPasswordByUserId (userId: string, password: string) {
  const existingUser = await getUserById(userId)

  const passwordMatch = await bcrypt.compare(password, existingUser.password!)

  if (passwordMatch) {
    return true
  }

  return false
}

export async function updatePasswordByUserId (userId: string, newPassword: string) {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    const result = await db.update(users)
      .set({
        password: hashedPassword
      })
      .where(eq(users.id, userId))
      .returning()

    return {
      success: result[0].id
    }
  } catch (error) {
    console.log(error)
    return {
      error: `Something went wrong. Error: ${error}`
    }
  }
}

export async function updateTwoFactorByUserId (userId:string, twoFactor: boolean) {
  try {
    const result = await db.update(users)
      .set({
        isTwoFactorEnabled: twoFactor
      })
      .where(eq(users.id, userId))
      .returning()

    return {
      success: result[0].id
    }
  } catch (error) {
    console.log(error)
    return {
      error: `Something went wrong. Error: ${error}`
    }
  }
}
