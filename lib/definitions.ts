export type ActionState = {
  errors?: {
    [key: string]: string[] | undefined
  },
  message?: string | null
  success?: string | null
  [key: string]: any
} | undefined

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
