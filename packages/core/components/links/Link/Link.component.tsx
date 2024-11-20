import React, { AriaAttributes, FC, ReactNode, useCallback } from 'react'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'

import { ErrorBoundary } from '@rightpoint/core/utils'
import { pickBy } from 'lodash'
import { usePardotModal } from '../../general/Pardot/usePardotModal'

import type { ButtonProps } from '../../general/Button/Button.component'
import {
    createCursorControlAttributes,
    CursorControlProps,
} from '../../general/Cursor/Cursor.component'
import type { PardotProps } from '../../general/Pardot/Pardot.component'

import { LinkStyles as s } from './Link.styles'

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
export interface LinkProps extends AriaAttributes {
    href: string
    text?: string // text of link
    /**
     * Override the target prop as you would expect with a
     * <Link target="_blank" />
     */
    target?: string
    /**
     * Meta noFollow, opensInNewTab, and future link requirements
     */
    meta?: LinkMeta

    /**
     * Add underline
     */
    addDecoration?: boolean
    /**
     * Remove underline
     */
    noDecoration?: boolean // remove underline
    /**
     * Add hover if not underlined
     */
    noDecorationHover?: boolean

    /**
     * Remove any styling at all and use next/link
     */
    asPlainNextLink?: boolean
    asStyledLink?: boolean // add default link size/style/underline
    asButton?: boolean | ButtonProps
    asButtonOutlined?: boolean

    /**
     * Scroll to text on page
     */
    scrollTo?: {
        text?: string
    }

    /**
     * Cursor related props (hover text)
     */
    cursorProps?: CursorControlProps

    /**
     * Props passed to inner Link component (styled(NextLink))
     */
    nextProps?: Partial<NextLinkProps> | { [key: string]: any }

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
    pardotProps?: PardotProps

    children?: ReactNode
}

type AnchorProps = {
    target: string | undefined
    rel: string | undefined
}

/**
 * Get target prop based on href, target, and opensInNewTab props.
 *
 * - Force mailto: to always be _blank
 * - If target prop is passed, use that
 * - If opensInNewTab prop is passed (from CMS), use that
 */
const getTarget = ({ target, opensInNewTab, href }) => {
    if (href.indexOf('mailto:') > -1) {
        return '_blank'
    }
    if (target) {
        return target
    }
    if (opensInNewTab) {
        return '_blank'
    }
    return undefined
}
/**
 * Get anchor meta props like noFollow, opensInNewTab, etc.
 */
export const getAnchorMetaProps = (
    props: LinkProps,
    href: string
): AnchorProps => {
    const { noFollow, opensInNewTab } = props.meta || {}
    return {
        // either the manually passed target prop, or the opensInNewTab prop
        target: getTarget({ target: props.target, opensInNewTab, href }),
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
        text = 'Learn More',
        href = '#',

        cursorProps,

        // style
        noDecorationHover: hover = false,
        addDecoration = false,
        noDecoration = false,
        asPlainNextLink = false,
        asStyledLink = false,
        asButton = false,

        nextProps = {},

        pardotProps,

        ...restProps
    } = props

    const hasScrollTarget = scrollTo?.text

    const getHref = (href: string) => {
        /**
         * Handle scroll to behavior.
         *
         * It relies on a hash change handler initialized per app by changing hash.
         *
         * FUTURE: This object can define future more advanced scroll behaviors like
         * linking to a entry, id, etc.
         */
        if (hasScrollTarget) {
            /**
             * NOTE: This will break if we already have a hash.
             */
            return `${href}#scroll-to=${scrollTo.text}`
        }
        return href || '#'
    }

    const nextLinkProps: NextLinkProps = {
        ...nextProps,
        /**
         * Don't allow next/link to fail by passing no href, as it does so loudly and breaks builds.
         * Instead, allow authors to ID and fix.
         *
         * Note: href can be a string or a NextLink object
         */
        href: (typeof href === 'string' ? getHref(href) : href) || '#',
    }

    const getLinkComponent = () => {
        if (asPlainNextLink) {
            return NextLink
        }
        if (asButton) {
            return s.NextLinkButtonStyled
        }
        return s.NextLinkStyled
    }
    const LinkElement = getLinkComponent()

    /**
     * Handle Pardot Modal
     */
    const { PardotModal, pardotModalProps, pardotModalController } =
        usePardotModal({
            pardotProps,
        })
    const hasPardotForm = Boolean(pardotProps?.embedUrl)

    const validRestProps = ['onClick', 'as']
    return (
        <ErrorBoundary>
            <LinkElement
                /**
                 * @deprecated
                 *
                 * It was a mistake to allow root level arbitrary props passing (e.g. <Link {...props} />)
                 * as it makes it hard to know what props are valid, or what the components dependencies are.
                 *
                 * At least limit the damage-control by restricting to specific props.
                 *
                 * For now, it's data-, aria- and onClick.
                 */
                {...pickBy(restProps, (value, key) => {
                    return (
                        key.startsWith('aria-') ||
                        key.startsWith('data-') ||
                        validRestProps.includes(key)
                    )
                })}
                {...getAnchorMetaProps(props, href)} // get props like "target" and "rel"
                {...nextLinkProps} // next/link specific props
                // TODO: if on current page, and is a scroll link, then show "Scroll to" or "Click to Scroll"
                {...createCursorControlAttributes({
                    cursorControlProps: cursorProps,
                })}
                {...(!asPlainNextLink && {
                    $noDecoration: noDecoration,
                    $styledLink: asStyledLink,
                    $noDecorationHover: hover,
                    $addDecoration: addDecoration,
                })}
                /**
                 * asButton is either a default (bool) or ButtonProps (options)
                 */
                {...(asButton && {
                    $size: (asButton as ButtonProps)?.size,
                    $outlined: (asButton as ButtonProps)?.outlined,
                })}
                /**
                 * If we have a pardot form, open the modal instead of following the link.
                 * TODO: Low Priority: this should be moved to its own function so that we do not load PardotModal code into every Link,
                 * because realistically, a Pardot form exists in every page due to the contact page at the top.
                 */
                {...(hasPardotForm && {
                    onClick: (ev) => {
                        pardotModalController.open()
                        ev.preventDefault()
                        return false
                    },
                })}
            >
                {children || text}
            </LinkElement>

            {hasPardotForm && (
                <PardotModal {...pardotProps} {...pardotModalProps} />
            )}
        </ErrorBoundary>
    )
}
