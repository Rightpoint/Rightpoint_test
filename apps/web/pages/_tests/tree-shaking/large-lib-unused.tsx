import { GetStaticPaths, GetStaticProps } from 'next'
import { fakerWithSeed } from '@rightpoint/data-generators'
import { TestPage } from '@rightpoint/core/pages'

const Page = (props) => {
    return (
        <TestPage
            title="Perf Tests"
            subtitle="Unused imports should not cause large page sizes
        "
        ></TestPage>
    )
}

export default Page
