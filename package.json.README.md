# Package.json Readme

## Node version updates

Node versions change frequently and are deprecated/unsupported by hosting services over time.

-   Enter `node -v` to see your version.
-   Ensure `.nvmrc` updated to match current requirement
-   Ensure `package.json engines` updated to match current requirement
-   Use `npm dist-tags @types/node` to see tags that match the node version
    -   Install `@types/node@ts.XXXX` and update all above
