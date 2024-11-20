import { GetStaticPaths, GetStaticPropsResult } from 'next'
import { getConfigsManager } from '@rightpoint/core/next-contentful/mappers/registry/all-configs'
import { revalidate } from '../../variables'
import type {
    AllPageProps,
    ComponentPropsWithMeta,
} from '../../next-contentful/mappers/all-mappers/mapper.interface'
import type { SolutionPageProps } from './Solution.page'
import { PageNotFoundError } from '../../utils'

export const getSolutionPageStaticPaths: GetStaticPaths = async () => {
    const { paths } = await getConfigsManager()
        .getPageMapper('pageSolution')
        .fetchPagePaths()
    return {
        paths,
        fallback: 'blocking',
    }
}

export type GetSolutionPageStaticProps = AllPageProps<SolutionPageProps>

export const getSolutionPageStaticProps = async (
    context
): Promise<GetStaticPropsResult<GetSolutionPageStaticProps>> => {
    const mapper = getConfigsManager().getPageMapper('pageSolution', {
        mapperType: 'page',
        nextContext: context,
    })
    try {
        const props = await mapper.getPageProps<SolutionPageProps>()
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
