/**
 * Manage container widths across the site for consistency
 */

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
    addTopMargin?: boolean

    as?: keyof JSX.IntrinsicElements | ReactNode
}> = ({
    children,
    container = 'Default',
    addBottomMargin = false,
    addTopMargin = false,
    as = undefined,
}) => {
    const ContainerElement = Containers[container]
    return (
        <ContainerElement
            $addBottomMargin={addBottomMargin}
            $addTopMargin={addTopMargin}
            as={as}
        >
            {children}
        </ContainerElement>
    )
}

const commonContainerCss = css<{
    $addBottomMargin?: boolean
    $addTopMargin?: boolean
}>`
    ${({ $addBottomMargin }) =>
        $addBottomMargin &&
        css`
            margin-bottom: var(--spacing-vertical, 140px);
        `}
    ${({ $addTopMargin }) =>
        $addTopMargin &&
        css`
            margin-top: var(--spacing-vertical, 140px);
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
            padding-left: 20px;
            padding-right: 20px;
        }
        ${media('md')} {
            padding-left: 40px;
            padding-right: 40px;
        }
        ${media('lg')} {
            padding-left: 120px;
            padding-right: 120px;
        }
        ${media('xxl')} {
            max-width: 1600px;
        }
    `,
    /**
     * Used on Solution/etc pages where initial content slightly constrained.
     */
    [ContainerWidths.Medium]: styled.div.attrs({
        'data-hint': 'Container: Medium',
    })`
        ${commonContainerCss}
        padding-left: 20px;
        padding-right: 20px;

        margin-left: auto;
        margin-right: auto;

        max-width: 1000px;

        ${media('sm')} {
            max-width: calc(1000px + 2 * 40px);
            padding-left: 40px;
            padding-right: 40px;
        }

        ${media('md')} {
            max-width: calc(1000px + 2 * 60px);
            padding-left: 60px;
            padding-right: 60px;
        }

        ${media('lg')} {
            max-width: calc(1000px + 2 * 70px);
            padding-left: 70px;
            padding-right: 70px;
        }
        ${media('xxl')} {
            max-width: 1400px;
            padding-left: 120px;
            padding-right: 120px;
        }
    `,
    [ContainerWidths.WorkText]: styled.div.attrs({
        'data-hint': 'Container: WorkText',
    })`
        ${commonContainerCss}
        padding-left: 20px;
        padding-right: 20px;

        margin-left: auto;
        margin-right: auto;

        max-width: 1440px;

        ${media('sm')} {
            padding-left: 20px;
            padding-right: 20px;
        }
        ${media('md')} {
            padding-left: 60px;
            padding-right: 60px;
        }
        ${media('lg')} {
            padding-left: 120px;
            padding-right: 120px;
        }
        ${media('xxl')} {
            max-width: 1600px;
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
