# Code generator

Uses `plop` to generate code from templates.

The code generator is a tool that generates code from templates, and allows patterns to be followed without manually reading through style guides for all files.

# Running the code generator

Run `yarn plop` to run interactive code generator prompt.

# Generators

## Component

Creates a component, test, stories, and styles in the root directory for transplantation elsewhere.

## Package

Creates a `@rightpoint` scoped private package in the `/packages/` directory with proper `typescript` configs and `@rightpoint/core` dependency.

Use this to encapsulate large new features and define clear dependencies and consumer API.

Options

-   Name: The name of the package. - `page-mypage` will become `@rightpoint/page-mypage` in `packages/page-mypage`
-   Include next.js page package dependencies? - adds `contentful`
-   Include package in next.config.js transpile modules? Use if importing package into Next.js - Modifies `next.config.js` transpile modules array. Use if package is imported directly into Next.js app. Ignore if package is imported only into other packages.

# Making a new generator

View plop documentation, or copy and paste existing generator. https://plopjs.com/documentation/
