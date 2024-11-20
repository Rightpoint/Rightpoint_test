# Storybook (TBD)

# Global decorators

Global decorators are defined in `storybook/preview.js` and applied to all stories, such as the Redux Provider.

## Decorators args

Decorator arguments can be passed via a special prop called `decoratorArgs` which can be passed to any component.

See `decorators-with-args.tsx` for implementation.

Currently, you can use it to modify the background color of a story.

# Chromatic

Build storybook  
`yarn build-storybook`

Run Chromatic

<!-- `npx chromatic --project-token=ca305a06d1c3 --storybook-build-dir dist/storybook` -->
