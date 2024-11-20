import dynamic from 'next/dynamic'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import type { PardotThankYouProps } from './PardotThankYou.page'
import { Document } from '@contentful/rich-text-types'
import {
    contentfulRichTextDocumentToJsonSafe,
    contentfulRichTextToReact,
    PardotEntry,
} from '@rightpoint/core/components'

export const PardotThankYouDynamic = dynamic(() =>
    import('./PardotThankYou.page').then((mod) => mod.PardotThankYou)
)

export const pardotThankYouMapperConfig = makeConfig<
    PardotEntry,
    PardotThankYouProps & {
        successPageDocument?: Document
    }
>({
    __mapperType: 'page',
    contentTypeId: 'pardotForm',
    seoFieldName: 'seo',
    slugFieldName: 'n-a',
    slugContextName: 'pardot-id',
    urlBasePath: '/not-used/',
    component: PardotThankYouDynamic,
    entryToUrl: async ({ entry, manager }) => {
        // the URL is the first landing page that points to this form
        const getQuery = ({ config }) => {
            return {
                content_type: config.contentTypeId,
                'fields.pardotForm.sys.id': entry.sys.id,
            }
        }
        const landingPageEntry = await manager
            .getPageMapper('pageLandingPage')
            .fetchPageEntry({ getQuery })
        const url = await manager.getUrl(landingPageEntry)
        return `${url}/thank-you`
    },
    entryToProps: async ({ entry, manager }) => {
        const { successPageText, successComponents, files } = entry.fields
        return {
            successPageDocument: await contentfulRichTextDocumentToJsonSafe(
                successPageText,
                manager
            ),
            successComponents: await manager.getAllComponentsProps(
                successComponents
            ),
            files,
        }
    },
    prepareJsonUnsafeProps: ({ props, manager }) => {
        return {
            ...props,
            successPageText: contentfulRichTextToReact(
                props.successPageDocument,
                manager
            ),
        }
    },
    entryToSeoProps: async ({ entry, manager }) => {
        const {} = entry.fields
        return {
            title: `Thank you!`,
        }
    },
})
