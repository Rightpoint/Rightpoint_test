# Environment Variables

The Next.js app uses environment variables to configure its behavior across differing environments.

https://nextjs.org/docs/basic-features/environment-variables

## When to use

Environment variables should be used when:

-   Secrets are involved and you wish to keep them out of the codebase
-   You wish to use different values for different environments
-   It is acceptable to have compile-time values in your codebase that only differ between builds

Otherwise, you may consider using the `@rightpoint/core/variables` or `@rightpoint/private-variables` packages to store constant or run-time values (provided it is safe to do so.)

[See Variables SOP for more information](./Standard-Operating-Procedures/SOP-Variables.md)

## .env files

Environment variables are loaded for various environments from the codebase, and on Vercel are merged with secrets defined in the admin panel.

We are storing credentials in `.env.local` for now, but as soon as developers have accounts at Vercel, we should be using the Vercel CLI to sync env vars to your local machine, so that secrets are not stored in the codebase, access controls are in place, and are maintained at Vercel.

[Read more about vercel env var syncing](/documentation/developer/Vercel.md)

They are found in the Next.js root directory, and options are `.env.local`, `.env.development`, `.env.production`, and `.env.staging`.

    apps/
        web/
            .env.local
            .env.production
            .env.staging
            .env.development
            // and vercel admin panel

## Public vs Private variables

Environment variables prefixed with `NEXT_PUBLIC` are exposed to the browser and consistently available via the global `process.env`, whereas other prefixes are only available in the node.js server environment.

_Developer diligence is required to determine what data may be made public._
