# SOP: Remove Package

When removing a package, it's important to understand exactly where it is consumed.

In short, search for `@rightpoint/my-package` to find all references, whether it be an import, a next.config.js transpile list, or a package.json dependency.

> Note: Using `yarn dep-graph` may help identify various packages visually.

# Project find & replace

The recommended approach is to do a full project find for your package, i.e <kbd>ctrl/cmd + shift + f</kbd> and search for the package name.

Due to the use of packages and barrel files, there are only so many entry points, and this makes finding usage very consistent. One search will reveal all use cases.

Specific areas to consider:

-   Remove every import from your package
-   Remove from `next.config.js`
-   Remove dependencies

Each of these can be accomplished with a find and replace.

-   Find/remove imports: search for `@rightpoint/my-package`
-   Find/remove dependencies: search for `"@rightpoint/my-package": "*"` and remove
-   Find/remove from `next.config.js`: search for `"@rightpoint/my-package"`
