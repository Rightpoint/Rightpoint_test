import { AnimateSharedLayout, motion, useScroll } from 'framer-motion'
import { FC, RefObject, useEffect, useRef, useState } from 'react'
import { useIsomorphicLayoutEffect, useRect } from '@rightpoint/core/utils'
import { NavigationBarStyles as s } from './NavigationBar.styles'
import { useDispatch } from 'react-redux'
import { useScrollSpy } from '@rightpoint/core/utils'
import { useResponsiveQuery } from 'atomic-layout'

/**
 * These props are passed to the child from parent
 * to control animation states and are tightly coupled.
 *
 * They are tracked separately from props that are required by the user/developer/cms.
 */
interface NavigationBarItemPropsFromParent {
    isActive: boolean
    index: number
    setActiveIndex: (index: number) => void
    setActiveHoverIndex: (index: number) => void
}
export interface NavigationBarItemProps {
    text: string
}
/**
 * @deprecated
 */
export const NavigationBarItem: FC<
    NavigationBarItemProps & NavigationBarItemPropsFromParent
> = ({ text, isActive, index, setActiveIndex, setActiveHoverIndex }) => {
    const ref = useRef<HTMLButtonElement>()

    const isMobile = useResponsiveQuery({ from: 'xs', to: 'sm' })
    /**
     * Scrollspy needs more work:
     * Is currently glitch because as we scroll from element A, to B, there can be a gap between those components,
     * disabling the scrollspy state between A and B.
     *
     * Solution: there needs to be a small distance buffer that extends past scrollspy elements.
     */
    // const { isInViewport } = useScrollSpy({
    //     querySelector: '#' + targetId,
    // })
    const isInViewport = false

    return (
        <>
            <s.Item
                ref={ref}
                onMouseEnter={() => {
                    setActiveHoverIndex(index)
                }}
                onMouseLeave={() => {
                    setActiveHoverIndex(null)
                }}
            >
                <s.ItemPositioner>
                    {text}

                    {(isInViewport || isActive) && (
                        <s.ItemActiveUnderline
                            as={motion.div}
                            layoutId="underline"
                        />
                    )}
                </s.ItemPositioner>
            </s.Item>
        </>
    )
}

export interface NavigationBarProps {
    items: NavigationBarItemProps[]
    endSelector?: string
}
/**
 * position: sticky; only works if the sticky element is child of the sticky area.
 * The sticky area in this case can span arbitrary lengths via CMS, so we need to use JS.
 */
export const NavigationBar: FC<NavigationBarProps> = ({
    items,
    endSelector,
}) => {
    return <>Obsoleted</>
}
//     const { scrollY } = useScroll()
//     const ref = useRef()
//     const rect = useRect(ref)
//     const [stickRange, setStickRange] = useState({ start: 0, end: 0 })
//     const [isSticky, setIsSticky] = useState(false)

//     /** */
//     useIsomorphicLayoutEffect(() => {
//         const StickyNavbarHeight = 64 // should this be dynamic?

//         // what element does this stop sticking at?
//         // ids are sketchy. duplicates, shared modules...
//         const endElement = document.querySelector(endSelector)
//         const endBCR = endElement
//             ? endElement.getBoundingClientRect()
//             : { top: rect.bottom + 10000 }

//         setStickRange({
//             start: window.scrollY + rect.top - StickyNavbarHeight,
//             end: window.scrollY + endBCR.top - StickyNavbarHeight,
//         })
//     }, [rect.top, rect.bottom])

//     useEffect(() => {
//         const handleSticky = (v: number) => {
//             const isStartAbove = stickRange.start <= v
//             const isEndAbove = stickRange.end <= v

//             if (isStartAbove && !isEndAbove) {
//                 !isSticky && setIsSticky(true)
//             } else {
//                 isSticky && setIsSticky(false)
//             }
//         }
//         const cleanup = scrollY.onChange((v) => {
//             handleSticky(v)
//         })
//         handleSticky(window.scrollY)
//         return () => {
//             cleanup()
//         }
//     }, [ref, isSticky, scrollY, stickRange])

//     const [activeHoverIndex, setActiveHoverIndex] = useState(null)
//     const [activeIndex, setActiveIndex] = useState(null)

//     return (
//         <s.HeightPlaceholder ref={ref} data-hint="Navigation stick start">
//             <s.NavigationBar
//                 $isSticky={isSticky}
//                 as="nav"
//                 // note: SR announces "navigation" already. "navigation, in page", "in page, navigation"
//                 aria-label="In page anchors"
//             >
//                 <AnimateSharedLayout>
//                     {items.map((item, index) => {
//                         let isActive = false
//                         const isHovering = activeHoverIndex > -1
//                         if (isHovering) {
//                             isActive = activeHoverIndex === index
//                         } else {
//                             isActive = activeIndex === index
//                         }
//                         return (
//                             <NavigationBarItem
//                                 {...item}
//                                 key={index}
//                                 text={item.text}
//                                 index={index}
//                                 isActive={isActive}
//                                 setActiveHoverIndex={setActiveHoverIndex}
//                                 setActiveIndex={setActiveIndex}
//                             />
//                         )
//                     })}
//                 </AnimateSharedLayout>
//             </s.NavigationBar>
//         </s.HeightPlaceholder>
//     )
// }
