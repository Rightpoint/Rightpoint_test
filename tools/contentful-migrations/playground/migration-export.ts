import Migration from 'contentful-migration'

export default function (migration: Migration) {
    const heroComponent = migration
        .createContentType('heroComponent')
        .name('Component: Hero')
        .description('')
        .displayField('title')

    heroComponent
        .createField('title')
        .name('Title')
        .type('Symbol')
        .localized(false)
        .required(false)
        .validations([])
        .disabled(false)
        .omitted(false)

    heroComponent
        .createField('body')
        .name('Body ')
        .type('Symbol')
        .localized(false)
        .required(false)
        .validations([])
        .disabled(false)
        .omitted(false)
    heroComponent
        .createField('buttonText')
        .name('Button Text')
        .type('Symbol')
        .localized(false)
        .required(false)
        .validations([])
        .disabled(false)
        .omitted(false)

    heroComponent
        .createField('buttonLink')
        .name('Button Link')
        .type('Link')
        .localized(false)
        .required(false)
        .validations([
            {
                linkContentType: ['page'],
            },
        ])
        .disabled(false)
        .omitted(false)
        .linkType('Entry')

    heroComponent
        .createField('buttonLinkExternal')
        .name('Button Link External')
        .type('Symbol')
        .localized(false)
        .required(false)
        .validations([])
        .disabled(false)
        .omitted(false)
    heroComponent.changeFieldControl('title', 'builtin', 'singleLine', {})
    heroComponent.changeFieldControl('body', 'builtin', 'singleLine', {})
    heroComponent.changeFieldControl('buttonText', 'builtin', 'singleLine', {})
    heroComponent.changeFieldControl(
        'buttonLink',
        'builtin',
        'entryLinkEditor',
        {}
    )
    heroComponent.changeFieldControl(
        'buttonLinkExternal',
        'builtin',
        'singleLine',
        {}
    )
    const pageGeneral = migration
        .createContentType('pageGeneral')
        .name('Compose: General')
        .description('')
        .displayField('name')
    pageGeneral
        .createField('name')
        .name('Internal Name')
        .type('Symbol')
        .localized(false)
        .required(false)
        .validations([])
        .disabled(false)
        .omitted(false)

    pageGeneral
        .createField('text')
        .name('Text')
        .type('RichText')
        .localized(false)
        .required(false)
        .validations([
            {
                enabledNodeTypes: [
                    'heading-1',
                    'heading-2',
                    'heading-3',
                    'heading-4',
                    'heading-5',
                    'heading-6',
                    'ordered-list',
                    'unordered-list',
                    'hr',
                    'blockquote',
                    'embedded-entry-block',
                    'embedded-asset-block',
                    'hyperlink',
                    'entry-hyperlink',
                    'asset-hyperlink',
                    'embedded-entry-inline',
                ],
            },
            {
                enabledMarks: ['bold', 'italic', 'underline', 'code'],
            },
        ])
        .disabled(false)
        .omitted(false)

    pageGeneral
        .createField('components')
        .name('Components')
        .type('Array')
        .localized(false)
        .required(false)
        .validations([])
        .disabled(false)
        .omitted(false)
        .items({
            type: 'Link',
            validations: [],
            linkType: 'Entry',
        })

    pageGeneral.changeFieldControl('name', 'builtin', 'singleLine', {})
    pageGeneral.changeFieldControl('text', 'builtin', 'richTextEditor', {})
    pageGeneral.changeFieldControl(
        'components',
        'builtin',
        'entryLinksEditor',
        {}
    )
    const pageBlogPost = migration
        .createContentType('pageBlogPost')
        .name('Compose: Blog Post')
        .description('')
        .displayField('name')
    pageBlogPost
        .createField('name')
        .name('Internal Name')
        .type('Symbol')
        .localized(false)
        .required(false)
        .validations([])
        .disabled(false)
        .omitted(false)
    pageBlogPost.changeFieldControl('name', 'builtin', 'singleLine', {})

    const seo = migration
        .createContentType('seo')
        .name('Compose: SEO')
        .description('SEO Metadata for web pages in Compose. DO NOT DELETE')
        .displayField('name')
    seo.createField('name')
        .name('Internal name')
        .type('Symbol')
        .localized(false)
        .required(true)
        .validations([])
        .disabled(false)
        .omitted(false)
    seo.createField('title')
        .name('SEO title')
        .type('Symbol')
        .localized(true)
        .required(false)
        .validations([])
        .disabled(false)
        .omitted(false)
    seo.createField('description')
        .name('Description')
        .type('Symbol')
        .localized(true)
        .required(false)
        .validations([])
        .disabled(false)
        .omitted(false)

    seo.createField('keywords')
        .name('Keywords')
        .type('Array')
        .localized(true)
        .required(false)
        .validations([])
        .disabled(false)
        .omitted(false)
        .items({
            type: 'Symbol',
            validations: [],
        })

    seo.createField('no_index')
        .name('Hide page from search engines (noindex)')
        .type('Boolean')
        .localized(false)
        .required(false)
        .validations([])
        .disabled(false)
        .omitted(false)
    seo.createField('no_follow')
        .name('Exclude links from search rankings? (nofollow)')
        .type('Boolean')
        .localized(false)
        .required(false)
        .validations([])
        .disabled(false)
        .omitted(false)

    seo.changeFieldControl('name', 'builtin', 'singleLine', {
        helpText: "⚠️ Don't edit this field! The Compose will fill it for you.",
    })

    seo.changeFieldControl('title', 'builtin', 'singleLine', {
        helpText: 'This will override the page title in search engine results',
    })

    seo.changeFieldControl('description', 'builtin', 'singleLine', {
        helpText: 'This will be displayed in search engine results',
    })

    seo.changeFieldControl('keywords', 'builtin', 'tagEditor', {})

    seo.changeFieldControl('no_index', 'builtin', 'boolean', {
        helpText: 'Search engines will not include this page in search results',
        trueLabel: 'Yes',
        falseLabel: 'No',
    })

    seo.changeFieldControl('no_follow', 'builtin', 'boolean', {
        helpText: 'Search engines will not follow the links on your page',
        trueLabel: 'Yes',
        falseLabel: 'No',
    })
}
