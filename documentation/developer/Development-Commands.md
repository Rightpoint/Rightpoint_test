# Local development commands

# Run Next.js dev server and Storybook

This command runs both the dev server and storybook.

`yarn start`

> Note: It is useful as the default script, but for active development, it may make more sense to run them both individually so that environments can be restarted with more granularity.

# Run the Next.js dev server

This command runs the Next.js dev server.

`yarn dev`

> Note: any other package may contain a `dev` script which will also automatically run using this command.  
> It is equivalent to running `yarn turbo run dev` which runs all related package scripts called `dev`.

> For granular control, you may add the `--scope` argument which constrains the command to one package:  
> `yarn turbo run dev --scope=@rightpoint/web`

# Build Next.js frontend in production mode

Sometimes it makes sense to build the production frontend on your local machine to test various optimizations such as code splitting, tree shaking, static builds, and more.

Run the following command to build the production frontend and run the production server:
`yarn local-production`

To do it manually, build the Next.js frontend:

`yarn build`

Then serve the Next.js frontend in production mode:

`yarn turbo run start` or `yarn workspace @rightpoint/web next start`

# Run storybook

`yarn storybook`

It ultimately runs `yarn turbo run start-storybook --scope=@rightpoint/storybook`

# Build storybook

`yarn build-storybook`

It ultimately runs `yarn turbo run build-storybook --scope=@rightpoint/storybook`

# Code Generator

Run the interactive code generator with `yarn plop`, and see what generators are available.

Including but not limited to: `component`, `package`, and `next-page-package`

-   See various `SOP-Add-*` for more use case specific information
-   See the `tools/code-generator/` package for source code & extension

# Prettier

While prettier should be installed in the editor, if a global change is made in `prettier.config.js`, run the `yarn format` command to format all files.

[Read More](/documentation/developer/Code-Formatting-Prettier.md)

# Vercel .env.local file sync

See Vercel documentation for information on pulling remote environment variables via `yarn vercel:pull-env`

-   Vercel [Read](/documentation/developer/Vercel.md)

# Dependency Graph

Run `yarn dep-graph` to output a dependency graph of the project, which can help identify incorrect dependencies, specifically backend packages with credentials being injected into the frontend.

Requires `graphviz` to be installed on the host machine.

# Test

run `yarn test` to run all tests.

# Lint

run `yarn lint` to run all lints.

# Local End to End Testing

Ensure other dev servers are not running when running this task.

run `yarn run turbo web:e2e:headed` to run the e2e tests against the local site.

[Read More](/documentation/developer/Cypress-E2E-Testing.md)
