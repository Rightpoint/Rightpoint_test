import { Document } from '@contentful/rich-text-types'
import { Composition } from 'atomic-layout'
import { motion, useInView } from 'framer-motion'
import React, { FC, ReactNode, useEffect, useRef, useState } from 'react'
import {
    MultiMedia,
    MultiMediaProps,
} from '../../general/MultiMedia/MultiMedia.component'
import { contentfulRichTextToReact } from '../../general/RichText/contentful-rich-text-to-react'
import { Header, HeaderProps } from '../../v2/Header/Header.component'
import { VerticalTabsStyles as s } from './VerticalTabs.styles'

/**
 * Per-item data from CMS
 */
export type VerticalTabsItemProps = {
    title: string
    body?: string | ReactNode
    bodyDocument?: Document
    multiMediaProps: MultiMediaProps
    headerProps?: HeaderProps
}

/**
 * CMS data + handlers
 */
const Tab: FC<
    VerticalTabsItemProps & {
        isActive?: boolean
        item: Omit<VerticalTabsItemProps, 'item'>
        handleMouseEnterItem: (...args: any[]) => void
    }
> = ({ body, bodyDocument, title, isActive, item, handleMouseEnterItem }) => {
    const ref = useRef()
    const inView = useInView(ref, {
        once: false,
        amount: 0.8,
    })
    // useEffect(() => {
    //     handleMouseEnterItem(item)
    // }, [inView])
    return (
        <s.Tab
            onMouseEnter={() => handleMouseEnterItem(item)}
            onClick={() => handleMouseEnterItem(item)} // for keyboard users
            $active={isActive}
            $inView={inView}
            ref={ref}
        >
            <s.Tab__Title>{title}</s.Tab__Title>
            <s.Tab__Body>
                {body}
                {bodyDocument && contentfulRichTextToReact(bodyDocument)}
            </s.Tab__Body>
        </s.Tab>
    )
}

interface TabsProps {
    items: VerticalTabsItemProps[]
    activeItem: VerticalTabsItemProps
    handleMouseEnterItem: (item: VerticalTabsItemProps) => void
}
const Tabs: FC<TabsProps> = ({ items, activeItem, handleMouseEnterItem }) => {
    return (
        <s.Tabs>
            {items.map((item, index) => (
                <Tab
                    key={index}
                    {...item}
                    item={item}
                    isActive={activeItem === item}
                    handleMouseEnterItem={handleMouseEnterItem}
                />
            ))}
        </s.Tabs>
    )
}

interface MediaContentProps {
    items: VerticalTabsItemProps[]
    activeItem: VerticalTabsItemProps
}
const MediaContent: FC<MediaContentProps> = ({ items, activeItem }) => {
    return (
        <s.MediaContent>
            {items.map((item, index) => (
                <s.MediaContent__Item key={index} $active={activeItem === item}>
                    <MultiMedia {...item.multiMediaProps} />
                </s.MediaContent__Item>
            ))}
        </s.MediaContent>
    )
}

export interface VerticalTabsProps {
    items: VerticalTabsItemProps[]
    hasHeader?: boolean
}

export const VerticalTabs: FC<VerticalTabsProps> = ({ items, hasHeader }) => {
    const [activeItem, setActiveItem] = useState(items[0])
    return (
        <s.VerticalTabs
            $hasHeader={hasHeader}
            as={Composition}
            areas={`
                    media
                    tabs
            `}
            areasLg={`tabs media`}
            templateCols="1fr"
            templateColsLg="1fr 1fr"
            gapColLg={200}
        >
            {(areas) => (
                <>
                    <areas.Tabs as={motion.div}>
                        <Tabs
                            items={items}
                            activeItem={activeItem}
                            handleMouseEnterItem={(item) => setActiveItem(item)}
                        />
                    </areas.Tabs>
                    <areas.Media as={motion.div}>
                        <MediaContent items={items} activeItem={activeItem} />
                    </areas.Media>
                </>
            )}
        </s.VerticalTabs>
    )
}

export interface VerticalTabsComposedProps extends VerticalTabsProps {
    headerProps?: HeaderProps
}
export const VerticalTabsComposed: FC<VerticalTabsComposedProps> = ({
    headerProps,
    ...props
}) => {
    return (
        <>
            {headerProps && <Header {...headerProps} />}
            <VerticalTabs {...props} hasHeader={!!headerProps} />
        </>
    )
}
