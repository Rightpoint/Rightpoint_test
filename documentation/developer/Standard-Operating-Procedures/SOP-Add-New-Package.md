# SOP: Add New Package

When adding a new package to the monorepo, it is important to understand the following:

## What is the scope of the package

Is it a common feature that should be bundled in all packages?

Is it a feature that contains a large dependency and should be contained in an individual package, so as to clearly compartmentalize its large dependency to its implementation?

# How to add the package to the Next.js app

At a high level, the following steps are required:

-   Create the package in packages/<group folder>
-   If the group folder doesn't exist, ensure it is added to `<rootDir>/packages.json` `workspaces` key
-   Ensure the new `package.json` contains a unique `name` key
-   Add the package name (`@rightpoint/<my-name>`) to `next-transpile-modules` in `next.config.js`
-   Add the package as a dependency to the consuming package (apps/web/package.json or other imported dependency) in its `package.json` by adding it manually with the "\*" value, e.g. `"@rightpoint/my-package": "_"`
-   Run `yarn` to link the package trees
