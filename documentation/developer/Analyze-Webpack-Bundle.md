# Analyze Webpack Bundle

To analyze the client/server webpack bundle, run `yarn turbo run analyze`

This will create two browser tabs with the client bundle, and server bundle.

Use this information to ensure your bundles are optimized for production, don't have unnecessary issues (such as failed tree-shaking, huge files, etc.)

It can also be used to ensure private data is not leaked to the client, should you find via `yarn dep-graph` that some private data is entering production.
