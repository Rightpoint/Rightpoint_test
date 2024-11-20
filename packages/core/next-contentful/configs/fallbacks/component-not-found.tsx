import { Entry } from 'contentful'
import { get } from 'lodash'
import { makeConfig } from '../make-config'

export const componentConfigNotFound = makeConfig({
    __mapperType: 'component',
    contentTypeId: 'no-component-config-found',
    entryToProps: async ({ entry }: { entry: Entry<any> }) => {
        return {
            contentTypeId: get(entry, 'sys.contentType.sys.id'),
        }
    },
    component: (props: any) => {
        if (props?.contentTypeId === null) {
            return (
                <div>
                    Entry has no content type. Likely a deleted or missing
                    entry.
                </div>
            )
        }
        return (
            <div>
                No component found for content type: [{JSON.stringify(props)}]
            </div>
        )
    },
})
