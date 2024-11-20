import React, { ComponentType, FC, ReactNode } from 'react'
import { LinkStyles as s } from './Link.styles'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { pick } from 'lodash'
import { ErrorBoundary } from '@rightpoint/core/utils'

export interface LinkMeta {
    noFollow?: boolean
    opensInNewTab?: boolean
}

/**
 * Note: a month before launch, we upgraded to V13 of Next.js
 * which completely changes the behavior of next/link.
 *
 * Some of this component may not make sense for the new version of next/link
 * and requires cleanup.
 */
export interface LinkProps {
    href: string
    text?: string // text of link

    target?: string // DX: override the target prop as you would expect with a <Link target="_blank" />
    meta?: LinkMeta // Set meta props like noFollow, opensInNewTab, and future link requirements

    // styling
    noDecoration?: boolean // remove underline
    asStyledLink?: boolean // add default link size/style/underline
    asButton?: boolean

    // scroll
    scrollTo?: {
        text?: string
    }

    // props passed to inner Link component (styled(NextLink))
    nextProps?: Partial<NextLinkProps>

    /**
     * @deprecated -- use innerProps
     */
    as?: any

    /**
     * @deprecated -- use innerProps
     */
    tabIndex?: number
    /**
     * @deprecated -- use innerProps
     */
    onClick?: (e: any) => void

    children?: ReactNode
}

type AnchorProps = {
    target: string | undefined
    rel: string | undefined
}
/**
 * Get anchor props from
 */
export const getAnchorMetaProps = (props: LinkProps): AnchorProps => {
    const { noFollow, opensInNewTab } = props.meta || {}
    return {
        // either the manually passed target prop, or the opensInNewTab prop
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
export const Link: FC<LinkProps> = (props) => {
    const {
        children,
        scrollTo,
        text = 'Learn more',
        href = '#',

        // style
        noDecoration = false,
        asStyledLink = false,
        asButton = false,

        nextProps = {},
    } = props

    const getHref = (href) => {
        /**
         * Handle scroll to behavior.
         *
         * FUTURE: This object can define future more advanced scroll behaviors like
         * linking to a entry, id, etc.
         */
        const hasScrollTarget = scrollTo?.text
        if (hasScrollTarget) {
            /**
             * NOTE: This will break if we already have a hash.
             */
            return `${href}#scroll-to=${scrollTo.text}`
        }
        return href
    }

    const nextLinkProps: NextLinkProps = {
        href: getHref(href),
    }

    if (typeof nextLinkProps.href !== 'string') {
        return <div>No href</div>
    }

    const StyledNextLink = asButton ? s.NextLinkButtonStyled : s.NextLinkStyled

    return (
        <ErrorBoundary>
            <StyledNextLink
                /**
                 *  @deprecated -- this should be replaced with innerProps.
                 *  next/link v13 link changes link behavior significantly and this is no longer needed
                 *  once components stop using these shortcuts.
                 */
                {...pick(props, ['onClick', 'tabIndex', 'as'])}
                {...nextProps} // arbitrary props for aria- etc
                {...getAnchorMetaProps(props)} // get props like "target" and "rel"
                {...nextLinkProps} // next/link specific props
                $noDecoration={noDecoration}
                $styledLink={asStyledLink}
            >
                {children || text}
            </StyledNextLink>
        </ErrorBoundary>
    )
}
