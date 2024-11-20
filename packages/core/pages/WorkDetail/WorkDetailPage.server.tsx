import { GetStaticPaths, GetStaticProps, GetStaticPropsResult } from 'next'
import { AllPageProps } from '../../next-contentful/mappers/all-mappers/mapper.interface'
import { getConfigsManager } from '../../next-contentful/mappers/registry/all-configs'
import { PageNotFoundError } from '../../utils'
import { revalidate } from '../../variables'
import type { WorkDetailPageProps } from './WorkDetailPage.page'

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
    try {
        const mapper = getConfigsManager().getPageMapper('pageWorkDetail', {
            mapperType: 'page',
            nextContext: context,
        })
        const props = await mapper.getPageProps<WorkDetailPageProps>()
        return {
            props,
            revalidate: revalidate.default,
        }
    } catch (ex) {
        if (ex instanceof PageNotFoundError) {
            return {
                notFound: true,
                revalidate: revalidate.notFound,
                // redirect: {
                //     destination: `/work?404=${context.params.slug}`,
                //     permanent: false,
                // },
            }
        }
        throw ex
    }
}
