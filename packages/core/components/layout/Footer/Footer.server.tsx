import { GetStaticPaths, GetStaticPropsResult } from 'next'
import { getConfigsManager } from '@rightpoint/core/next-contentful/mappers/registry/all-configs'
import { revalidate } from '@rightpoint/core/variables'
import { PageNotFoundError } from '@rightpoint/core/utils'
import { getStaticProps404RedirectHelper } from '../../../pages/page-utils/get-static-props-404-redirect-helper'
import { AllPageProps } from '../../../next-contentful/mappers/all-mappers/mapper.interface'
import { FooterProps } from './Footer.component'

export const getNavbarStaticPaths: GetStaticPaths = async () => {
    const { paths } = await getConfigsManager()
        .getPageMapper('componentNavbarWrapper')
        .fetchPagePaths()
    return {
        paths,
        fallback: 'blocking',
    }
}

export type GetNavbarPageStaticProps = AllPageProps<FooterProps>

export const getNavbarPageStaticProps = async (
    context
): Promise<GetStaticPropsResult<GetNavbarPageStaticProps>> => {
    const mapper = getConfigsManager().getPageMapper('componentNavbarWrapper', {
        mapperType: 'component',
        nextContext: context,
    })
    console.log('Mapped props:', mapper)

    return getStaticProps404RedirectHelper(async () => {
        const props = await mapper.getPageProps<FooterProps>()
        console.log('Mapped props:', props)
        return {
            props: {
                ...props,
            },
            revalidate: revalidate.default,
        }
    })
}
