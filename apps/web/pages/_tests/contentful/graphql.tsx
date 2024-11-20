import { fetchGraphQL } from '@rightpoint/contentful'
import { typography } from '@rightpoint/core/styles'
import { TestPage } from '@rightpoint/core/pages'
import { NextPage } from 'next'

interface PageData {
    data: JSON
}

const Page: NextPage<PageData> = ({ data }) => {
    return (
        <TestPage title="GraphQL Test" subtitle="Test basic GraphQL query">
            <typography.H3 as="h1">GraphQL</typography.H3>
            <pre>{JSON.stringify(data)}</pre>
        </TestPage>
    )
}

const query = `
    query Index {
        pageCollection(limit: 1, where: {slug: "/"}) {
            items {
                title
                name
                slug
            }
        }
    }`

export const getStaticProps = async () => {
    const response = await fetchGraphQL({
        query,
    })
    return {
        props: {
            data: response,
        },
    }
}

export default Page
