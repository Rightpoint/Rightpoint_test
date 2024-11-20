# Routing

The site uses fairly basic routing as per Next.js v12 docs.

Each javascript file in the `src/pages` directory corresponds to a route.

For ease of colocation and to separate routing from code, we set up pages outside this directory and in the `@rightpoint/core/pages` package.

This way, changing routes is as easy as moving folders.

# Rewrites / Proxy

Rewrites are a Next.js feature that allows you to rewrite a URL to another URL.

It can even be used to proxy requests to different domain.

We use this layer to handle more advanced routing requirements.

For example, in `get-contentful-rewrites.js`, we query the CMS for landing page categories via `GraphQL` and return an array of rewrites that proxy the root paths to specific internal pages.

    return landingPageCategories.flatMap(({ slug }) => [
        /**
            * From:
            * /<landing-page-category-slug>
            *
            * To:
            * /landing/<landing-page-category-slug>
            */
        {
            source: `/${slug}`,
            destination: `/landing-pages/category/${slug}`,
        },
        // ....
    ])

This output generates rewrites that map each landing page category to the root domain as static intercepts per slug.

Any slug in a landing page category `/<slug>`, at _build time_ will be proxied to `/landing-pages/category/<slug>`.

### Caveats

The above rewrite will now expose two paths with the same content: `/landing-pages/category/<slug>` and `/<slug>`

Although the internal path should never be accessible/crawled, we use a Canonical tag just in case via the relevant page mapper `entryToSeoProps` function.

    entryToSeoProps: async ({entry, manager}) => ({
        canonicalUrl: await manager.getUrl(entry)
    })
