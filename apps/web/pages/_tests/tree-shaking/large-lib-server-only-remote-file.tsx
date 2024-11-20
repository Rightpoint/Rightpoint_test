import { GetStaticPaths, GetStaticProps } from 'next'
import { fakerWithSeed } from '@rightpoint/data-generators'
import { getStaticProps as getStaticProps_ } from './large-lib-server-only'
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

export const getStaticProps = getStaticProps_

export default Page
