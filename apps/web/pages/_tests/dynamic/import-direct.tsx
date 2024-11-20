import dynamic from 'next/dynamic'
import { DebugLargePayload } from '@rightpoint/core/components'
import { typography } from '@rightpoint/core/styles'
import { TestPage } from '@rightpoint/core/pages'

const Page = ({ data }) => {
    return (
        <TestPage title="Dynamic import test" subtitle="Direct import">
            <typography.H3 as="h1"></typography.H3>
            <div style={{ textAlign: 'center' }}>
                <p>This is a non dynamic direct import</p>
                <DebugLargePayload />
            </div>
        </TestPage>
    )
}

export default Page
