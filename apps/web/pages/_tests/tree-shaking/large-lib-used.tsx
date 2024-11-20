import { TestPage } from '@rightpoint/core/pages'
import { ScrollerFreeMode } from '@rightpoint/core/components'
import { GetStaticPaths, GetStaticProps } from 'next'

const Page = (props) => {
    console.log(ScrollerFreeMode)
    return (
        <TestPage
            title="Perf Tests"
            subtitle=" This large lib should only appear on this page, unless
        downloaded during idle."
        ></TestPage>
    )
}

export default Page
