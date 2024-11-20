import { GetStaticPaths, GetStaticPropsResult } from 'next'
import { getConfigsManager } from '../../next-contentful/mappers/registry/all-configs'
import { PageNotFoundError } from '../../utils'
import { revalidate } from '../../variables'
import type { AllPageProps } from '../../next-contentful/mappers/all-mappers/mapper.interface'
import type { ThoughtDetailProps } from './ThoughtDetail.page'

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
    try {
        const mapper = getConfigsManager().getPageMapper('pageThought', {
            mapperType: 'page',
            nextContext: context,
        })
        const props = await mapper.getPageProps<ThoughtDetailProps>()
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
