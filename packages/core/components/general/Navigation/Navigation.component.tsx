import { Dispatch, FC, forwardRef, Fragment, useRef, useState } from 'react'
import Link from 'next/link'
import { NavigationStyles as s } from './Navigation.styles'
import { chunk } from 'lodash'
import { useRouter } from 'next/router'
import { LinkProps } from '../Link/Link.component'
import { AnimatePresence, motion } from 'framer-motion'
import {
    useScrollAnimation,
    withAnimation,
} from '../Animation/Animation.component'

export interface NavigationItemProps {
    text: string
    linkProps: LinkProps
    isActive?: boolean

    index?: string | number
    hoveredIndex?: string | number
    setHoveredIndex?: Dispatch<any>
}

const NavigationItem: FC<NavigationItemProps> = forwardRef(
    function NavigationItem_(
        {
            text,
            linkProps,
            isActive = false,
            hoveredIndex,
            setHoveredIndex,
            index,
        },
        ref
    ) {
        const router = useRouter()
        const path = linkProps.href.split('#')[0].split('?')[0]
        const re = new RegExp(`${path}$`)

        // is active
        const isActiveRoute = re.test(router.asPath)

        return (
            <s.ItemWrapper>
                <s.Item
                    isActive={isActive || isActiveRoute}
                    onMouseEnter={() => setHoveredIndex(index)}
                >
                    <Link {...linkProps} passHref legacyBehavior>
                        <s.Link as="a">{text}</s.Link>
                    </Link>

                    <AnimatePresence>
                        {(hoveredIndex === index || isActive) && (
                            <s.ItemActiveUnderline
                                style={{
                                    willChange: 'opacity',
                                }}
                                as={motion.div}
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                }}
                                layoutId="navigation-underline"
                            />
                        )}
                    </AnimatePresence>
                </s.Item>
            </s.ItemWrapper>
        )
    }
)

/**
 * This is the divider component that only appears between items
 * "per rendered line". It can only be detected via DOM.
 */
const Divider = ({ parentRef }) => {
    // use the parent ref, query this item
    // determine if the next item is in a new line via client widths
    return <s.Divider>/</s.Divider>
}

export interface NavigationProps {
    items: NavigationItemProps[]
}
// withAnimation // temporary removed until we can figure out how to not animate it if it loads in viewport already.
export const Navigation: FC<NavigationProps> = ({ items = [] }) => {
    const ref = useRef()
    const CHUNK_COUNT = items.length > 4 ? 3 : 2 // if there's a lot, chunk by 3.
    const pairs = chunk(items, CHUNK_COUNT)
    const [hoveredIndex, setHoveredIndex] = useState()

    return (
        <s.Navigation ref={ref} onMouseLeave={() => setHoveredIndex(null)}>
            <s.Container>
                {pairs.map((items, rowIndex) => (
                    <div key={rowIndex}>
                        {items.map((item, columnIndex) => (
                            <Fragment key={rowIndex + columnIndex + item.text}>
                                <NavigationItem
                                    {...item}
                                    index={columnIndex + rowIndex * CHUNK_COUNT}
                                    hoveredIndex={hoveredIndex}
                                    setHoveredIndex={setHoveredIndex}
                                />
                                {/* if not last, add divider */}
                                {columnIndex < items.length - 1 && (
                                    <Divider
                                        parentRef={ref}
                                        key={rowIndex + columnIndex + 'div'}
                                    />
                                )}
                            </Fragment>
                        ))}
                    </div>
                ))}
            </s.Container>
        </s.Navigation>
    )
}
