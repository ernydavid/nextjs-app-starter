'use server'

import { db } from '@/db'
import { users } from '@/db/schema/users'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { createSession, deleteSession } from '@/lib/sessions'
import { generateVerificationToken } from '@/lib/tokens'
import { sendVerificationTokenEmail } from '@/lib/mails'
import { getUserByEmail } from './actions'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL

export type ActionState = {
  errors?: {
    [key: string]: string[] | undefined
  },
  message?: string | null
  success?: string | null
  [key: string]: any
} | undefined

const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.'
    })
    .trim()
})

// sign up user
export async function insertUser (prevState: ActionState, formData: FormData) {
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password')
  }

  const validatedFields = SignupFormSchema.safeParse(rawData)

  await new Promise((resolve) => setTimeout(resolve, 2000))

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid Fields! Please check values again!'
    }
  }

  const { email, name, password } = validatedFields.data

  // verify if email exist in db
  const existingEmail = await getUserByEmail(email)

  if (existingEmail) {
    return {
      errors: {},
      message: 'Email already exists, please use a different email or login.'
    }
  }

  // encrypt password
  const hashedPassword = await bcrypt.hash(password, 10)

  // insert user in db
  const data = await db.insert(users).values({
    name,
    email,
    password: hashedPassword
  }).returning()

  const user = data[0]

  if (!user) {
    return {
      message: 'An error occurred when creating your account.'
    }
  }

  const userId = user.id.toString()

  // generate token confirmation email
  const verificationToken = await generateVerificationToken({ userId })

  // create verification url
  const token = verificationToken.token
  const verificationTokenUrl = `${baseUrl}/verify-account?token=${token}`

  // sending email verification token
  await sendVerificationTokenEmail({
    email: user.email as string,
    name: user.name as string,
    verificationToken: verificationTokenUrl
  })

  return {
    success: 'User created. Please, check your email to verify your account.'
  }
}

// login schema
const LoginSchema = SignupFormSchema.omit({
  name: true
})

// login user
export async function login (prevState: ActionState, formData: FormData) {
  // 1. validate fields
  const validatedFields = LoginSchema.safeParse(Object.fromEntries(formData))

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid fields.'
    }
  }

  const { email, password } = validatedFields.data

  // 2. verify user in db
  const user = await getUserByEmail(email)

  if (!user) {
    return {
      message: 'Email not found. try to sign up first.'
    }
  }

  if (!user.emailVerified) {
    const token = await generateVerificationToken({ userId: user.id })

    await sendVerificationTokenEmail({
      email: user.email as string,
      name: user.name as string,
      verificationToken: token.token
    })

    return {
      message: 'Email not confirmed. Please check you email to verify your account.'
    }
  }

  // 3. compare passwords
  const passwordMatch = await bcrypt.compare(password, user.password as string)

  if (!passwordMatch) {
    return {
      message: 'Incorrect password.'
    }
  }

  // 4. create session
  await createSession(user.id)
}

// logout user
export async function logout () {
  await deleteSession()
}
