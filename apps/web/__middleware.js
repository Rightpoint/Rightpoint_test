import { NextResponse } from 'next/server'
/**
 *
 * Middleware is handled at the Vercel Edge nodes, and can be used to handle dynamic rewrites or
 * geolocation redirects.
 *
 * Since it's executed before _every_ request, it's important to keep it as fast as possible.
 *
 * https://nextjs.org/docs/advanced-features/middleware
 *
 * Middleware will be invoked for every route in your project, including static files, chunks.
 *
 * Important to use matchers to reduce;
 *
 * pricing is ~$1 per 1M invocations.
 *
 * https://vercel.com/docs/concepts/functions/edge-middleware#match-paths-based-on-custom-matcher-config
 */

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

const Middleware = (req) => {
    return NextResponse.next()
}

export default Middleware
