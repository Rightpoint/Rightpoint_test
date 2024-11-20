import { useEffect } from 'react'
import { useResponsiveQuery } from 'atomic-layout'
import { useRouter } from 'next/router'

/**
 * Scroll to text
 */
export const useScrollToTextWithHash = () => {
    const isMobile = useResponsiveQuery({ from: 'xs', to: 'sm' })
    const router = useRouter()

    useEffect(() => {
        const handler = () => {
            const hash = window.location.hash
            if (hash.includes('scroll-to=')) {
                // try to scroll
                const scrollTo = hash
                    .split('scroll-to=')[1]
                    .replace('-', ' ')
                    .split('?')[0]

                let target
                window.location.hash = '##'

                console.log('Scroll hash detected', scrollTo)

                const match = document.evaluate(
                    `//*[not(self::div or self::script)][text()='${scrollTo}']`,
                    document,
                    null,
                    XPathResult.FIRST_ORDERED_NODE_TYPE,
                    null
                ).singleNodeValue as HTMLElement

                if (match) {
                    const closestRoot = match.closest(
                        '[data-root], [data-scroll-parent]'
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

                const offset = isMobile ? 75 : 50
                const elementPosition = target.getBoundingClientRect().top
                const offsetPosition =
                    elementPosition + window.pageYOffset - offset

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth',
                })
            }
        }

        // fire on load
        setTimeout(() => {
            handler()
        }, 500)

        // fire on change
        window.addEventListener('hashchange', handler)
        router.events.on('routeChangeComplete', handler)
        return () => {
            window.removeEventListener('hashchange', handler)
            router.events.off('routeChangeComplete', handler)
        }
    }, [router.events, isMobile])
}
