# Rich Text

The rich text component is used to display HTML styled in a particular way.

There may be multiple rich text styles available over time, unique to a location.

# Contentful Rich Text

Contentful rich text is a specially formatted document that can contain many advanced content types, including entire entries and their children (up to 10 levels deep).

Any entry linked from within a rich text field will also be returned as the entire target entry payload. This causes an exponential increase in payload over time, so we have developed a two phase system for rendering contentful rich text.

> For example, imagine a rich text field with a link to a page. That page itself contains links to 5 other pages, whose pages themselves contain links to other pages. This entire tree would be returned, until limits hit. Easily passing 10mb+ in initial testing.

## Phase 1: Process the rich text document and shrink it for the client

In `entryToProps` (which must be JSON serializable), we return a pared down document using the `contentfulRichTextDocumentToJsonSafe` function.

This function does the following:

-   Run entries through the component mapper, to generate the json-safe props used to render it
-   Format it in a special way that can be intercepted in the render phase
-   Remove entry fields that are nested beyond one level

This "RP Rich Text Document" gets sent to the client as a JSON string.

## Phase 2: Render the rich text document

In the second phase, the client consumes the "RP Rich Text Document", and uses the `prepareJsonUnsafeProps` function to convert the "RP Rich Text Document" into a React tree.

To do so, we use the official Contentful Rich Text React Renderer without modification, except we look for our custom `nodeType`s and inject our components.

# Plain HTML

To render plain html, markdown, etc, simply pass the markup to the component:

    <RichText><h1>Hello World</h1></RichText>

# Future different rich text styles

Future style sets can be defined in `RichText.styles` and used site-wide.
