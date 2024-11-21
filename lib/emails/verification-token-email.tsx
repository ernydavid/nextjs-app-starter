interface Props {
  name: string
  email: string
  verificationToken: string
}

export function VerificationTokenEmail ({ name, email, verificationToken }: Readonly<Props>) {
  return (
    <div>
      <h1>Verification Token</h1>
      <p>Hi {name}, this is your verification token</p>
      <p>{verificationToken}</p>
      <p>Email sent to {email}</p>
    </div>
  )
}
