import { Resend } from 'resend'
import { VerificationTokenEmail } from '@/lib/emails/verification-token-email'
import { PasswordResetEmail } from './emails/password-reset-email'

const resend = new Resend(process.env.RESEND_API_KEY)
const emailFrom = process.env.RESEND_EMAIL_FROM as string
const baseUrl = process.env.NEXT_PUBLIC_APP_URL

export const sendVerificationTokenEmail = async ({ name, email, verificationUrl }: {
  name: string
  email: string
  verificationUrl: string
}) => {
  await resend.emails.send({
    from: emailFrom,
    to: email,
    subject: 'Verification Token',
    react: VerificationTokenEmail({
      name, email, verificationUrl
    })
  })
}

export const sendPasswordResetEmail = async ({ email, passwordResetToken }: {
  email: string
  passwordResetToken: string
}) => {
  const passwordResetUrl = new URL(`${baseUrl}/new-password?token=${passwordResetToken}`).toString()

  await resend.emails.send({
    from: emailFrom,
    to: email,
    subject: 'Reset Password',
    react: PasswordResetEmail({
      passwordResetUrl
    })
  })
}
