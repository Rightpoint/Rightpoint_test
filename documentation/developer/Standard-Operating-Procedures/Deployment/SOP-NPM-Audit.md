# SOP: Yarn/NPM Audit

Out of the thousands of NPM dependencies, we must run the audit command on the specific subset of packages used for production deployment.

# Github action on every push

There is a github action `.github/workflows/test` that runs the `audit` job:

-   `yarn turbo prune --scope=@rightpoint/web` - prune @rightpoint/web application
-   `/bin/bash -c 'yarn --cwd=out/ audit --groups dependencies; [[ $? -ge 16 ]] && exit 1 || exit 0'` - audit production dependencies, and only exit with non zero if there are critical vulnerabilities.

# Manually auditing

Install deps: `yarn`

Prune packages to frontend build, discarding all unrelated code such as `storybook`, `contentful-migrations`, old packages, etc:

## First, prune

Run command:

`yarn turbo prune --scope=@rightpoint/web`

This produces a pruned folder in `out/`

## Audit the pruned folder

Audit the pruned folder, ignoring development dependencies:

`yarn audit --cwd=out/ --groups dependencies`

# Client vs server code exists in next.js package

Dependencies used by the production package are split into server _and_ client side code in the production build. Affected dependencies must be evaluated against production+client side code primarily.

Run `yarn analyze` to output client/server bundles in your browser to help assess criticality.
