import { GetStaticPaths, GetStaticPropsResult } from 'next'
import { AllPageProps } from '../../next-contentful/mappers/all-mappers/mapper.interface'
import { getConfigsManager } from '../../next-contentful/mappers/registry/all-configs'
import { revalidate } from '../../variables'
import { LandingPageCategoryProps } from './LandingPageCategory.page'

export const getLandingPageCategoryStaticPaths: GetStaticPaths = async () => {
    const { paths } = await getConfigsManager()
        .getPageMapper('landingPageCategory')
        .fetchPagePaths()
    return {
        paths,
        fallback: true,
    }
}

export type GetLandingPageCategoryStaticProps =
    AllPageProps<LandingPageCategoryProps>

export const getLandingPageCategoryStaticProps = async (
    context
): Promise<GetStaticPropsResult<GetLandingPageCategoryStaticProps>> => {
    const mapper = getConfigsManager().getPageMapper('landingPageCategory', {
        mapperType: 'page',
        nextContext: context,
    })
    const props = await mapper.getPageProps<LandingPageCategoryProps>()
    return {
        props,
        revalidate: revalidate.default,
    }
}
