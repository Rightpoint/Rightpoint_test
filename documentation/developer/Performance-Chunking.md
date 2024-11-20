# Performance Optimization

# Our packages/\* barrel files have disabled webpack side effects

In short, the barrel files provide for a clean, maintainable consumer API without direct file imports, but the packages must declare `no-side-effects` or else any import in the barrel file will cause all other imports to be bundled.

The `next.config.js` webpack configuration ensures that all `/packages/*` barrel files are set to `no-side-effects`.

This allows tree shaking, and otherwise would result in extremely large files.

The following tests are visible at every build, and help confirm that page chunks are behaving as expected.

# Frontend chunking tests

| Status | URL                                                     |                                                                     |
| ------ | ------------------------------------------------------- | ------------------------------------------------------------------- |
| ✅     | /\_tests/tree-shaking/large-lib-used                    | Large libs imported are only chunked in actual usage                |
| ✅     | /\_tests/tree-shaking/large-lib-unused                  | Next.js imported but unused do not get chunked                      |
| ✅     | /\_tests/tree-shaking/large-lib-server-only             | Ensure that imports used in getStaticProps stay server side         |
| ✅     | /\_tests/tree-shaking/large-lib-server-only-remote-file | Ensure even if getStaticProps defined elsewhere, code isn't bundled |
| ✅     | /\_tests/tree-shaking/barrel-imports                    | Ensure various barrel file imports are correctly handled            |

During build, these tree shaking files should be monitored to ensure we don't see anything unexpected due to changing webpack configs or project code structure over time.

![Chunking example](/documentation/developer/img/chunking-example.png)

# Dynamic import tests

All contentful components are loaded via `next/dynamic` because we require a component:contentful mapping that can only be determined at run time, when the CMS payload returns.

In other words, webpack cannot statically determine what contentful component to chunk for an arbitrary page.

The following tests play with `next/dynamic` / `import()` imports to understand exactly how they work.

| Status | URL                            |                                                                         |
| ------ | ------------------------------ | ----------------------------------------------------------------------- |
| ✅     | /\_tests/dynamic/import-direct | Control group: direct import without use of dynamic()                   |
| ✅     | /\_tests/dynamic/import-ssr    | Default dynamic import, results in static output same as direct import. |
| ✅     | /\_tests/dynamic/import-no-ssr | No SSR and client side download queued at low priority                  |

# Analyze webpack bundle

Separately, you can directly analyze the bundles:

-   Analyze Webpack Bundle [Read](/documentation/developer/Analyze-Webpack-Bundle.md)
