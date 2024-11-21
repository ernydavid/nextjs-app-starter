import { Resend } from 'resend'
import { VerificationTokenEmail } from '@/lib/emails/verification-token-email'

const resend = new Resend(process.env.RESEND_API_KEY)
const emailFrom = process.env.RESEND_EMAIL_FROM as string

export const sendVerificationTokenEmail = async ({ name, email, verificationToken }: {
  name: string
  email: string
  verificationToken: string
}) => {
  await resend.emails.send({
    from: emailFrom,
    to: email,
    subject: 'Verification Token',
    react: VerificationTokenEmail({
      name, email, verificationToken
    })
  })
}
