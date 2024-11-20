# Vercel

The website (apps/web) uses Vercel.com for hosting.

It provides an optional CLI for various commands such as listing domains, adding secrets / environment variables, syncing development environment variables securely, etc.

https://vercel.com/docs/cli

# Vercel CLI

See CLI documentation here: https://vercel.com/docs/cli/project

# Link to a Project

-   Run `yarn vercel link`
-   Select appropriate credentials (github)
-   Enter the project name in vercel: rightpoint-com

# Syncing env vars (optional, for now)

For now, we will commit the `.env.local` file as access is required from each developer to Vercel, but in the future, it should be purged from .git and managed in Vercel.

To download development credentials from Vercel via CLI:

-   Run `yarn vercel:env:pull`

# Vercel settings

Settings are configured via Vercel.com GUI.

## Build settings

-   build command: yarn build
-   output directory: ./apps/web/.next
-   install command: yarn install
-   root directory: ./
-   include source files outside root directory: **yes**
-   node version: 16.x

## Environment variables

Environment variables are configured via Vercel.com GUI or via CLI.

-   NEXT_PRIVATE_CONTENTFUL_PREVIEW_KEY
-   NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT
-   NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN

> You can always project find `process.env.*` or `process.env.NEXT` in the codebase to find current env var usage.

## Ignore build step

Vercel allows us to ignore a build step with a bash command.

We can inline write the following, to temporarily disable a project:

    if [[ $VERCEL_URL = rightpoint-com-lockdown-test* ]] ; then exit 0 ; else exit 1 ; fi

Test in bash:

    VERCEL_URL=rightpoint-com-lockdown-test-xyz.com
    if [[ $VERCEL_URL = rightpoint-com-lockdown-test* ]] ; then echo "matches" ; else echo "doesnt match" ; fi

Actually, we can just use to ignore on this project entirely.

    exit 0;
