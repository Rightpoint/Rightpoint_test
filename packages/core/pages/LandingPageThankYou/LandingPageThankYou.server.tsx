import { get } from 'lodash'
import { GetStaticPaths, GetStaticPropsResult } from 'next'
import { getConfigsManager } from '@rightpoint/core/next-contentful/mappers/registry/all-configs'
import type { AllPageProps } from '../../next-contentful/mappers/all-mappers/mapper.interface'
import type { LandingPageProps } from '../LandingPage/LandingPage.page'
import type { LandingPageThankYouProps } from './LandingPageThankYou.page'
import type { PardotEntry } from '@rightpoint/core/components'
import { revalidate } from '../../variables'
import { PageNotFoundError } from '../../utils'
import { landingPageThankYouMapperConfig } from './LandingPageThankYou.contentful'

export const getLandingPageThankYouStaticPaths: GetStaticPaths = async () => {
    // let's not statically generate these for now.
    const paths = []
    return {
        paths,
        fallback: true,
    }
}

export interface GetLandingPageThankYouStaticProps
    extends AllPageProps<LandingPageThankYouProps> {}

export const getLandingPageThankYouStaticProps = async (
    context
): Promise<GetStaticPropsResult<GetLandingPageThankYouStaticProps>> => {
    /**
     * Get landing page via params.slug which is in the request URL
     */
    try {
        const mapper = getConfigsManager().getPageMapper('pageLandingPage', {
            mapperType: 'page',
            nextContext: context,
            customMapperConfig: landingPageThankYouMapperConfig,
        })
        const props = await mapper.getPageProps<LandingPageThankYouProps>()
        return {
            props,
            revalidate: revalidate.default,
        }
    } catch (ex) {
        if (ex instanceof PageNotFoundError) {
            return {
                notFound: true,
                revalidate: revalidate.notFound,
            }
        } else {
            /**
             * TODO: Persistently log this error, as it is critical to lead generation
             */
            console.log('landing page thank you error', context, ex)
        }
    }
}
