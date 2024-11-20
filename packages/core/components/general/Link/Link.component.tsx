import React, { ComponentType, FC, ReactNode } from 'react'
import { LinkStyles as s } from './Link.styles'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { pick } from 'lodash'
import { ErrorBoundary } from '@rightpoint/core/utils'
import { CSSProperties } from 'styled-components'

export interface LinkMeta {
    noFollow?: boolean
    opensInNewTab?: boolean
}

export interface LinkProps extends NextLinkProps {
    href: string
    text?: string
    meta?: LinkMeta
    style?: CSSProperties

    enableLinkStyle?: boolean

    target?: string
    anchorProps?: Record<string, any>
    Anchor?: ComponentType<unknown>

    noDecoration?: boolean
}

type AnchorProps = {
    target: string | undefined
    rel: string | undefined
}
export const getAnchorProps = (props: LinkProps): AnchorProps => {
    const { noFollow, opensInNewTab } = props.meta || {}
    return {
        target: props.target || opensInNewTab ? '_blank' : undefined,
        // https://developers.google.com/search/docs/advanced/guidelines/qualify-outbound-links
        rel: noFollow ? 'nofollow' : undefined,
    }
}

/**
 * Our link component, typically populated via the contentful Link content model.
 *
 * Use this component globally to gradually enhance the links with:
 * - Animations
 * - Hover states
 * - No follow, opens in new tab, ...
 */
export const Link: FC<LinkProps> = ({
    children,
    Anchor,
    anchorProps = {},
    enableLinkStyle = false, // enables link color and underline
    style = {},
    noDecoration = false,
    ...props
}) => {
    const { text = 'Learn more', meta = {}, href = '#not-passed' } = props
    const nextLinkProps: NextLinkProps = {
        href,
    }

    if (!nextLinkProps.href) {
        return <div>No href</div>
    }

    return (
        <NextLink
            {...nextLinkProps}
            {...pick(props, ['onClick'])}
            style={{
                ...style,
                textDecoration: noDecoration ? 'none' : '',
            }}
        >
            {children || text}
        </NextLink>
    )
}
