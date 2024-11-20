import { GetStaticPaths, GetStaticPropsResult } from 'next'
import { AllPageProps } from '../../next-contentful/mappers/all-mappers/mapper.interface'
import { getConfigsManager } from '../../next-contentful/mappers/registry/all-configs'
import { PageNotFoundError } from '@rightpoint/core/utils'
import { revalidate } from '@rightpoint/core/variables'
import { ThoughtCategoryProps } from './ThoughtCategory.page'
import { getStaticProps404RedirectHelper } from '../page-utils/get-static-props-404-redirect-helper'

export const getThoughtCategoryStaticPaths: GetStaticPaths = async () => {
    const { paths } = await getConfigsManager()
        .getPageMapper('thoughtCategory')
        .fetchPagePaths()
    return {
        paths: paths.filter((path) => path.params.slug !== '/'), // filter out the root page, which is rendered automatically
        fallback: 'blocking',
    }
}

export type GetThoughtCategoryStaticProps = AllPageProps<ThoughtCategoryProps>

export const getThoughtCategoryStaticProps = async (
    context
): Promise<GetStaticPropsResult<GetThoughtCategoryStaticProps>> => {
    const mapper = getConfigsManager().getPageMapper('thoughtCategory', {
        mapperType: 'page',
        nextContext: context,
    })
    return getStaticProps404RedirectHelper(
        async () => {
            const props = await mapper.getPageProps<ThoughtCategoryProps>()
            return {
                props,
                revalidate: revalidate.default,
            }
        },
        {
            redirect: {
                redirectTo: '/thought/',
                context,
                mapper,
            },
        }
    )
}
