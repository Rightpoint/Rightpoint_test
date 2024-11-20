import { LayoutGroup, motion } from 'framer-motion'
import { FC, ReactNode, useEffect, useId, useState } from 'react'
import { TabsNavStyles as s } from './TabsNav.styles'
import { useRouter } from 'next/router'
import { Link, LinkProps } from '../../links/Link/Link.component'
import { isSameBasePath } from '../../utils/url'

interface ItemProps {
    linkProps: LinkProps
    isActive: boolean
    isHoverActive: boolean
    index: number
    setActiveHoverIndex: (index: number) => void
    setActiveIndex: (index: number) => void
    activeIndex?: number
}

const Item: FC<ItemProps> = ({
    linkProps,
    activeIndex,
    index,
    setActiveHoverIndex,
    setActiveIndex,
}) => {
    const router = useRouter()

    const isActive = ({ activeIndex, index }) => {
        if (linkProps?.href) {
            return isSameBasePath(linkProps.href, router.asPath, {
                // do not match children, i.e. /thought/ should not match /thought/category
                exactMatch: true,
            })
        }
        return activeIndex === index
    }

    return (
        <s.Item
            onClick={(ev) => {
                // parent props can set handleClick function
                // such as for non-link JS-only in page behaviors
                // handleClick?.()
            }}
        >
            <s.ActivePositioner>
                {linkProps.text && (
                    <Link
                        {...linkProps}
                        nextProps={{
                            ...linkProps.nextProps,
                            onClick: (ev) => {
                                setActiveIndex(index)
                                linkProps?.nextProps?.onClick?.(ev)
                            },
                        }}
                        noDecoration
                    />
                )}
                {isActive({ activeIndex, index }) && (
                    <s.Item__Active as={motion.div} layoutId="underline" />
                )}
            </s.ActivePositioner>
        </s.Item>
    )
}

export interface TabsNavProps {
    linksProps?: LinkProps[]
}

export const TabsNav: FC<TabsNavProps> = ({ linksProps }) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [activeHoverIndex, setActiveHoverIndex] = useState(null)
    const id = useId()
    return (
        <s.TabsNav data-hint={`layoutId ${id}`}>
            <s.Inner>
                {/* prevent animation between lines across SPA page loads */}
                <LayoutGroup id={id}>
                    {linksProps.map((linkProps, index) => {
                        let isActive = false
                        const isHovering = activeHoverIndex > -1
                        if (isHovering) {
                            isActive = activeHoverIndex === index
                        } else {
                            isActive = activeIndex === index
                        }
                        return (
                            <Item
                                key={index}
                                index={index}
                                isActive={isActive}
                                activeIndex={activeIndex}
                                isHoverActive={isHovering}
                                setActiveHoverIndex={setActiveHoverIndex}
                                setActiveIndex={setActiveIndex}
                                linkProps={linkProps}
                            />
                        )
                    })}
                </LayoutGroup>
            </s.Inner>
        </s.TabsNav>
    )
}
