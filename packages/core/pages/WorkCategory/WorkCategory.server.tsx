import { GetStaticPaths, GetStaticPropsResult } from 'next'
import { AllPageProps } from '../../next-contentful/mappers/all-mappers/mapper.interface'
import { getConfigsManager } from '../../next-contentful/mappers/registry/all-configs'
import { PageNotFoundError } from '@rightpoint/core/utils'
import { revalidate } from '@rightpoint/core/variables'
import { WorkCategoryProps } from './WorkCategory.page'
import { getStaticProps404RedirectHelper } from '../page-utils/get-static-props-404-redirect-helper'

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
    const mapper = getConfigsManager().getPageMapper('pageWorkCategory', {
        mapperType: 'page',
        nextContext: context,
    })
    return getStaticProps404RedirectHelper(
        async () => {
            const props = await mapper.getPageProps<WorkCategoryProps>()
            return {
                props,
                revalidate: revalidate.default,
            }
        },
        {
            redirect: {
                redirectTo: '/work/browse',
                context,
                mapper,
            },
        }
    )
}
