# Onboarding

TBD: This document is intended to be consumed by those new to the project. It should highlight an order of reading documentation that makes sense for developers new to the project.

## Install the project.

-   Installation [Read](/documentation/developer/Installation.md)

## Get familiar with the stack

Learn about the stack in general.

-   Stack Overview [Read](/documentation/developer/Stack-Overview.md)

Learn about how local packages work throughout the codebase, and how to add dependencies.

-   Local NPM Packages [Read](/documentation/developer/Packages.md)

## Discover development commands

-   Development Commands [Read](/documentation/developer/Development-Commands.md)

## Familiarize with CSS style

You can typically intuit the style requirements from existing examples, but it is important to understand the style guide:

-   CSS Style Guide [Read](/documentation/developer/CSS-Style-Guide.md)

## Learn about git commit patterns

-   Git Commit Patterns & Branching Patterns [Read](/documentation/developer/Git-Branching-Commits.md)

## Read Standard Operating Procedures

Various standard procedures are documented in `/documentation/developer/Standard-Operating-Procedures/` for common tasks such as creating new components, packages, pages, deployments, etc.

# Start coding

Start a new branch, make some changes, push to remote, and the CI/CD pipeline will generate a new Next.js instance, and storybook instance.

## Create a new Page package

-   `yarn plop` and choose the Next Page Package generator.
    -   Say yes to all promps.
-   Run `yarn` to link/"install" the newly created package.
-   Run `yarn dev` to run the `Next.js` server.
-   Navigate to whatever you named your package i.e. `localhost:8000/MyPackage` and see your new page.
-   Modify `Page` component to see updates in the browser.

See SOP for details:

-   Create New Next.js Page Package [Read](/documentation/developer/Standard-Operating-Procedures/SOP-Add-New-Next-Page-Package.md)

## Delete the new package

You may simply remove all references to the package via a find to locate all references and delete/modify them as needed.

Remove/modify the `next.config.js` transpile list, `web/package.json`, and the stub page file generated in `web/pages/`

See SOP for details and strategies:

-   Remove Package [Read](/documentation/developer/Standard-Operating-Procedures/SOP-Remove-Package.md)

## Create a new component

Create a component, and see it in Storybook:

-   `yarn plop component`
-   Copy generated folder from root to wherever you wish -- `packages/components/src/lib/` usually.
-   Restart storybook `yarn storybook`
-   See the new component in Storybook.
-   Modify the component to see updates in the browser.

Read SOP for more details:

-   Create New Component [Read](/documentation/developer/Standard-Operating-Procedures/SOP-Add-New-Component.md)
