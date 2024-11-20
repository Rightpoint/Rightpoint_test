# SOP: Local Production Deploymnet

Sometimes, it's necessary to do a local deployment that's built with production mode.

For example, you may need to test production bundles and debug webpack chunking, performance testing, etc.

To build a local production environment:

-   Build the Next project via `yarn build`
-   Serve the production Next.js server via `yarn --cwd apps/web start`
-   Visit the outputted URL

# Bundle analyzer

You may also wish to observe production server/client bundles.

To do so, run `yarn turbo run analyze`
