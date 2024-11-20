# Local installation

This project is intended to be run on Windows and MacOs operating systems.

## Basic dependencies:

Ensure the basic dependencies are installed system wide:

On Windows:

-   Install Node v16 from node website
    -   When installing Node v16, go to https://nodejs.org/en/blog/release/v16.16.0/ and download the appropriate installer.
    -   https://nodejs.org/dist/v16.16.0/node-v16.16.0-x64.msi
    -   **You must** check the box labeled "Install additional build tools"
    -   Note: If you want to use multiple version of Node, install `nvm-windows`
-   Git
-   Yarn

On Other Environments:

-   Install Node v16 from node website
    -   Note: use `nvm` if multiple versions required
        -   `nvm install 16`
        -   `nvm use 16.XX.XX`
-   Git
-   Yarn

## Installation

-   Clone the repository
-   CD into the project, then execute: `yarn`
-   Once complete, run `yarn start` to start the Next.js frontend and Storybook
    -   Or, run `yarn dev` to start Next.js individually
    -   `yarn storybook` to start Storybook
-   [Read about other commands](/documentation/developer/Development-Commands.md)

## Optional: Linking vercel

Vercel CLI allows you to pull remote env vars, configure domains, and much more.

-   Run `yarn vercel link`
-   Select appropriate credentials (github)
-   Enter the project name in vercel: rightpoint
-   Done!

## Syncing env vars (optional, for now)

For now, we will commit the `.env.local` file as access is required from each developer to Vercel, but in the future, it should be purged from .git and managed in Vercel.

There is a method to download development credentials from Vercel via CLI:

-   Run `yarn vercel:pull-env`
