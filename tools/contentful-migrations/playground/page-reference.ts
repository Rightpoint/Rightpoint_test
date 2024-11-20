import Migration from 'contentful-migration'

const pageMigration = (migration: Migration) => {
    migration.editContentType('page')

    // get migration

    const page = migration
        .createContentType('page')
        .name('Compose: Page')
        .description('Represents a web page in Compose. DO NOT DELETE')
        .displayField('name')
    page.createField('name')
        .name('Internal name')
        .type('Symbol')
        .localized(false)
        .required(true)
        .validations([])
        .disabled(false)
        .omitted(false)
    page.createField('title')
        .name('Page title')
        .type('Symbol')
        .localized(true)
        .required(true)
        .validations([])
        .disabled(false)
        .omitted(false)

    page.createField('slug')
        .name('Slug')
        .type('Symbol')
        .localized(true)
        .required(true)
        .validations([
            {
                unique: true,
            },
            {
                regexp: {
                    pattern:
                        "^((\\/)|(([\\/\\w\\-\\._~:!$&'\\(\\)*+,;@]|(%\\d+))+))$",
                },
            },
        ])
        .disabled(false)
        .omitted(false)

    page.createField('seo')
        .name('SEO metadata')
        .type('Link')
        .localized(false)
        .required(false)
        .validations([
            {
                linkContentType: ['seo'],
            },
            {
                relationshipType: ['Composition'],
            },
        ])
        .disabled(false)
        .omitted(false)
        .linkType('Entry')

    page.createField('content')
        .name('Content')
        .type('Link')
        .localized(false)
        .required(true)
        .validations([
            {
                linkContentType: [
                    'defaultLayoutContent',
                    'pageBlogPost',
                    'pageGeneral',
                ],
            },
            {
                relationshipType: ['Composition'],
            },
        ])
        .disabled(false)
        .omitted(false)
        .linkType('Entry')

    page.changeFieldControl('name', 'builtin', 'singleLine', {})

    page.changeFieldControl('title', 'builtin', 'singleLine', {
        helpText:
            'This will be displayed at the top of the page when published',
    })

    page.changeFieldControl('slug', 'builtin', 'slugEditor', {
        helpText: 'The last part of the URL for this page',
    })

    page.changeFieldControl('seo', 'builtin', 'entryCardEditor', {})
    page.changeFieldControl('content', 'builtin', 'entryCardEditor', {})
}

export {}
