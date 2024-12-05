import 'server-only'

import { SignJWT, jwtVerify } from 'jose'
import { SessionPayload } from '@/lib/definitions'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { DEFAULT_AUTH_REDIRECT_PAGE, DEFAULT_UNAUTH_REDIRECT_PAGE } from '@/middleware-routes'
import { isRedirectError } from 'next/dist/client/components/redirect'

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

// define a secret key using openssl
if (!process.env.SESSION_SECRET) {
  throw new Error('Session secret code is not defined. Generate secret code using "openssl rand -base64 32" command. Then save on SESSION_SECRET in .env file.')
}

// set cookie name to session cookie on .env
if (!process.env.COOKIE_SESSION_NAME) {
  throw new Error('Please, asign a cookie name to manage sessions on cookies. Add COOKIE_SESSION_NAME on .env file.')
}

const cookieName = process.env.COOKIE_SESSION_NAME

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

  try {
    const cookieStore = await cookies()

    await cookieStore.set(
      cookieName,
      session,
      {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/'
      }
    )

    return redirect(DEFAULT_AUTH_REDIRECT_PAGE)
  } catch (error) {
    if (isRedirectError(error)) {
      throw error
    }
    console.log(error)
  }
}

export async function verifySession () {
  const cookieStore = await cookies()
  const cookie = await cookieStore.get(cookieName)?.value

  try {
    const session = await decrypt(cookie)

    if (!session?.userId) {
      redirect(DEFAULT_UNAUTH_REDIRECT_PAGE)
    }

    return { isAuth: true, userId: session.userId }
  } catch (error) {
    if (isRedirectError(error)) {
      throw error
    }
    console.log(error)
  }
}

export async function updateSession () {
  const cookieStore = await cookies()
  const session = await cookieStore.get(cookieName)?.value

  const payload = await decrypt(session)

  if (!session || !payload) {
    return null
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

  await (await cookies()).set(cookieName, session, {
    httpOnly: true,
    secure: true,
    expires,
    sameSite: 'lax',
    path: '/'
  })
}

export async function deleteSession () {
  const cookieStore = await cookies()
  await cookieStore.delete(cookieName)

  redirect(DEFAULT_UNAUTH_REDIRECT_PAGE)
}

export async function existingSession () {
  const cookieList = await cookies()
  const session = cookieList.get(cookieName)

  return !!session
}

export async function getSession () {
  const cookieStore = await cookies()
  const cookie = cookieStore.get(cookieName)?.value

  if (!cookie) {
    return null
  }

  const session = await decrypt(cookie)

  if (session) {
    return session?.userId
  } else {
    return null
  }
}
