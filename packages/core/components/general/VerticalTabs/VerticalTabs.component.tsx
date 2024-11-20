import { Composition } from 'atomic-layout'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { RootComponent } from '../../layout/RootComponent/RootComponent.component'
import { MultiMedia, MultiMediaProps } from '../MultiMedia/MultiMedia.component'
import { VideoTabsStyles as s } from './VideoTabs.styles'

type ItemProps = {
    title: string
    description: string
    multiMediaProps: MultiMediaProps
}

export interface VerticalTabsProps {
    items: ItemProps[]
}

const Tabs = ({ items, activeItem, onMouseEnterItem }) => {
    return (
        <s.Tabs>
            {items.map((item, index) => (
                <s.Tab
                    key={index}
                    onMouseEnter={() => onMouseEnterItem(item)}
                    $active={activeItem === item}
                >
                    <s.TabTitle>{item.title}</s.TabTitle>
                    <s.TabDescription>{item.description}</s.TabDescription>
                </s.Tab>
            ))}
        </s.Tabs>
    )
}

const MediaContent = ({ items, activeItem }) => {
    return (
        <s.MediaContent>
            {items.map((item, index) => (
                <s.MediaContentItem key={index} $active={activeItem === item}>
                    <MultiMedia {...item.multiMediaProps} />
                </s.MediaContentItem>
            ))}
        </s.MediaContent>
    )
}

export const VerticalTabs: React.FC<VerticalTabsProps> = ({
    items,
    ...props
}) => {
    const [activeItem, setActiveItem] = useState(items[0])
    return (
        <RootComponent container {...props}>
            <Composition
                areas={`
                    media
                    tabs
                `}
                areasLg={`tabs media`}
                templateCols="1fr"
                templateColsLg="1fr 1fr"
                gapColLg={276}
            >
                {(areas) => (
                    <>
                        <areas.Tabs as={motion.div}>
                            <Tabs
                                items={items}
                                activeItem={activeItem}
                                onMouseEnterItem={(item) => setActiveItem(item)}
                            />
                        </areas.Tabs>
                        <areas.Media as={motion.div}>
                            <MediaContent
                                items={items}
                                activeItem={activeItem}
                            />
                        </areas.Media>
                    </>
                )}
            </Composition>
        </RootComponent>
    )
}
