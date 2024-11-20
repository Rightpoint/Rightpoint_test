import dynamic from 'next/dynamic'
import { DebugLargePayloadDynamicNoSSR } from '@rightpoint/core/components'
import { typography } from '@rightpoint/core/styles'
import { TestPage } from '@rightpoint/core/pages'

const Page = ({ data }) => {
    return (
        <TestPage title="Dynamic import test" subtitle="No SSR">
            <typography.H3 as="h1"></typography.H3>
            <p>Does not appear in markup.</p>
            <p>Deprioritized client side download</p>
            <div style={{ textAlign: 'center' }}>
                <DebugLargePayloadDynamicNoSSR />
            </div>
        </TestPage>
    )
}

export default Page
