import { GetStaticPaths, GetStaticPropsResult } from 'next'
import { getConfigsManager } from '../../next-contentful/mappers/registry/all-configs'
import { revalidate } from '@rightpoint/core/variables'
import type { AllPageProps } from '../../next-contentful/mappers/all-mappers/mapper.interface'
import type { LandingPageProps } from './LandingPage.page'
import { PageNotFoundError } from '@rightpoint/core/utils'
import { getStaticProps404RedirectHelper } from '../page-utils/get-static-props-404-redirect-helper'

export const getLandingPageStaticPaths: GetStaticPaths = async () => {
    const { paths } = await getConfigsManager()
        .getPageMapper('pageLandingPage')
        .fetchPagePaths()
    return {
        paths,
        fallback: 'blocking',
    }
}

export type GetLandingPageProps = AllPageProps<LandingPageProps>

export const getLandingPageStaticProps = async (
    context
): Promise<GetStaticPropsResult<GetLandingPageProps>> => {
    const mapper = getConfigsManager().getPageMapper('pageLandingPage', {
        mapperType: 'page',
        nextContext: context,
    })

    return getStaticProps404RedirectHelper(
        async () => {
            const props = await mapper.getPageProps<LandingPageProps>()
            return {
                props,
                revalidate: revalidate.default,
            }
        },
        {
            show404: true,
            // redirect: {
            //     context,
            //     mapper,
            //     redirectTo: '/',
            //     // for news, events, we need to route to /news/events
            //     // for landing-pages, we need to route to /
            // },
        }
    )
}

export type GetLandingPageStaticProps = AllPageProps<LandingPageProps>
