import { Entry } from 'contentful'
import { get } from 'lodash'

import { makeConfig } from '../make-config'

export const pageConfigNotFound = makeConfig<
    any,
    // this narrows type to page config
    {
        seoProps: any
    }
>({
    __mapperType: 'page',
    contentTypeId: 'PAGE-CONFIG-NOT-FOUND',
    slugContextName: '',
    slugFieldName: '',
    seoFieldName: '',
    urlBasePath: '/',
    entryToUrl: async () => '/#PAGE-CONFIG-NOT-FOUND',
    entryToProps: async ({ entry }: { entry: Entry<any> }) => ({
        entryId: get(entry, 'sys.id'),
        contentTypeId: get(entry, 'sys.contentType.sys.id'),
        seoProps: {},
    }),
    component: (props) => (
        <>
            <div>
                No component found for page content type: [
                {JSON.stringify(props)}]
            </div>
        </>
    ),
})
