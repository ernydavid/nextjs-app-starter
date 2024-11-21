/**
 * redirect unauth users to login page
 * default: "/login"
 * @type {string}
 */
export const DEFAULT_UNAUTH_REDIRECT_PAGE = '/login'

/**
 * protected route prefix
 * default: "/dashboard"
 * @type {string}
 */
export const PROTECTED_ROUTE_PREFIX = '/dashboard'

/**
 * redirect auth users to path you assign.
 * default: "/dashboard"
 * @type {string}
 */
export const DEFAULT_AUTH_REDIRECT_PAGE = '/dashboard'

/**
 * authentication routes.
 * enter here all paths of authentication flow
 * @type {string}
 */
export const AUTH_ROUTES = [
  '/login',
  '/signup'
]
