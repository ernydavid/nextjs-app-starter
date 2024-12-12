'use server'

import { ActionState } from '@/lib/definitions'
import { verifySession } from '@/lib/sessions'
import { z } from 'zod'
import { updateNameByUserId, updatePasswordByUserId, updateTwoFactorByUserId, verifyCurrentPasswordByUserId } from './actions'
import { revalidatePath } from 'next/cache'

const SettingsFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.'
    })
    .trim(),
  newPassword: z.string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.'
    })
    .trim(),
  image: z.string(),
  twoFactor: z.boolean()
})

// form schemas
const NameFormSchema = SettingsFormSchema.omit({
  password: true,
  newPassword: true,
  image: true,
  twoFactor: true
})

const PasswordFormSchema = SettingsFormSchema.omit({
  name: true,
  twoFactor: true,
  image: true
})

const TwoFactorFormSchema = SettingsFormSchema.omit({
  name: true,
  newPassword: true,
  password: true,
  image: true
})

// update display name
export async function updateName (prevState: ActionState, formData: FormData) {
  const validatedFields = NameFormSchema.safeParse(Object.fromEntries(formData))

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid name.'
    }
  }

  const { name } = validatedFields.data

  const session = await verifySession()

  if (!session) {
    return {
      message: 'Session is invalid.'
    }
  }

  const userId = session.userId as string

  const newName = await updateNameByUserId(userId, name)

  if (!newName) {
    return {
      message: 'Something went wrong.'
    }
  }

  revalidatePath('/dashboard/settings')

  return {
    success: 'Display name updated.'
  }
}

/**
* This function update user password on db from formdata
*/
export async function updatePassword (prevState: ActionState, formData: FormData) {
  const validatedFields = PasswordFormSchema.safeParse(Object.fromEntries(formData))

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid fields.'
    }
  }

  const { password, newPassword } = validatedFields.data

  const session = await verifySession()

  if (!session) {
    return {
      message: 'Session is invalid.'
    }
  }

  const userId = session.userId as string

  // verify if current password is correct
  const passwordMatch = await verifyCurrentPasswordByUserId(userId, password)

  if (!passwordMatch) {
    return {
      message: 'Current password is incorrect.'
    }
  }

  const setNewPassword = await updatePasswordByUserId(userId, newPassword)

  if (setNewPassword?.error) {
    return {
      message: setNewPassword.error
    }
  }

  revalidatePath('/dashboard/settings')

  return {
    success: 'Password updated correctly.'
  }
}

/**
 * This function enable or diable twoFactor User Authentication
 */
export async function updateTwoFactor (prevState:ActionState, formData: FormData) {
  const twoFactor = formData.get('twoFactor') === 'on'

  const validatedFields = TwoFactorFormSchema.safeParse({ twoFactor })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid field.'
    }
  }

  const session = await verifySession()

  if (!session) {
    return {
      message: 'Session is invalid.'
    }
  }

  const userId = session.userId as string

  const response = await updateTwoFactorByUserId(userId, twoFactor)

  if (response.error) {
    return {
      message: response.error
    }
  }

  if (response.success) {
    revalidatePath('/dashboard/settings')

    return {
      success: true
    }
  }
}
