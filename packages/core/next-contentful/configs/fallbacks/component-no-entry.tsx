import { Entry } from 'contentful'
import { get } from 'lodash'
import { makeConfig } from '../make-config'

export const componentConfigNoEntry = makeConfig({
    __mapperType: 'component',
    contentTypeId: 'no-entry-provided',
    entryToProps: async ({ entry }: { entry: Entry<any> }) => {
        return null
    },
    component: (props) => (
        <>
            <div>No Entry Provided. This component should never render.</div>
        </>
    ),
})
