import { GetStaticPaths, GetStaticPropsResult } from 'next'
import { AllPageProps } from '../../next-contentful/mappers/all-mappers/mapper.interface'
import { getConfigsManager } from '../../next-contentful/mappers/registry/all-configs'
import { PageNotFoundError } from '@rightpoint/core/utils'
import { revalidate } from '@rightpoint/core/variables'
import { WorkCategoryProps } from './WorkCategory.page'

export const getWorkCategoryStaticPaths: GetStaticPaths = async () => {
    const { paths } = await getConfigsManager()
        .getPageMapper('pageWorkCategory')
        .fetchPagePaths()
    return {
        paths,
        fallback: 'blocking',
    }
}

export type GetWorkCategoryStaticProps = AllPageProps<WorkCategoryProps>

export const getWorkCategoryStaticProps = async (
    context
): Promise<GetStaticPropsResult<GetWorkCategoryStaticProps>> => {
    try {
        const mapper = getConfigsManager().getPageMapper('pageWorkCategory', {
            mapperType: 'page',
            nextContext: context,
        })
        const props = await mapper.getPageProps<WorkCategoryProps>()
        return {
            props,
            revalidate: revalidate.default,
        }
    } catch (ex) {
        if (ex instanceof PageNotFoundError) {
            console.error(ex)
            return {
                notFound: true,
                revalidate: revalidate.notFound,
            }
        }
    }
}
