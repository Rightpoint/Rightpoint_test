import { GetStaticPaths, GetStaticPropsResult } from 'next'
import { getConfigsManager } from '@rightpoint/core/next-contentful/mappers/registry/all-configs'
import { revalidate } from '@rightpoint/core/variables'
import { PageNotFoundError } from '@rightpoint/core/utils'
import type { AllPageProps } from '../../next-contentful/mappers/all-mappers/mapper.interface'
import type { StandardPageProps } from './StandardPage.page'

export const getStandardPageStaticPaths: GetStaticPaths = async () => {
    const { paths } = await getConfigsManager()
        .getPageMapper('standardPage')
        .fetchPagePaths()
    return {
        paths,
        fallback: 'blocking',
    }
}

export type GetStandardPageStaticProps = AllPageProps<StandardPageProps> & {
    placeNavbarBelowFirstComponent?: boolean
}

export const getStandardPageStaticProps = async (
    context
): Promise<GetStaticPropsResult<GetStandardPageStaticProps>> => {
    const mapper = getConfigsManager().getPageMapper('standardPage', {
        mapperType: 'page',
        nextContext: context,
    })
    try {
        const props = await mapper.getPageProps<StandardPageProps>()

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
        } else {
            console.log('standard page error', context, ex)
            throw ex
        }
    }
}
