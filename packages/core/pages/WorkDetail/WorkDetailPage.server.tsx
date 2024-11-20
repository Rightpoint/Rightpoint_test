import { GetStaticPaths, GetStaticProps, GetStaticPropsResult } from 'next'
import { AllPageProps } from '../../next-contentful/mappers/all-mappers/mapper.interface'
import { getConfigsManager } from '../../next-contentful/mappers/registry/all-configs'
import { PageNotFoundError } from '@rightpoint/core/utils'
import { revalidate } from '@rightpoint/core/variables'
import type { WorkDetailPageProps } from './WorkDetailPage.page'
import { getStaticProps404RedirectHelper } from '../page-utils/get-static-props-404-redirect-helper'

export const getWorkDetailStaticPaths: GetStaticPaths = async () => {
    const { paths } = await getConfigsManager()
        .getPageMapper('pageWorkDetail')
        .fetchPagePaths()
    return {
        paths,
        fallback: 'blocking',
    }
}
export type GetWorkDetailStaticProps = AllPageProps<WorkDetailPageProps>

export const getWorkDetailStaticProps: GetStaticProps = async (
    context
): Promise<GetStaticPropsResult<GetWorkDetailStaticProps>> => {
    const mapper = getConfigsManager().getPageMapper('pageWorkDetail', {
        mapperType: 'page',
        nextContext: context,
    })
    return getStaticProps404RedirectHelper(
        async () => {
            const props = await mapper.getPageProps<WorkDetailPageProps>()
            return {
                props,
                revalidate: revalidate.default,
            }
        },
        {
            /**
             * Redirect missing work pages to the browse page
             */
            redirect: {
                redirectTo: '/work/browse',
                context,
                mapper,
            },
        }
    )
}
