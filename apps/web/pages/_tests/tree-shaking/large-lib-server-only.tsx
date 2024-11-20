import { GetStaticPaths, GetStaticProps } from 'next'
import { fakerWithSeed } from '@rightpoint/data-generators'
import { TestPage } from '@rightpoint/core/pages'

const Page = ({ data }) => {
    return (
        <TestPage
            title="Perf Tests"
            subtitle="This large lib should only appear on server, and not the client.
        "
        >
            {data}
        </TestPage>
    )
}

export const getStaticProps = () => {
    /**
     * Since the import is used inside getStaticProps, it should not be bundled
     */
    return {
        props: {
            data: fakerWithSeed.lorem.paragraphs(5),
        },
    }
}

export default Page
