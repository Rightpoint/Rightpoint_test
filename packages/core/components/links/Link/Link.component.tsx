import React, { AriaAttributes, FC, ReactNode, useState } from 'react'
import { LinkStyles as s } from './Link.styles'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { ErrorBoundary } from '@rightpoint/core/utils'
import type { ButtonProps } from '../../general/Button/Button.component'
import { PardotModal, PardotProps } from '../../general/Pardot/Pardot.component'
import { pickBy } from 'lodash'

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

    target?: string // DX: override the target prop as you would expect with a <Link target="_blank" />
    meta?: LinkMeta // Set meta props like noFollow, opensInNewTab, and future link requirements

    // styling
    addDecoration?: boolean // adds underline
    noDecoration?: boolean // remove underline
    noDecorationAddHover?: boolean // adds hover effect if not underlined
    asStyledLink?: boolean // add default link size/style/underline
    asButton?: boolean | ButtonProps
    asButtonOutlined?: boolean

    // scroll
    scrollTo?: {
        text?: string
    }

    cursor?: {
        text?: string
        // onClick?
    }

    // props passed to inner Link component (styled(NextLink))
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

        cursor = {},

        // style
        addDecoration = false,
        noDecoration = false,
        noDecorationAddHover = false,
        asStyledLink = false,
        asButton = false,

        nextProps = {},

        pardotProps,

        ...restProps
    } = props
    const [isOpen, setIsOpen] = useState(false)

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

    const StyledNextLink = asButton ? s.NextLinkButtonStyled : s.NextLinkStyled

    /**
     * Valid props that can be passed to the inner link component for DX.
     *
     * <Link ara-foobar=""/>
     * For now, it's data-, aria- and onClick.
     */
    const validRestProps = ['onClick', 'as']
    return (
        <ErrorBoundary>
            <StyledNextLink
                {...pickBy(restProps, (value, key) => {
                    return (
                        key.startsWith('aria-') ||
                        key.startsWith('data-') ||
                        validRestProps.includes(key)
                    )
                })} // arbitrary props
                {...getAnchorMetaProps(props, href)} // get props like "target" and "rel"
                {...nextLinkProps} // next/link specific props
                $noDecoration={noDecoration}
                $noDecorationAddHover={noDecorationAddHover}
                $addDecoration={addDecoration}
                $styledLink={asStyledLink}
                // TODO: if on current page, and is a scroll link, then show "Scroll to" or "Click to Scroll"
                data-cursor-text={cursor?.text || null}
                /**
                 * asButton be a default, or ButtonProps
                 */
                {...(asButton && {
                    $size: (asButton as ButtonProps)?.size,
                    $outlined: (asButton as ButtonProps)?.outlined,
                })}
                /**
                 * TODO: It would be nice to split out the pardot logic
                 */
                {...(pardotProps?.embedUrl && {
                    onClick: (ev) => {
                        setIsOpen(true)
                        ev.preventDefault()
                        return false
                    },
                })}
            >
                {children || text}
            </StyledNextLink>
            {/* TODO: It would be nice to split out the pardot logic */}
            {pardotProps?.embedUrl && (
                <PardotModal
                    {...pardotProps}
                    isModalOpen={isOpen}
                    handleRequestClose={() => setIsOpen(false)}
                />
            )}
        </ErrorBoundary>
    )
}
