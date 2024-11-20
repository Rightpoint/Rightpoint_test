import { GetStaticPaths, GetStaticPropsResult } from 'next'
import { getConfigsManager } from '@rightpoint/core/next-contentful/mappers/registry/all-configs'
import { revalidate } from '../../variables'
import type {
    AllPageProps,
    ComponentPropsWithMeta,
} from '../../next-contentful/mappers/all-mappers/mapper.interface'
import type { IndustryPageProps } from './Industry.page'
import { PageNotFoundError } from '../../utils'

export const getIndustryPageStaticPaths: GetStaticPaths = async () => {
    const { paths } = await getConfigsManager()
        .getPageMapper('pageIndustry')
        .fetchPagePaths()
    return {
        paths,
        fallback: 'blocking',
    }
}

export type GetIndustryPageStaticProps = AllPageProps<IndustryPageProps>

export const getIndustryPageStaticProps = async (
    context
): Promise<GetStaticPropsResult<GetIndustryPageStaticProps>> => {
    const mapper = getConfigsManager().getPageMapper('pageIndustry', {
        mapperType: 'page',
        nextContext: context,
    })
    try {
        const props = await mapper.getPageProps<IndustryPageProps>()
        return {
            props: {
                ...props,
            },
            revalidate: revalidate.default,
        }
    } catch (ex) {
        if (ex instanceof PageNotFoundError) {
            return {
                notFound: true,
                revalidate: revalidate.notFound,
            }
        }
        throw ex
    }
}
