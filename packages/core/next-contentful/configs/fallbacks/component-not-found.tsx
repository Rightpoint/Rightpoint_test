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
    component: (props) => (
        <>
            <div>
                No component found for content type: [{JSON.stringify(props)}]
            </div>
        </>
    ),
})
