import { useEffect } from 'react'
import { useResponsiveQuery } from 'atomic-layout'
import { useRouter } from 'next/router'
import { logLocalDevOnly } from '../logging/log-local-dev-only'
import { dataAttributes } from '@rightpoint/core/variables'

export const useScrollToTextFn = () => {
    const isMobile = useResponsiveQuery({ from: 'xs', to: 'sm' })

    if (typeof window === 'undefined') {
        return () => null
    }

    const scrollToHandler = ({ scrollToText }: { scrollToText: string }) => {
        try {
            let target
            const scrollToTextDecoded = decodeURI(scrollToText)
            const match = document.evaluate(
                // in future, we can match specific element types if we need
                `//*[not(self::script or parent::a or self::a)][contains(text(), '${scrollToTextDecoded}')]`,
                document,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE, // return one node
                null
            ).singleNodeValue as HTMLElement
            logLocalDevOnly(
                {
                    namespace: 'use-scroll-to-text-',
                },
                'Scroll handler target',
                {
                    match,
                    scrollToText,
                    scrollToTextDecoded,
                }
            )

            /**
             * If a node found, scroll to the nearest [data-root] component or [data-scroll-parent]
             * that contains the match.
             */
            if (match) {
                logLocalDevOnly(
                    {
                        namespace: 'use-scroll-to-text-',
                    },
                    'Scroll found match via document',
                    match
                )
                const closestRoot = match.closest(
                    `${dataAttributes.root.selector}, ${dataAttributes.scrollParent.selector}`
                )
                if (closestRoot) {
                    target = closestRoot
                } else {
                    target = match
                }
            }

            if (!target) {
                return
            }

            /**
             * Scroll to top of element if padded (BCR.top)
             *
             * Minus margin if present, to always be framed correctly
             */
            const elementPosition = target.getBoundingClientRect().top

            const marginTop =
                getComputedStyle(target).getPropertyValue('margin-top')

            const offsetPosition =
                elementPosition + window.pageYOffset - parseInt(marginTop)

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            })
        } catch (ex) {
            console.error('Scroll to failed', ex)
            return
        }
    }
    return scrollToHandler
}

/**
 * Scroll to text match via hash.
 *
 * Naive, but useful immediately.
 *
 * This is a somewhat naive implementation, as it can be unreliable in ways, but is easier to solve for
 * dev/content authors than a solution that uses say IDs or unique identifiers added to components.
 *
 * Adding a unique identifier to a component has non trivial considerations such as duplicates,
 * same components used in multiple places, identifying the correct component in CMS, etc.
 *
 * @example
 * <a href="#scroll-to=My text">Scroll to text</a>
 */
export const useScrollToTextWithHash = () => {
    const router = useRouter()
    const scrollToText = useScrollToTextFn()

    useEffect(() => {
        const scrollToHash = () => {
            const hash = window.location.hash
            if (hash.includes('scroll-to=')) {
                // try to scroll
                const scrollTo = hash
                    .split('scroll-to=')[1]
                    .replaceAll('-', ' ')
                    .split('?')[0]
                logLocalDevOnly(
                    {
                        namespace: 'use-scroll-to-text-',
                    },
                    'Scroll to decoded from hash',
                    scrollTo
                )

                scrollToText({ scrollToText: scrollTo })

                /**
                 * Don't add a history state to preserve back button history
                 */
                history?.replaceState(
                    undefined,
                    undefined,
                    window.location.pathname
                )
            }
        }

        // fire on load
        setTimeout(() => {
            scrollToHash()
        }, 500)

        const handleRouteChange = () => {
            setTimeout(() => {
                scrollToHash()
            }, 500)
        }

        // fire on change
        router.events.on('routeChangeComplete', handleRouteChange)

        return () => {
            window.removeEventListener('hashchange', scrollToHash)
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [router.events, scrollToText])
}
