/**
 * Manage container widths across the site for consistency
 */

import { Box } from 'atomic-layout'
import styled, { css } from 'styled-components'
import React, { FC, ReactNode } from 'react'
import { media } from '@rightpoint/core/styles'

export enum ContainerWidths {
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

const Containers = {
    [ContainerWidths.Default]: styled.div`
        ${commonContainerCss}
        padding-left: 20px;
        padding-right: 20px;

        margin-left: auto;
        margin-right: auto;

        max-width: 1500px;

        ${media('sm')} {
            padding-left: 40px;
            padding-right: 40px;
        }
        ${media('md')} {
            padding-left: 60px;
            padding-right: 60px;
        }
        ${media('lg')} {
            padding-left: 60px;
            padding-right: 60px;
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

/**
 * @deprecated
 * TODO: convert usages into styled components
 */
const containerStyles = {
    [ContainerWidths.Default]: {
        paddingHorizontalXs: 20,
        paddingHorizontalSm: 40,
        paddingHorizontalMd: 60,
        maxWidth: 1500,
        marginHorizontal: 'auto',
    },
    [ContainerWidths.Medium]: {
        paddingHorizontalXs: 20,
        maxWidth: 1000,
        maxWidthXxl: 1300,
        marginHorizontal: 'auto',
    },
    [ContainerWidths.WorkText]: {
        // now that we have the root component/container system,
        // we don't need to "undo" widths, we only enable them
        // by wrapping with this component or by setting the context from a child
        // except it might be annoying to deal with when manually setting components.
        paddingHorizontalXs: 20,
        paddingHorizontalSm: 30,
        // paddingHorizontalMd: 40,
        paddingHorizontalLg: 100,
        maxWidth: 1300,
        marginHorizontal: 'auto',
    },
}
export const getContainerBoxProps = (containerName) => {
    if (!containerName) {
        return {}
    }
    return (
        containerStyles[containerName] ||
        containerStyles[ContainerWidths.Default]
    )
}
