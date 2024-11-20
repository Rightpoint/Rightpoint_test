# SOP: Create New Next.js Page Package

You may always simply create a page in `apps/web/pages/`, but it is encouraged to use packages to:

-   Encapsulate your code
-   Separate server from client code
-   Define clear dependencies to prevent bloat and optimize builds over time
-   Allow for consistent project wide code colocation or subdirectory organization (since each file in `pages/` will generate a page, we cannot do this in the pages folder.)

> NOTE: For dead simple pages such as 404, 500, etc. that we don't mind bundling in one package, you may opt to use the `@rightpoint/page-basic` package which contains multiple pages. Other common page groups may get created as development progresses.

# Creating a new page package

## Use the code generator

Use the `plop` generator to create a new Next page package with patterns already defined.

-   Open a terminal in the root of the project
-   Enter `yarn plop` and choose `next-page-package` in the interactive picker, or `yarn plop next-page-package`
-   Follow the prompts by providing package name, page name. Package name should be `kebab-case`, page name should be `CapCasePage`.
-   Confirm prompt to include package in `next.config.js`, `web/package.json`. (or do it manually later)
-   Observe created page package in `packages/` directory

## Observe outputs

A new package has been created at `packages/<package-name>/` containing:

-   A `.page.tsx` file containing the `NextPage` component
-   A `.page.server.tsx` file containing server code
-   A `.styles.tsx` file containing styles
-   A `index.ts` barrel file importing and exporting the new functions

If prompt to automatically update the web app was confirmed:

-   `web/package.json` has been modified with the new package
-   `next.config.js` has been modified with the new package
-   `apps/web/pages/<package-name>` has been created to move, rename, modify as needed

All done!

## Develop the pages as needed

-   Fill in the `<MyPage>.page.tsx` file
-   If server side data required, flesh out the `<MyPage>.page.server.tsx` file
-   Use structure unique to the page requirements complexity (i.e. may have a local components folder, local data parsing functions, etc.)

# Link packages and restart server

After any new packages are created, you must link them by running `yarn` at the root.

## Run yarn to link packages

Run `yarn` in the root of the project to recalculate dependencies and build package links.

## Restart dev server

Stop the dev server and run `yarn dev` or `yarn start` (whichever you were using before) to restart the Next server.

## Observe the page in the browser

All done! Visit `localhost:6000/<my-page>` (whatever you input for the name of the package) to see your page.

## Restart TS Server if needed

If your VSCode shows an unresolvable import to your new package, you may have to restart TS Server to see updated dependencies (but only in the editor) -- the project will still build and run.

-   Open VSCode command pallette <kbd>ctrl/cmd</kbd> + <kbd>shift</kbd> + <kbd>P</kbd>
-   Select `Restart TS Server`

# Manually integrating package into the Next.js project if you did not allow the generator to do so

Follow this guide if you have _not_ allowed the generator to update the web package, next.config, etc.

## Integrate your page into the Next.js project

> NOTE: You do not need to do this if you used the code generator option that automatically creates a Next.js page for you

Import your page and server side code into a file named as needed (path match, exact path, etc.) in the `apps/web/pages/` directory, exporting the key functions you need:

-   `Default export` the page component
-   `Named export` the server functions (`getStaticProps`, `getStaticPaths`, `getInitialProps`, etc.)

## Add the package to the web app package.json

> NOTE: You do not need to do this if you used the code generator option that automatically updates the package.json for you

Open the `apps/web/package.json` and add your new dependency in the `dependencies` section. Use `"@rightpoint/my-package" : "*"` as defined in your packages `package.json` `name` field.

Using `"*"` creates a local link to your package.

## Add the package to next.config.js

> NOTE: You do not need to do this if you used the code generator option that automatically updates the next.config.js for you

Edit the `next.config.js` file and add your package to the `next-transpile-modules` array.
