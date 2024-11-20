import { Entry } from 'contentful-management'
import { getClientEnvironment } from '../utils/get-client-environment'

/**
 * Given work categories, try to find a matching industry or solution page
 */
export const importWorkCategories = async ({ scraper }) => {
    const environment = await getClientEnvironment()
    if (!environment) {
        return
    }
    console.log('')
    console.log('BEGIN CATEGORY IMPORT')
    console.log('')
    /**
     * Figure out industries
     */
    const categories = scraper.categories
        .split('/')
        .map((category) => category?.trim())
        .filter(Boolean)
    // search work category by title match

    const response: {
        industryEntry?: Entry
        workCategoryEntry?: Entry
    } = {}
    for (let i = 0; i < categories.length; i++) {
        const category = categories[i]

        // use first one that matches
        if (!response.workCategoryEntry) {
            console.log('SEARCH: Work Category: ', category)

            const entries = await environment.getEntries({
                content_type: 'pageWorkCategory',
                'fields.title[match]': category.trim(),
            })
            if (entries?.items?.[0]) {
                response.workCategoryEntry = entries.items[0]
                console.log(
                    'FOUND: a work category entry from category: ',
                    category
                )
            }
            console.log('END: Work Category Search ')
            console.log(' ')
        }
        if (!response.industryEntry) {
            console.log('BEGIN: Related Industry Search')
            console.log('SEARCH: standard pages for', category)
            // search
            const entries = await environment.getEntries({
                content_type: 'standardPage',
                'fields.pageTitle[match]': category,
            })
            if (entries?.items?.[0]) {
                const entry = entries.items[0] as Entry
                const pageTitleLower =
                    entry.fields.pageTitle['en-US'].toLowerCase() ?? ''
                console.log('FOUND: a standard page containing:', category)
                console.log('TITLE: ', pageTitleLower)
                if (pageTitleLower?.indexOf('industries') > -1) {
                    console.log(
                        'FOUND: likely an industry page:',
                        pageTitleLower
                    )
                    response.industryEntry = entry
                }
            }
        }
    }

    console.log('')
    console.log('END CATEGORY IMPORT')
    console.log('')

    return response
}
