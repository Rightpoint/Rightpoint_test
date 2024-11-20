# Next/Scripts

`next/script` is Next.js component that allows you to add scripts to your page and comes with many benefits by abstracting away third party scripts and allowing the framework to determine when to inject them.

For example, in beta, is a way to automatically create a web worker for your scripts, which will not block the main thread, and massively improve render performance.

# Strategy beforeInteractive must be placed in \_document.tsx

Note that any `"beforeInteractive"` strategy scripts _must_ be placed _directly_ in the `_document.tsx` file for Next.js to work correctly.

Either way, `beforeInteractive` should be used sparingly, as it will block the main thread and delay the rendering of the page.

## Future considerations

Consider future features such as `strategy="worker"` which will run scripts in a web worker and not conflict with the main render thread.
