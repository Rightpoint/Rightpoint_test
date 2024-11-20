# Local installation

This project is intended to be run on Windows and MacOs operating systems.

## Basic dependencies:

Ensure the basic dependencies are installed system wide.

### On Windows:

-   Node v18 from [node website](https://nodejs.org/en/download)
    -   Download the appropriate installer (.msi) from the website (usually 64 bit)
        -   Example: https://nodejs.org/dist/v18.15.0/node-v18.15.0-x64.msi
    -   Follow install instructions
        -   **You must** check the box labeled "Install additional build tools" or else packages that require compilation from source will fail
        -   Note: If you need to use multiple version of Node on the same machine, install `nvm-windows`
-   Git
-   Yarn

### On Other Environments:

MacOs, Linux flavors, etc.

Install:

-   Node v18 from node website [node website](https://nodejs.org/en/download)
    -   Note: use `nvm` if multiple versions required
        -   `nvm install 18`
        -   `nvm use 18`
-   Git
-   Yarn

## Installation

-   Clone the repository
-   `cd` into the project
-   Run `yarn` to install dependencies
-   Run `yarn vercel link` and authenticate with Vercel (see notes below "Linking Vercel")
-   Run `yarn vercel:env:pull` to download development environment variables
-   Run `yarn start` to start the Next.js frontend and Storybook
    -   Or, run `yarn dev` to start Next.js individually
    -   `yarn storybook` to start Storybook
-   [Read about other commands](/documentation/developer/Development-Commands.md)

> Note: Ignore most build spam of `incorrect peer dependency` warnings on `@rightpoint/core`.
>
> This is caused by the `@rightpoint/core` project importing `storybook` to colocate stories, but not its other dependencies, because they are only necessary in the `@rightpoint/storybook` project to build storybook itself.
>
> There is currently no way to silence all peer dep warnings caused by one project.

## Linking Vercel

The Vercel CLI allows you to pull remote env vars with your authentication.

This is required to run the project locally.

-   Run `yarn vercel whoami` and confirm your user
    -   `yarn vercel logout` if you are logged in as a different user
-   Run `yarn vercel login`
-   Run `yarn vercel link`
    -   `Set up apps/web?`: enter `y`
    -   `Which scope?`: Rightpoint`
    -   `Link to existing project?`: enter `y`
    -   `What's the name of your project?`: rightpoint-com-web

## Pulling env vars

Download development credentials from Vercel via CLI:

-   Run `yarn vercel:env:pull`
