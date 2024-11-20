import { GetStaticPaths, GetStaticProps } from 'next'
import { fakerWithSeed } from '@rightpoint/data-generators'
import { ScrollerFreeMode } from '@rightpoint/core/components'
import { typography } from '@rightpoint/core/styles'
import { TestPage } from '@rightpoint/core/pages'

const Page = ({ data }) => {
    return (
        <TestPage
            title="Perf Tests"
            subtitle="Barrel file imports should be tree shaked"
        >
            <typography.H3 as="h1">Barrel Import Test</typography.H3>
            <ScrollerFreeMode>
                <div>Use lib</div>
            </ScrollerFreeMode>
        </TestPage>
    )
}

export default Page
