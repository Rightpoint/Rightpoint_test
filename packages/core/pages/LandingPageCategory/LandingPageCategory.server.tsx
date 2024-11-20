import { GetStaticPaths, GetStaticPropsResult } from 'next'
import { getConfigsManager } from '../../next-contentful/mappers/registry/all-configs'
import { revalidate } from '@rightpoint/core/variables'
import type { AllPageProps } from '../../next-contentful/mappers/all-mappers/mapper.interface'
import type { LandingPageCategoryProps } from './LandingPageCategory.page'
import { PageNotFoundError } from '../../utils'

export const getLandingPageCategoryStaticPaths: GetStaticPaths = async () => {
    const { paths } = await getConfigsManager()
        .getPageMapper('landingPageCategory')
        .fetchPagePaths()
    return {
        paths,
        fallback: 'blocking',
    }
}

export type GetLandingPageCategoryStaticProps =
    AllPageProps<LandingPageCategoryProps>

export const getLandingPageCategoryStaticProps = async (
    context
): Promise<GetStaticPropsResult<GetLandingPageCategoryStaticProps>> => {
    try {
        const mapper = getConfigsManager().getPageMapper(
            'landingPageCategory',
            {
                mapperType: 'page',
                nextContext: context,
            }
        )
        const props = await mapper.getPageProps<LandingPageCategoryProps>()
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
