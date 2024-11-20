import { GetStaticPaths, GetStaticPropsResult } from 'next'
import { getConfigsManager } from '@rightpoint/core/next-contentful/mappers/registry/all-configs'
import { revalidate } from '../../variables'
import type {
    AllPageProps,
    ComponentPropsWithMeta,
} from '../../next-contentful/mappers/all-mappers/mapper.interface'
import type { StandardPageProps } from './StandardPage.page'

export const getStandardPageStaticPaths: GetStaticPaths = async () => {
    const { paths } = await getConfigsManager()
        .getPageMapper('standardPage')
        .fetchPagePaths()
    return {
        paths,
        fallback: true,
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
        console.log('standard page error', context, ex)
        return {
            notFound: true,
        }
    }
}

export const checkIfFirstComponentIsIntroGallery = (
    components: ComponentPropsWithMeta[]
) => {
    if (!(components?.length > 0)) {
        return
    }

    const firstComponent = components[0]

    /**
     * If first component is the scroll zoom component, add the navbar below
     */
    const isScrollZoomIntro =
        firstComponent.mapperProps.__contentTypeId === 'dynamicComponent' &&
        firstComponent.componentProps.type === 'ScrollZoom'
    return isScrollZoomIntro
}
