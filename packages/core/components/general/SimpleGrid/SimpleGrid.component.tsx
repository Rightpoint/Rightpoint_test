import { Children, FC, ReactChildren, ReactNode } from 'react'
import { Box, Composition } from 'atomic-layout'
import { SimpleGridStyles as s } from './SimpleGrid.styles'
import { Image, ImageProps } from '../Image/Image.component'
import { MultiMedia, MultiMediaProps } from '../MultiMedia/MultiMedia.component'
import { useScrollAnimation } from '../Animation/Animation.component'
import { contentfulRichTextToReact } from '../RichText/contentful-rich-text-to-react'
import { Document } from '@contentful/rich-text-types'
import { ConditionalWrapper } from '@rightpoint/core/utils'
import { Link, LinkProps } from '../../links/Link/Link.component'
import { Header, HeaderProps } from '../../v2/Header/Header.component'
import { chunk } from 'lodash'
import { SimpleList } from '../../v2/SimpleList/SimpleList.component'

export enum GridLayouts {
    Default = 'Default',
    FullWidth = 'FullWidth',
}

export enum SimpleGridVariants {
    Default = 'Default',
    Offset = 'Offset',
    List = 'List',
}

export interface SimpleGridLayoutProps {
    layout?: GridLayouts
    children?: ReactNode
    variant?: SimpleGridVariants
    columnsXl?: string
    hasHeader?: boolean
}

const SimpleGridOffsetLayout: FC<SimpleGridLayoutProps> = ({
    children,
    variant = SimpleGridVariants.Default,
    columnsXl,
    hasHeader,
}) => {
    const { Animation } = useScrollAnimation({
        lessMovement: true,
    })

    const chunkedPerRow = chunk(
        Children.map(children, (x) => x),
        2
    )
    let counter = 0
    return (
        <s.OffsetLayout.Layout $variant={variant} $hasHeader={hasHeader}>
            {chunkedPerRow.map((row, rowIndex) => {
                return (
                    <s.OffsetLayout.Row key={rowIndex} $row={rowIndex}>
                        {row.map((child, index) => {
                            counter += 1
                            return (
                                <s.OffsetLayout.Item
                                    key={`${rowIndex}-${index}`}
                                    $count={counter}
                                >
                                    <Animation>{child}</Animation>
                                </s.OffsetLayout.Item>
                            )
                        })}
                    </s.OffsetLayout.Row>
                )
            })}
        </s.OffsetLayout.Layout>
    )
}

export const SimpleGridLayout: FC<SimpleGridLayoutProps> = ({
    children,
    variant = SimpleGridVariants.Default,
    columnsXl,
    hasHeader,
}) => {
    return (
        <s.Layout $variant={variant} $hasHeader={hasHeader}>
            <Composition
                templateColsXs={`repeat(1, 1fr)`}
                templateColsMd={`repeat(2, 1fr)`}
                templateColsLg={`repeat(3, 1fr)`}
                {...(columnsXl
                    ? {
                          templateColsXl: `repeat(${columnsXl}, 1fr)`,
                      }
                    : {})}
                gapCol={20}
                gapColMd={40}
                gapColLg={60}
                gapRow={40}
                gapRowMd={60}
                gapRowLg={100}
            >
                {children}
            </Composition>
        </s.Layout>
    )
}

export interface SimpleGridItemProps {
    title?: string
    body?: string | ReactNode
    bodyDocument?: Document
    image?: ImageProps
    multiMediaProps?: MultiMediaProps
    linkProps?: LinkProps
}
const SimpleGridItem: FC<SimpleGridItemProps> = ({
    title,
    body,
    bodyDocument,
    image,
    multiMediaProps,
    linkProps,
}) => {
    const { Animation } = useScrollAnimation({
        lessMovement: true,
    })
    return (
        <s.Item data-cursor-text={title}>
            <ConditionalWrapper
                condition={!!(linkProps && linkProps.href)}
                wrapper={(children) => (
                    <Link {...linkProps} noDecoration>
                        {children}
                    </Link>
                )}
            >
                {image && (
                    <s.Image>
                        <Animation>
                            <Image {...image} />
                        </Animation>
                    </s.Image>
                )}
                {multiMediaProps && <MultiMedia {...multiMediaProps} />}
                {title && (
                    <s.Title>
                        <Animation>{title}</Animation>
                    </s.Title>
                )}
                {(body || bodyDocument) && (
                    <Animation>
                        <s.Body>
                            {/* render rich text if provided, otherwise fall back to body */}
                            {bodyDocument
                                ? contentfulRichTextToReact(bodyDocument)
                                : body}
                        </s.Body>
                    </Animation>
                )}
            </ConditionalWrapper>
        </s.Item>
    )
}
export interface SimpleGridProps extends SimpleGridLayoutProps {
    items: SimpleGridItemProps[]
}
export const SimpleGrid: FC<SimpleGridProps> = ({ items, ...props }) => {
    return (
        <SimpleGridLayout {...props}>
            {items.map((item, i) => (
                <SimpleGridItem {...item} key={i} />
            ))}
        </SimpleGridLayout>
    )
}

const getComponent = (variant: SimpleGridVariants) => {
    switch (variant) {
        case SimpleGridVariants.Offset:
            return SimpleGridOffsetLayout
        default:
            return SimpleGridLayout
    }
}

export interface SimpleGridComposedProps extends SimpleGridProps {
    headerProps?: Partial<HeaderProps>
    columnsXl?: string
    variant?: SimpleGridVariants
    listTitle?: string
}
export const SimpleGridComposed: FC<SimpleGridComposedProps> = ({
    headerProps,
    items,
    listTitle,
    variant,
    ...props
}) => {
    const LayoutComponent = getComponent(variant)

    if (variant === 'List') {
        return (
            <>
                {headerProps && <Header {...headerProps} />}
                <SimpleList
                    title={listTitle}
                    items={items.map((item) => ({
                        text: item.title,
                        href: item.linkProps?.href,
                    }))}
                />
            </>
        )
    }
    return (
        <>
            {headerProps && <Header {...headerProps} />}

            <LayoutComponent {...props} hasHeader={!!headerProps}>
                {items.map((item, i) => (
                    <SimpleGridItem {...item} key={i} />
                ))}
            </LayoutComponent>
        </>
    )
}
