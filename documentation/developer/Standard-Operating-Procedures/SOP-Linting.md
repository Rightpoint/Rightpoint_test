# SOP: Linting

Linting is useful to enforce patterns and catch common mistakes.

The project is set up with `ESLint` via command line and in `VSCode`.

-   Run `yarn lint` to lint all packages
-   VSCode plugins:
    -   Install `ESLint` plugin (id: dbaeumer.vscode-eslint)
    -   Install `Code Spell Checker` plugin (streetsidesoftware.code-spell-checker) which also catches common errors.

## Preset configuration

The global eslint preset is configured in the `eslint` local package.

`/packages/eslint/eslint-preset.ts`

## Ignore linting for specific files

While the `yarn lint` command will lint specific packages with their own rules, VSCode or your editor may not. Add ignored directories to `.eslintignore`

## Add lint script

To setup ESLint into your package you will need to create an ESLint config file and then add a `lint` script to `package.json`. `yarn lint` or `yarn turbo run lint` will run all `lint` scripts found in child packages.

    {
        "name": "mypackage",
        "scripts": {
           "lint": "eslint --ext .js,.ts src test"
        },
        ...
    }

## Add config file

First, create a `.eslintrc.js` config file and include the following configuration inside:

```js
const config = require('@rightpoint/eslint/eslint-preset')

module.exports = {
    ...config,
}
```

This will load the ESLint preset for the project.

# Customizing per package

You can introduce your own presets and configurations overriding the root ones, for example if using a different framework, or a different team/phase of project requiring differing rules in the `.eslintrc.js` export.
