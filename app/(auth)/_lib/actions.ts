'use server'

import { db } from '@/db'
import { users } from '@/db/schema/users'
import { eq } from 'drizzle-orm'

export async function getUserByEmail (email: string) {
  const user = await db.select().from(users)
    .where(eq(users.email, email))

  return user[0]
}

export async function getUserById (id: string) {
  const user = await db.select()
    .from(users)
    .where(eq(users.id, id))

  return user[0]
}
