# Fonts

Fonts on this project are stored in the web app `public/fonts/` directory.

In it should contain a folder with the font family name, its files, and a `stylesheet.css` that contains the `@font-face` declarations.

    public/
        fonts/
            font-family-name/
                font-family.woff
                stylesheet.css

## Work required when adding or changing fonts

Next.js requires in-file direct imports of global CSS into the `_app.tsx` file, and therefore must be manually maintained any time future font stylesheets are added.

Currently, we have fonts imported into `_app.tsx` and `storybook/preview.js`

-   `Reckless` - Serif
-   `Riforma` - Sans (likely obsoleted by 2023)
-   `Founders Grotesk` - Sans V2

## Deleting fonts

Remove the imports from the above areas, as fonts cause noticeable high priority network time.
