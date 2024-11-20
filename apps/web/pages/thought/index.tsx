import {
    ThoughtCategory,
    getThoughtCategoryStaticPaths,
    getThoughtCategoryStaticProps,
} from '@rightpoint/core/pages'

export const getStaticProps = (context) => {
    return getThoughtCategoryStaticProps({
        ...context,
        params: {
            slug: '/',
        },
    })
}

export default ThoughtCategory
