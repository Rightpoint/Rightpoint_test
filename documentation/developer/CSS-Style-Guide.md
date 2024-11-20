# CSS Style Guide

Using `styled-components`.

# Common gotchas

Needing to reference a child component in a parent component.

-   Use immediate child, element, or other selector guaranteed to target your element.
-   If that's not available, you can create custom styled component that has a class name.

# File format

The `yarn plop (component)` will generate the proper initial CSS format, but if creating it manually, the pattern is as follows:

Create a new file called `MyComponent.styles.tsx` colocated in the directory with your target component.

In it, define a local constant called exactly `MyComponent`, and export an object with it as key and value with the name `MyComponentStyles`

    const MyComponent = styled.div``

    export const MyComponentStyles = {
        MyComponent,
        // MyComponentChild,
        // or Child,
    }

Import this object into your target component, import renaming to `s` using `import { x as s }`.

    import { MyComponentStyles as s } from "./MyComponent.styles"

The `s` alias is a consistent, short convention for referencing the styles object. It should be used if the component being styled is the same the styles component.

If a style from a different module is used, it makes sense to maintain the original name to communicate a clear distinction between local styles and external styles.

e.g.

    import { MyComponentStyles as s } from "./MyComponent.styles"
    import { OtherStyles } from "../Other.styles"

    const MyComponent = () => (
        <s.MyComponent />
            <OtherStyles.Other>
            </OtherStyles.Other>
        </s.MyComponent>
    )

This way, you can use `s.MyComponent` inside of your `MyComponent` react component without namespace clashes.

    const MyComponent = () => {
        return <s.MyComponent></s.MyComponent>
    }

Further child components may be namespaced with `MyComponent` or simply contextually named without prefix if preferred.

    <s.Table>
        <s.Row>
            <s.Cell>

    <!-- vs -->

    <s.Table>
        <s.TableRow>
            <s.TableCell>

# Styled component props

All styled component props should be typed immediately in the styled component call.

When writing additional css, use the styled components `css` helper, so that automatic code formatting is not lost.

    const MyComponent = styled.div<{
        color?: string
    }>`
        // ensure `css` is used for formatting
        color: ${(props) => props.color && css`
            color: ${props.color}
        `;
    `

# General guidelines

Define all styles in `styles.tsx`. If using a typography component, always extend it via `styled(typography.Headline)` in the `styles.tsx` file, and not as the polymorphic `as` prop, so that it stay reserved as needed for overrides.

The default implementation should not use overrides, but rather allow them.

# CSS variables

All CSS variables that are intended to be consumed by developers are imported as `import { cssVarNames } from @rightpoint/core/styles` and should be used in all consumers to maintain TS bindings.

While decentralizing CSS vars to local component scope can make sense for code organization, it lacks in discoverability of crucial site-wide CSS variables.

Developers may inspect `core/styles/lib/css-vars` to find both css var names and their values to use themselves, discover consumers, etc.

Naming: the keys should be JS-friendly camelCase and the values should be css-friendly kebab-case.

Example usage:

        // var-names.ts
        export const cssVarNames = {
            myRootVar: "--my-root-var",
            component: {
                myComponent: {
                    myVar: "--my-var",
                },
            }
        }

        // MyComponent.styles.tsx
        import { cssVarNames } from "@rightpoint/styles/css-vars"
        const vars = cssVarNames.component.myComponent

        cons MyComponent = css`
            ${vars.myVar}: red;

            margin-left: var(${cssVarNames.myRootVar}, 0);
        `

# Usage with Framer Motion

When using the animation library, there are a few ways to use the `motion.<element>` components provided by the framework within `styled-components`.

    const MyComponent = styled(motion.div)``

The often cleanest method is to use the `as` styled component prop to modify the target component:

    <MyComponent as={motion.div} />

This allows us to easily add/remove motion elements, much like the flow replacing native `<div>` with `<motion.div>` most intended by the framework.

# Warning: the `css` prop does not work yet

The `css` prop provided by styled-components only works with `babel-plugin-styled-components`, which is not currently fully migrated to the faster Next.js custom compiler.

Instead of:

    <s.MyComponent css={'--my-var: foo'}>

Pass a string or object to the `styled-component`, and handle the prop appropriately inside.

    <s.MyComponent cssVars='--my-var: foo'/>

    MyComponent = styled.div`
        ${cssVars}
    `

# Media queries / reusable styles

## Media queries

Media queries are defined in `@rightpoint/core/styles/responsive/media-queries.ts` exported from the `@rightpoint/core/styles` package.

Breakpoints are defined in `@rightpoint/core/styles/responsive/breakpoints.ts` exported from the `@rightpoint/core/styles` package.

They mostly match Bootstrap breakpoints for familiarity.

It is automatically imported in the code generator `Component.styles.tsx` file, and can be used as follows:

    import { media, resets, typography, zIndexes } from '@rightpoint/core/styles'

    const MyComponent = styled.div`
        ${media('xs')} { // this is from xs+
            font-size: 1rem;
        }
        ${media('xs', 'md')} { // between xs and md

        }
    `
    
It is a common pattern to assign the query function to a clearer name, especially if reused multiple times. For example: 

    const mediaNavbarStacked = media('xs', 'md')
     

## Z Indexes

Place all significant Z-Indexes in the `z-indexes` file.

Localized z-indexes should not be placed there, but any z-index that has a chance of conflicting with another one should be placed there for ease of management.

For example, the background color layer, the navbar, popups, etc., may all interact.

# Theme Props

Any styled component can receive themeing props, defined in `theme.tsx`

They are available to any styled component as `props.theme`,

    styled.div`${({theme}) => theme.colors.accent}`
