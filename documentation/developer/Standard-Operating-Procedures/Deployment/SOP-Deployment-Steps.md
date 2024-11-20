# SOP: Deployment Steps

## Create a PR into `main`

## Ensure the workflows succeed:

-   `test` - runs tests
-   `e2e` - runs end to end tests against current build
-   `audit` - checks for critical severity production NPM package vulnerabilities
-   `chromatic` - checks for UI changes -- ensure approved by reviewer
-   Check the vercel preview deployment for your changes

## Merge when all checks pass

Done!

# Reverting to a prior build

While Vercel will not publish failed builds, there may be scenarios where a mistake is pushed.

You may promote and previous build to Production via the Vercel CLI or GUI.

Visit the deployments page of the project in Vercel, and select the `...` icon on the right of a prior working build.

Select "Promote to Production".

# Do a local production build, if needed

Sometimes, a test is needed against production, locally, such as testing optimized builds, chunking, data fetching, etc.

To do so:

[Read about local production deploy](./SOP-Local-Production-Deployment.md)

# TODO before launch:

Document exact deployment steps on Vercel.
