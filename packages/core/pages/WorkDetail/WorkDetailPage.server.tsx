import { GetStaticPaths, GetStaticProps, GetStaticPropsResult } from 'next'
import { AllPageProps } from '../../next-contentful/mappers/all-mappers/mapper.interface'
import { getConfigsManager } from '../../next-contentful/mappers/registry/all-configs'
import { revalidate } from '../../variables'
import { WorkDetailPageProps } from './WorkDetailPage.page'

export const getWorkDetailStaticPaths: GetStaticPaths = async () => {
    const { paths } = await getConfigsManager()
        .getPageMapper('pageWorkDetail')
        .fetchPagePaths()
    return {
        paths,
        fallback: true,
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
    const props = await mapper.getPageProps<WorkDetailPageProps>()
    return {
        props,
        revalidate: revalidate.default,
    }
}
