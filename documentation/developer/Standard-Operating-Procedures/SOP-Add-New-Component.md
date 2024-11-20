# SOP: Create New Component

Use the `plop` generator to create a new component with patterns already defined.

## Generate the code and place it

-   Open a terminal in the root of the project
-   Enter `yarn plop` and choose `component` in the interactive picker, or `yarn plop component`
-   Copy and paste output files from root to desired subfolder `core/components/*`
-   Restart Storybook for it to pick up the new `stories.tsx` file
-   Open Storybook to see the new component in the list

## Wire up Contentful

If the component is a Contentful component:

-   Populate the `MyComponent.contentful.tsx` configuration file
    -   Add Contentful entry types
    -   Dynamically import the component
    -   Map Contentful fields to React Component props
    -   Fill in other required fields
-   Export the config mapper from `components/index.ts`
-   Import it into `next-contentful/mappers/registry/all-configs.ts`
