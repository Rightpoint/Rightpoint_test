# Code Formatting

We are relying on `prettier` for opinionated code formatting of all our code.

This reduces discussion about code formatting allowing the team to focus on what matters, and is also generally a productivity boost.

# Configuration

The prettier configuration is located at `./prettier.config.js`.

If making changes, apply changes against the entire codebase via `yarn format` or `prettier --write <blob>`

# Guaranteed to run

Due to the fact `prettier` is best used in an Code Editor, it may not always be executed.

Therefore, we execute it against staged files using `lint-staged`, on the `pre-commit` git hook which ensures that any staged files are still passed to `prettier` regardless of whether a user has enabled `prettier` in their editor, or uses say `vim` or `nano`.

## More on git commit hooks

We are using the husky library to provide git commit hooks.

https://typicode.github.io/husky/#/

It sets the git hooks config to a .husky directory that is stored in the repository, and will automatically be configured on project installation.

## Prettier is only run on the commit hook against `.ts(x)?` files.

Since developers _should_ be using `prettier` in their editor, we are not running `prettier` against all files.

Change this rule in `package.json` you want to run prettier against other files on commit hook.

# Ignoring files from prettier

If there are any files that should not be modified, update the `.prettierignore` file.

# Ignoring specific code sections

See here https://prettier.io/docs/en/ignore.html for various language gudiance on how to disable prettier in specific code sections.
