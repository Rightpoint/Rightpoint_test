# SOP: Variables

It is encourage to create variables/constants vs magic strings to maintain JS bindings, refactor ability, discoverability, etc.

Hopefully there will be a precedent for the variable you wish to introduce, but if not, this is a good place to start.

# Local variables

Do not over-optimize and place all variables in a project wide scope.

See if a local file scope makes sense such in-file (`const foo = 'no-longer-magic-string'`), or in folder (`./foo.constants.ts`) depending on shared scope.

If a value is consumed above local file scope, consider further options below.

# Public variables

Public variables are stored in the `@rightpoint/core/variables` package, and are expected to be safe to be consumed by the client/browser.

_Do not_ place sensitive information in public variables.

Examples are colors, public api keys, enums.

# Private variables

Private variables are stored in `@rightpoint/private-variables` and are only safe to be consumed by the server environment.

You may use the dependency graph command `yarn dep-graph` to determine at a high level what packages consume the private package, but note that next.js often contains both private/public code.

# Style variables

Style related variables are stored in `@rightpoint/core/styles` if their scope is limited to CSS. An example of this would be the css var name `--my-var`, or a style selector.

# Environment Variables

Environment variables make sense for sensitive secrets or build-time configuration.

See [Environment-Variables](../Environment-Variables.md) for more information.
