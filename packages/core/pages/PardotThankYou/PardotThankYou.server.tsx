import { get } from 'lodash'
import { GetStaticPaths, GetStaticPropsResult } from 'next'
import { getConfigsManager } from '@rightpoint/core/next-contentful/mappers/registry/all-configs'
import type { AllPageProps } from '../../next-contentful/mappers/all-mappers/mapper.interface'
import type { LandingPageProps } from '../LandingPage/LandingPage.page'
import type { PardotThankYouProps } from './PardotThankYou.page'
import type { PardotEntry } from '@rightpoint/core/components'

export const getPardotThankYouStaticPaths: GetStaticPaths = async () => {
    // let's not statically generate these for now.
    const paths = []
    return {
        paths,
        fallback: true,
    }
}

const isPardotFormEntry = (entry: unknown): entry is PardotEntry => {
    const contentTypeId = get(entry, 'sys.contentType.sys.id')
    if (contentTypeId === 'pardotForm') {
        return true
    }
    return false
}

export interface GetPardotThankYouStaticProps
    extends AllPageProps<PardotThankYouProps> {
    landingPageProps: AllPageProps<Partial<LandingPageProps>>
}

export const getPardotThankYouStaticProps = async (
    context
): Promise<GetStaticPropsResult<GetPardotThankYouStaticProps>> => {
    /**
     * get landing page via params.slug which is in the request URL
     */
    const landingPageMapper = getConfigsManager().getPageMapper(
        'pageLandingPage',
        {
            nextContext: context,
        }
    )
    const landingPageProps = await landingPageMapper.getPageProps()

    /**
     * get pardot form via the landing page pardot form reference, if provided
     */
    console.log('PM', landingPageProps, landingPageMapper.entry)
    const pardotFormReference = landingPageMapper.entry.fields
        .pardotForm as unknown

    if (isPardotFormEntry(pardotFormReference)) {
        const pardotFormEntryId = pardotFormReference.sys.id
        // get the entry for the pardot form and set it manually
        const pardotMapper = getConfigsManager().getPageMapper('pardotForm', {
            nextContext: context,
        })
        const pardotFormEntry = await pardotMapper.fetchPageEntry({
            getQuery: async ({ config, nextContext }) => {
                console.log('get query')
                return {
                    content_type: config.contentTypeId,
                    'sys.id': pardotFormEntryId,
                    include: 5,
                }
            },
        })
        pardotMapper.setEntry(pardotFormEntry)
        const pardotProps =
            await pardotMapper.getPageProps<PardotThankYouProps>()
        return {
            props: {
                ...pardotProps,
                landingPageProps,
            },
        }
    }
    return {
        notFound: true,
    }
}
