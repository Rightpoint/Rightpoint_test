import { GetStaticPaths, GetStaticPropsResult } from 'next'
import { getConfigsManager } from '@rightpoint/core/next-contentful/mappers/registry/all-configs'
import { revalidate } from '@rightpoint/core/variables'
import type {
    AllPageProps,
    ComponentPropsWithMeta,
} from '../../next-contentful/mappers/all-mappers/mapper.interface'
import type { SolutionPageProps } from './Solution.page'
import { PageNotFoundError } from '@rightpoint/core/utils'
import { getStaticProps404RedirectHelper } from '../page-utils/get-static-props-404-redirect-helper'

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

    return getStaticProps404RedirectHelper(
        async () => {
            const props = await mapper.getPageProps<SolutionPageProps>()
            return {
                props: {
                    ...props,
                },
                revalidate: revalidate.default,
            }
        },
        {
            redirect: {
                redirectTo: '/solutions',
                context,
                mapper,
            },
        }
    )
}
