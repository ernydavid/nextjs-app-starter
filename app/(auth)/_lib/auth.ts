'use server'

import { db } from '@/db'
import { users } from '@/db/schema/users'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { createSession, deleteSession } from '@/lib/sessions'
import { deleteTwoFactor, generatePasswordResetToken, generateTwoFactorToken, generateVerificationToken, getTwoFactorToken } from '@/lib/tokens'
import { sendPasswordResetEmail, sendVerificationTokenEmail } from '@/lib/mails'
import { getUserByEmail } from '@/lib/actions'
import { eq } from 'drizzle-orm'
import { ActionState } from '@/lib/definitions'
import { redirect } from 'next/navigation'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL

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
  token: z.optional(z.string())
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
export async function login (prevState: ActionState, formData: FormData): Promise<ActionState> {
  const validatedFields = LoginSchema.safeParse(Object.fromEntries(formData))

  // 1. validate fields
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
    const verifyToken = await generateVerificationToken(user.id)

    await sendVerificationTokenEmail({
      email: user.email as string,
      name: user.name as string,
      verificationToken: verifyToken.token
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

  // twofactor token
  if (user.isTwoFactorEnabled) {
    // generate two factor code
    const twoFactorCode = await generateTwoFactorToken(email)
    // todo: send two factor code by email

    // redirect to two factor form page
    redirect(`/two-factor-confirm?token=${twoFactorCode.id}`)
  }

  // 4. create session
  await createSession(user.id)
}

// logout user
export async function logout () {
  await deleteSession()
}

// forgot password request
const ForgotPasswordSchema = AuthFormSchema.omit({
  name: true,
  password: true
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
  const userId = token as string

  // encript password
  const hashedPassword = await bcrypt.hash(password, 10)

  // update password
  await db.update(users).set({
    password: hashedPassword
  }).where(eq(users.id, userId))

  return {
    success: 'Password updated correctly.'
  }
}

const TwoFactorSchema = z.object({
  id: z.string(),
  twoFactorCode: z.string().length(6, { message: 'Two factor must be 6 characters length.' })
})

// validating two Factor Code
export async function validateTwoFactor (prevState: ActionState, formData: FormData): Promise<ActionState> {
  const validatedFields = TwoFactorSchema.safeParse(Object.fromEntries(formData))

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid field.'
    }
  }

  const { id, twoFactorCode } = validatedFields.data

  const existingTwoFactor = await getTwoFactorToken(id)

  if (!existingTwoFactor) {
    return {
      message: 'Two factor code not found.'
    }
  }

  if (new Date(existingTwoFactor.expiredAt as Date) < new Date()) {
    return {
      message: 'Two factor code has expired. Please, generate a new one.'
    }
  }

  if (existingTwoFactor.token !== twoFactorCode) {
    return {
      message: 'Two factor code is incorrect. Please verify your two factor code.'
    }
  }

  // recover user from twoFactorToken
  const email = existingTwoFactor.email as string

  const existingUser = await getUserByEmail(email)

  if (!existingUser) {
    return {
      message: 'Account not found. Please, verify again.'
    }
  }

  // create session
  await deleteTwoFactor(id)
  await createSession(existingUser.id)
}
