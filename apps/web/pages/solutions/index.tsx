import {
    getSolutionPageStaticProps,
    SolutionPage,
} from '@rightpoint/core/pages'

/**
 */
export const getStaticProps = async (context) => {
    context.params = {
        slug: '/',
    }
    return await getSolutionPageStaticProps(context)
}

export default SolutionPage
