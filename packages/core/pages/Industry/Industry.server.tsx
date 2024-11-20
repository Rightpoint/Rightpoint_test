import { GetStaticPaths, GetStaticPropsResult } from 'next'
import { getConfigsManager } from '@rightpoint/core/next-contentful/mappers/registry/all-configs'
import { revalidate } from '@rightpoint/core/variables'
import type {
    AllPageProps,
    ComponentPropsWithMeta,
} from '../../next-contentful/mappers/all-mappers/mapper.interface'
import type { IndustryPageProps } from './Industry.page'
import { PageNotFoundError } from '@rightpoint/core/utils'
import { getStaticProps404RedirectHelper } from '../page-utils/get-static-props-404-redirect-helper'

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
    return getStaticProps404RedirectHelper(async () => {
        const props = await mapper.getPageProps<IndustryPageProps>()
        return {
            props: {
                ...props,
            },
            revalidate: revalidate.default,
        }
    })
}
