'use server'

import { db } from '@/db'
import { users } from '@/db/schema/users'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { createSession, deleteSession } from '@/lib/sessions'
import { generatePasswordResetToken, generateVerificationToken } from '@/lib/tokens'
import { sendPasswordResetEmail, sendVerificationTokenEmail } from '@/lib/mails'
import { getUserByEmail } from './actions'
import { eq } from 'drizzle-orm'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL

export type ActionState = {
  errors?: {
    [key: string]: string[] | undefined
  },
  message?: string | null
  success?: string | null
  [key: string]: any
} | undefined

const AuthFormSchema = z.object({
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
    .trim(),
  token: z.string()
})

// sign up user

// sign up form schema
const SignupFormSchema = AuthFormSchema.omit({
  token: true
})

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
  const verificationToken = await generateVerificationToken(userId)

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
const LoginSchema = AuthFormSchema.omit({
  name: true,
  token: true
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
    const token = await generateVerificationToken(user.id)

    await sendVerificationTokenEmail({
      email: user.email as string,
      name: user.name as string,
      verificationToken: token.token
    })

    return {
      message: 'Email not verified. Please, check your inbox to verify your new account.'
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

// forgot password request

// forgot password schema
const ForgotPasswordSchema = AuthFormSchema.omit({
  name: true,
  password: true,
  token: true
})

export async function forgotPassword (prevState: ActionState, formData: FormData) {
  const validatedFields = ForgotPasswordSchema.safeParse(Object.fromEntries(formData))

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid fields.'
    }
  }

  const { email } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser) {
    return {
      message: 'Email is not associated to an existing account. Please, sign up or try with diferent email.'
    }
  }

  // generate password reset token and send email
  const newToken = await generatePasswordResetToken(existingUser.id)

  await sendPasswordResetEmail({ email: existingUser.email!, passwordResetToken: newToken.token })

  return {
    success: 'Password recover link sent successfully. Please check your inbox.'
  }
}

// reset password

// reset password schema
const ResetPasswordSchema = AuthFormSchema.omit({
  email: true,
  name: true
})

export async function resetPassword (prevState: ActionState, formData: FormData) {
  const validatedFields = ResetPasswordSchema.safeParse(Object.fromEntries(formData))

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid fields.'
    }
  }

  const { password, token } = validatedFields.data
  const userId = token

  // encript password
  const hashedPassword = await bcrypt.hash(password, 10)

  // update password
  await db.update(users).set({
    password: hashedPassword
  })
    .where(eq(users.id, userId))

  return {
    success: 'Password updated correctly.'
  }
}
