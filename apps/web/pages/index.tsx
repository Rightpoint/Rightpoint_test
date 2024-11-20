import {
    getStandardPageStaticProps,
    StandardPage,
} from '@rightpoint/core/pages'

/**
 * The homepage uses a lightly modified standard page template
 * that adds the navbar below the first component, if that component
 * is a ScrollZoom intro.
 */
export const getStaticProps = async (context) => {
    context.params = {
        slug: '/',
    }
    return await getStandardPageStaticProps(context)
}

export default StandardPage
