import { typography } from '@rightpoint/core/styles'
import { NextPage } from 'next'
import { PropsWithChildren } from 'react'
import styled from 'styled-components'

export interface TestPageProps extends PropsWithChildren {
    title: string
    subtitle: string
}

const StyledTestPage = styled.div`
    text-align: center;
    max-width: 1200px;
    margin: 0 auto;
    margin-top: 100px;
`

export const TestPage: NextPage<TestPageProps> = ({
    title,
    subtitle,
    children,
}) => {
    return (
        <StyledTestPage>
            <typography.H2 as="h1">{title}</typography.H2>
            <typography.H4 as="h3">{subtitle}</typography.H4>
            {children}
        </StyledTestPage>
    )
}
