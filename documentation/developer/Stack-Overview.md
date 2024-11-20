# Stack Overview

Jamstack. The modern way to build Websites and Apps that delivers better performance.

https://jamstack.org/

# React: Frontend framework

React is a frontend framework that needs no introduction.

# Next.js: Site generator

Next.js is a site generator that uses React to build hybrid static sites.

It can do server side rendering, static rendering, chunking, SPA-like page navigation, serverless functions, and more.

# Contentful: Headless CMS

Contentful is a headless CMS that powers most of the site content.

[More info](/documentation/developer/Contentful.md)

# Vercel: Host

Vercel is the creator of Next.js and is the hosting platform for the Next.js framework and other tools.

It features automatic scaling, CDN, secrets management, deployment UI, CD pipelines for every commit, and more.

# Github: Code repository

Github is being used vs Azure due to the more robust ecosystem that exists for this project.

-   Vercel integrated via GH deployments
-   Chromatic integrated via GH actions and comments
-   Vercel/Chromatic mirror GH credentials for access control

# Github actions: CI pipelines

Github is also used for continuous integration.

Currently, but not limited to:

-   Deploy to Chromatic, run UI diffs
-   Run tests
-   Run NPM audit of production packages, fail on critical vulnerability
-   Run Cypress integration tests against the newly built production preview instance
-   Run Lighthouse scoring for mobile/desktop on every PR

# Turborepo: Build tooling

Turborepo supplies light weight monorepo patterning, and is a build pipeline.

It is relatively un-opinionated and can even be removed without breaking the project.

> Note: Turborepo is owned by Vercel, and is supported by enterprise code level support. A major factor in tooling choice.

Turbo:

-   Caches results of arbitrary commands like `turbo run lint` or `turbo run test` to only affect changed files, keeping local and CI/CD toolchains fast.
-   Creates pruned packages for deployment that contain only the code necessary for a particular build target (e.g. Storybook, Next.js, CI actions) for additional performance improvements.
-   Remotely caches results via Vercel to share caches across CI pipelines _and_ developers.
-   Build pipeline orchestration, such as lint, test, cypress, build, and deploy -- where deploy only happens when subsequent steps complete successfully.

Turbo's impact will grow as the codebase complexity and build times increase.

# Storybook: Component library

Storybook is a tool that allows developers to quickly build components in isolation outside of an application that might implement them.

It also allows for various features:

-   Accessibility testing
-   Easily test variants (stress test)
-   Published site to share with designers, stakeholders
-   Browser testing possible in near future launch of v6.5 right inside storybook files.

# Chromatic: Storybook hosting & regression testing

Chromatic is created by the same team that created Storybook.

It hosts Storybooks for every commit, connects with github to show easily shareable links, and provides visual regression testing for components.

It allows developers and reviewers to quickly see what components has changed with a visual diff against the main branch.

# Cypress: Headless browser testing

Cypress provides headless (or headed) browser testing.

It may optionally be combined with the cypress.io service for much easier access to: tracking, trends, video/screenshot recording, and more.

# Plop: Code generator

Plop is a light weight code generator that allows for quick scaffolding of common features while maintaining patterns.

Run `yarn plop` to see the list of available generators.

# Yarn: package manager

Yarn is a package manager that is used to install and manage dependencies. It currently runs better than `npm` for monorepo projects with workspaces, in our own testing in this package.

# Husky: Git hooks

Husky is a cross platform git hook helper that is automatically installed upon project install.

It is used to auto format using `prettier` against the staged files with `lint-staged` -- even if editors are not configured properly or a quick edit is made with VIM, nano, etc.
