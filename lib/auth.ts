// import { db } from '@/db'
// import { users } from '@/db/schema/users'

export type ActionState = {
  errors?: {
    email?: string[],
    name?: string[],
    password?: string[]
  },
  message?: string | null
}

export async function insertUser (prevState: ActionState, formData: FormData) {
  const rawData = Object.fromEntries(formData)
  console.log(rawData)

  // try {
  //   await db.insert(users).values(
  //     rawData
  //   )
  // } catch (error) {
  //   return { error: `Error creating new user: ${error}` }
  // }
}
