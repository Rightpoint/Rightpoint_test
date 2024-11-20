import dynamic from 'next/dynamic'
import { DebugLargePayloadDynamic } from '@rightpoint/core/components'
import { typography } from '@rightpoint/core/styles'
import { TestPage } from '@rightpoint/core/pages'

const Page = ({ data }) => {
    return (
        <TestPage title="Dynamic import test" subtitle="Dynamic import">
            <typography.H3 as="h1"></typography.H3>
            <div style={{ textAlign: 'center' }}>
                <DebugLargePayloadDynamic />
            </div>
        </TestPage>
    )
}

export default Page
