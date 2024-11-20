# Packages in the monorepo context

This monorepo is composed of many local packages intended to keep dependencies localized and contained.

A monorepo contains all code for all contexts (such as apis, backends, frontends, CMS migrations, etc.) and over time, builds upon a global dependency list with no way to untangle the packages safely.

Localizing dependencies such as a large library for a migration or component, a heavily animated component, pages unique to a subset of traffic, etc., defines clear relationships that can be understood, delivered on demand, and maintained (or removed) as usage changes.

> Note: when adding a local package dependency, ensure `yarn` is run to relink packages or else the [package will not be found.](/documentation/developer/Common-Debugging.md)

# Packages overview

## @rightpoint/core

The core package contains shared code and utilities for all packages.

## @rightpoint/components

The components package contains core or reusable React components used in the project.

Complex, experimental, or one-off components supporting new features should generally be placed in a new feature package so that it may be sunsetted gracefully without adding noise to the core components.

For example: a new search feature that includes various new packages, non reusable components, etc., should be placed in a new feature package.

## @rightpoint/data-generators

Generators for storybook/test data. This package contains rather large dependencies.

## @rightpoint/eslint

Eslint configs shared across packages

## @rightpoint/page-\*

Next.js page packages

## @rightpoint/private-variables

Private variables

## @rightpoint/tsconfig

Tsconfig configs shared across packages

# Adding dependencies

Add a package dependency to a specific package by running:

`yarn workspace @rightpoint/<my-package> add <package-name>`

# Adding local dependencies

Adding a local dependency requires specifying a version "\*":

`yarn workspace @rightpoint/<my-package> add <package-name>@"*"`

Or manually adding it to the list of dependencies in the relevant `package.json`

# Overview of package dependencies

The `apps/web` Next.js codebase requires the following:

## next.config.js

For the Next app to work, there are a few key bits of configuration that must be done.

Our codebase relies on local private packages for various benefits documented below. These packages to the ecosystem are **local private npm packages**. As such, like most packages, they exist in `node_modules` and are not transpiled by babel or other tooling. Therefore, for each private package we introduce into the Next.js application, we must add it to the `next-transpile-modules` array in `next.config.js`.

## packages/core

This package contains all core code for the Next.js application.

Its intent is to expose dependencies that the developer experience expects including but not limited to: redux, React, layout, styles, variables, lodash, utilities, etc.

# Misc

## Multiple exports from a package.

Currently, you cannot export a subpath from a package with TypeScript without errors. Issue tracked here: https://github.com/microsoft/TypeScript/issues/33079

The solution is to make sure subpath exports with TypeScript only export files at the root of the package, or packages with an `index.ts` as in the `@rightpoint/core` example which exposes `@rightpoint/core/styles` `@rightpoint/core/variables` etc.

package.json

    "exports": {
        ".": "./src/index.ts",
        "./testing": "./src/testing.ts" <-- this will fail
    },

Use root files:

    "exports": {
        ".": "./index.ts",
        "./testing": "./testing.ts"
    },

Or use folders which contain an `subpackage/index.ts` barrel file:

    "exports": {
        ".": "./index.ts",
         "./subpackage": "./subpackage/"
    },

This allows imports such as `import ... from "@rightpoint/mypackage/subpackage"`
