import { Entry } from 'contentful'
import { get } from 'lodash'
import { makeConfig } from '../make-config'

/**
 * A component that is not allowed.
 *
 * Should visually silently fail, but log an error.
 *
 * Use cases:
 * - The CMS has a reference field, and it points to an entry that is not expected.
 * - mappers.getProps(entry.fields.shouldBeMultiMediaButIsNot, { limitToContentTypes: ['multiMedia'] })
 */
export const componentConfigNotAllowed = makeConfig({
    __mapperType: 'component' as const,
    contentTypeId: 'component-config-not-allowed',
    entryToProps: async ({ entry }: { entry: Entry<any> }) => {
        return {
            contentTypeId: get(entry, 'sys.contentType.sys.id'),
        }
    },
    component: (props) => {
        console.log('Component entry not allowed. Likely bad CMS input.', props)
        return (
            <div
                data-not-allowed={`This component entry is unexpected. ${
                    (props as any).contentTypeId
                }`}
            ></div>
        )
    },
})
