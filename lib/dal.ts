'use server'

import { db } from '@/db'
import { verifySession } from './sessions'
import { users, UserType } from '@/db/schema/users'
import { eq } from 'drizzle-orm'
import { cache } from 'react'

export const getUser = cache(async () => {
  // 1. Verify user session
  const session = await verifySession()

  // 2. fetch user data
  const data = await db.select()
    .from(users)
    .where(eq(users.id, session?.userId as string))

  const user = data[0]

  // filtered user data
  const filteredUser = userDTO(user)

  return filteredUser
})

function userDTO (user: UserType) {
  // filter data to fetch on user object
  return {
    name: user.name,
    email: user.email,
    image: user.image,
    isTwoFactor: user.isTwoFactorEnabled
  }
}

// function canViewAudit (protectedData: string | any, role: Role) {
//   return role === 'admin' ? protectedData : null
// }
