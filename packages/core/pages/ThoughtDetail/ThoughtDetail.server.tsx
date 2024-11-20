import { GetStaticPaths, GetStaticPropsResult } from 'next'
import { getConfigsManager } from '../../next-contentful/mappers/registry/all-configs'
import { PageNotFoundError } from '@rightpoint/core/utils'
import { revalidate } from '@rightpoint/core/variables'
import type { AllPageProps } from '../../next-contentful/mappers/all-mappers/mapper.interface'
import type { ThoughtDetailProps } from './ThoughtDetail.page'
import { getStaticProps404RedirectHelper } from '../page-utils/get-static-props-404-redirect-helper'

export const getThoughtDetailStaticPaths: GetStaticPaths = async () => {
    const { paths } = await getConfigsManager()
        .getPageMapper('pageThought')
        .fetchPagePaths()
    return {
        paths,
        fallback: 'blocking',
    }
}

export type GetThoughtDetailStaticProps = AllPageProps<ThoughtDetailProps>

export const getThoughtDetailStaticProps = async (
    context
): Promise<GetStaticPropsResult<GetThoughtDetailStaticProps>> => {
    const mapper = getConfigsManager().getPageMapper('pageThought', {
        mapperType: 'page',
        nextContext: context,
    })
    return getStaticProps404RedirectHelper(
        async () => {
            const props = await mapper.getPageProps<ThoughtDetailProps>()
            return {
                props,
                revalidate: revalidate.default,
            }
        },
        {
            redirect: {
                context,
                mapper,
                redirectTo: '/thought/',
            },
        }
    )
}
