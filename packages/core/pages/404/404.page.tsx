import { NextPage } from 'next'
import { typography } from '@rightpoint/core/styles'
import { Composition } from 'atomic-layout'

/**
 *
 */
export const Page404: NextPage = () => {
    return (
        <Composition paddingVertical={140}>
            {/* <Hero title={`Page not found`} /> */}
            <typography.H1 $textAlign="center">Page not found</typography.H1>
        </Composition>
    )
}
