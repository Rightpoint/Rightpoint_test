import { GetStaticPaths, GetStaticPropsResult } from 'next'
import { getConfigsManager } from '../../next-contentful/mappers/registry/all-configs'
import { revalidate } from '../../variables'
import type { AllPageProps } from '../../next-contentful/mappers/all-mappers/mapper.interface'
import type { LandingPageProps } from './LandingPage.page'
import { PageNotFoundError } from '../../utils'

export const getLandingPageStaticPaths: GetStaticPaths = async () => {
    const { paths } = await getConfigsManager()
        .getPageMapper('pageLandingPage')
        .fetchPagePaths()
    return {
        paths,
        fallback: true,
    }
}

export type GetLandingPageProps = AllPageProps<LandingPageProps>

export const getLandingPageStaticProps = async (
    context
): Promise<GetStaticPropsResult<GetLandingPageProps>> => {
    try {
        const mapper = getConfigsManager().getPageMapper('pageLandingPage', {
            mapperType: 'page',
            nextContext: context,
        })
        const props = await mapper.getPageProps<LandingPageProps>()
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
        }
    }
}

export type GetLandingPageStaticProps = AllPageProps<LandingPageProps>
