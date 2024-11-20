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
Middleware will be invoked for every route in your project. 
The following is the execution order:
    headers from next.config.js
    redirects from next.config.js
    Middleware (rewrites, redirects, etc.)
    beforeFiles (rewrites) from next.config.js
    Filesystem routes (public/, _next/static/, Pages, etc.)
    afterFiles (rewrites) from next.config.js
    Dynamic Routes (/blog/[slug])
    fallback (rewrites) from next.config.js
 */
const Middleware = (req) => {
    /**
     * TODO: Must use the vercel edge api to get contentful redirect data.
     *
     * - Cannot use Contentful standard lib because it's not available on the edge.
     * - Must find method to cache heavily (see if we can store a small amount of data in-memory) to maintain performance
     */
    if (req.nextUrl.pathname === '/jim') {
        return NextResponse.redirect(`${req.nextUrl.origin}/yuji`)
    }
    return NextResponse.next()
}

export default Middleware
