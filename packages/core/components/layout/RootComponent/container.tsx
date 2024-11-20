/**
 * Manage container widths across the site for consistency
 */

import { Box } from 'atomic-layout'
import styled, { AnyStyledComponent, css } from 'styled-components'
import React, { FC, ReactNode } from 'react'
import { media } from '@rightpoint/core/styles'

export enum ContainerWidths {
    None = 'None',
    Default = 'Default',
    WorkText = 'WorkText',
    Medium = 'Medium',
}

export const ContainerBox: FC<{
    container?: ContainerWidths
    children?: ReactNode
    addBottomMargin?: boolean
    as?: keyof JSX.IntrinsicElements | ReactNode
}> = ({
    children,
    container = 'Default',
    addBottomMargin = false,
    as = undefined,
}) => {
    const ContainerElement = Containers[container]
    return (
        <ContainerElement $addBottomMargin={addBottomMargin} as={as}>
            {children}
        </ContainerElement>
    )
}

const commonContainerCss = css<{ $addBottomMargin?: boolean }>`
    ${({ $addBottomMargin }) =>
        $addBottomMargin &&
        css`
            margin-bottom: var(--spacing-vertical, 140px);
        `}
`

export const Containers = {
    [ContainerWidths.Default]: styled.div`
        ${commonContainerCss}
        padding-left: 20px;
        padding-right: 20px;

        margin-left: auto;
        margin-right: auto;

        max-width: 1440px;

        ${media('sm')} {
            padding-left: 40px;
            padding-right: 40px;
        }
        ${media('md')} {
            padding-left: 120px;
            padding-right: 120px;
        }
        ${media('lg')} {
            padding-left: 120px;
            padding-right: 120px;
        }
    `,
    [ContainerWidths.Medium]: styled.div`
        ${commonContainerCss}
        padding-left: 20px;
        padding-right: 20px;

        margin-left: auto;
        margin-right: auto;

        max-width: 1000px;

        ${media('sm')} {
            padding-left: 40px;
            padding-right: 40px;
        }

        ${media('md')} {
            padding-left: 60px;
            padding-right: 60px;
        }

        ${media('lg')} {
            padding-left: 70px;
            padding-right: 70px;
        }
        ${media('xxl')} {
            max-width: 1100px;
        }
    `,
    [ContainerWidths.WorkText]: styled.div`
        ${commonContainerCss}
        padding-left: 20px;
        padding-right: 20px;

        margin-left: auto;
        margin-right: auto;

        max-width: 1300px;

        ${media('sm')} {
            padding-left: 30px;
            padding-right: 30px;
        }
        ${media('lg')} {
            padding-left: 100px;
            padding-right: 100px;
        }
    `,
}

export const getContainerStyledComponent = (
    container: ContainerWidths | boolean
): AnyStyledComponent => {
    if (!container) {
        return null
    } else if (container === true) {
        return Containers[ContainerWidths.Default]
    } else {
        return Containers[container]
    }
}
