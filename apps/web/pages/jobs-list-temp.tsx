import dynamic from 'next/dynamic'
import { DebugLargePayload, JobsList } from '@rightpoint/core/components'
import { typography } from '@rightpoint/core/styles'
import { TestPage } from '@rightpoint/core/pages'

const Page = ({ data }) => {
    return (
        <TestPage title="Jobs list test" subtitle="">
            <typography.H3 as="h1"></typography.H3>
            <div
                style={{
                    textAlign: 'center',
                    margin: '0 auto',
                }}
            >
                <p>This is a non dynamic direct import</p>
                <JobsList offices={[]} />
            </div>
        </TestPage>
    )
}

export default Page
