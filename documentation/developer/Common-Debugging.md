# Common Debugging

## Internal server error, chunk not found

The missing chunk error is often caused when a production build (yarn build) is run while the dev server is running.

-   Restart the dev server, and then try again.
-   If the error persists, delete the `apps/web/.next` folder.

## @rightpoint/ package not found

If a local package is not resolved, the package has not been linked to the `node_modules` folder.

This is caused by adding a new local dependency in a package.

Run `yarn` to relink packages.

## Module parse failed, need a loader

The following error is usually caused by the web app importing a package that is not being transpiled by Next's compiler.

> You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders

If adding a new package, and you get an error abuot needing a loader for TypeScript, ensure that your package is added to `next.config.js` transpile list:

    const packages = [
        "contentful",
        "data-generators",
        "core",
        "components",
        ...
    ]

## Misc

-   `next-transpile-modules` error -- ensure `next.config.js` does not contain non existing packages.

## Contentful fetch failed to locate

If the environment, space id, and content type id look correct, then make sure the Contentful API key you are using has access to the target environment.
