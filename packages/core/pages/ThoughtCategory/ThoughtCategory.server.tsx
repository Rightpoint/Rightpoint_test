import { GetStaticPaths, GetStaticPropsResult } from 'next'
import { AllPageProps } from '../../next-contentful/mappers/all-mappers/mapper.interface'
import { getConfigsManager } from '../../next-contentful/mappers/registry/all-configs'
import { revalidate } from '../../variables'
import { ThoughtCategoryProps } from './ThoughtCategory.page'

export const getThoughtCategoryStaticPaths: GetStaticPaths = async () => {
    const { paths } = await getConfigsManager()
        .getPageMapper('thoughtCategory')
        .fetchPagePaths()
    return {
        paths: paths.filter((path) => path.params.slug !== '/'), // filter out the root page, which is rendered automatically
        fallback: true,
    }
}

export type GetThoughtCategoryStaticProps = AllPageProps<ThoughtCategoryProps>

export const getThoughtCategoryStaticProps = async (
    context
): Promise<GetStaticPropsResult<GetThoughtCategoryStaticProps>> => {
    try {
        const mapper = getConfigsManager().getPageMapper('thoughtCategory', {
            mapperType: 'page',
            nextContext: context,
        })
        const props = await mapper.getPageProps<ThoughtCategoryProps>()
        return {
            props,
            revalidate: revalidate.default,
        }
    } catch (ex) {
        console.error('Error generating thought category page', context, ex)
        return {
            notFound: true,
        }
    }
}
