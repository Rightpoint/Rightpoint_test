/**
 * Unused at the moment, but if we ever need a pardot form specific thank you page,
 * we can build it out here and resume the work.
 */
import dynamic from 'next/dynamic'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import type { PardotThankYouProps } from './PardotThankYou.page'
import { Document } from '@contentful/rich-text-types'
import {
    contentfulRichTextDocumentToJsonSafe,
    contentfulRichTextToReact,
    PardotEntry,
} from '@rightpoint/core/components'
import { PageNotFoundError } from '../../utils'

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
        // this query will fail if
        // the URL is the first landing page that points to this form
        try {
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
        } catch (ex) {
            if (ex instanceof PageNotFoundError) {
                return '#no-associated-landing-page-found'
            }
            // TODO: perhaps a fallback to a landing-page-less thank you page?
            return '#no-associated-landing-page-found'
        }
    },
    entryToProps: async ({ entry, manager }) => {
        const {} = entry.fields
        return {} as any
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
