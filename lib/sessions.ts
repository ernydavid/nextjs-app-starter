import 'server-only'

import { SignJWT, jwtVerify } from 'jose'
import { SessionPayload } from '@/lib/definitions'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { DEFAULT_AUTH_REDIRECT_PAGE, DEFAULT_UNAUTH_REDIRECT_PAGE } from '@/middleware-routes'

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt (payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

export async function decrypt (session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256']
    })
    return payload
  } catch (error) {
    console.log(`Failed to verify session. Error: ${error}`)
  }
}

export async function createSession (userId: string) {
  const cookieDuration = 7 * 24 * 60 * 60 * 1000 // 7 days
  const expiresAt = new Date(Date.now() + cookieDuration)

  const session = await encrypt({ userId, expiresAt })

  await (await cookies()).set(
    'session',
    session,
    {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: 'lax',
      path: '/'
    }
  )

  redirect(DEFAULT_AUTH_REDIRECT_PAGE)
}

export async function verifySession () {
  const cookie = await (await cookies()).get('session')?.value
  const session = await decrypt(cookie)

  if (!session?.userId) {
    redirect(DEFAULT_UNAUTH_REDIRECT_PAGE)
  }

  return { isAuth: true, userId: session.userId }
}

export async function updateSession () {
  const session = await (await cookies()).get('session')?.value
  const payload = await decrypt(session)

  if (!session || !payload) {
    return null
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

  await (await cookies()).set('session', session, {
    httpOnly: true,
    secure: true,
    expires,
    sameSite: 'lax',
    path: '/'
  })
}

export async function deleteSession () {
  await (await cookies()).delete('session')
  redirect(DEFAULT_UNAUTH_REDIRECT_PAGE)
}

export async function existingSession () {
  const cookieList = await cookies()
  const session = cookieList.get('session')

  return !!session
}
