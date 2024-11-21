export type SessionPayload = {
  userId: string
  expiresAt: Date
}

export type UserDTO = {
  name: string | null
  email: string | null
  image: string | null
  isTwoFactor: boolean | null
}
