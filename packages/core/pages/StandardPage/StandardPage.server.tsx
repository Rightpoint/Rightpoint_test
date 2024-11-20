import { GetStaticPaths, GetStaticPropsResult } from 'next'
import { getConfigsManager } from '@rightpoint/core/next-contentful/mappers/registry/all-configs'
import { revalidate } from '@rightpoint/core/variables'
import { PageNotFoundError } from '@rightpoint/core/utils'
import type { AllPageProps } from '../../next-contentful/mappers/all-mappers/mapper.interface'
import type { StandardPageProps } from './StandardPage.page'
import { getStaticProps404RedirectHelper } from '../page-utils/get-static-props-404-redirect-helper'

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
    return getStaticProps404RedirectHelper(
        async () => {
            const props = await mapper.getPageProps<StandardPageProps>()
            return {
                props: {
                    ...props,
                },
                revalidate: revalidate.default,
            }
        },
        {
            show404: true,
        }
    )
}
