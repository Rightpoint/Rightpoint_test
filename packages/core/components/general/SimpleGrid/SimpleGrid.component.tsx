import { Children, FC, ReactNode } from 'react'
import { Composition } from 'atomic-layout'
import {
    SimpleGridOffsetStyles,
    SimpleGridStyles as s,
} from './SimpleGrid.styles'
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

const SimpleGridOffsetItem = ({ counter, children }) => {
    const { Animation } = useScrollAnimation({
        lessMovement: true,
    })

    return (
        <SimpleGridOffsetStyles.Item $count={counter}>
            <Animation>{children}</Animation>
        </SimpleGridOffsetStyles.Item>
    )
}

export interface SimpleGridLayoutProps {
    layout?: GridLayouts
    children?: ReactNode
    variant?: SimpleGridVariants
    hasHeader?: boolean

    mobileColumns?: number
}

const SimpleGridOffsetLayout: FC<SimpleGridLayoutProps> = ({
    children,
    variant = SimpleGridVariants.Default,
    hasHeader,
}) => {
    const chunkedPerRow = chunk(
        Children.map(children, (x) => x),
        2
    )
    let counter = 0
    return (
        <SimpleGridOffsetStyles.Layout
            $variant={variant}
            $hasHeader={hasHeader}
        >
            {chunkedPerRow.map((row, rowIndex) => {
                return (
                    <SimpleGridOffsetStyles.Row key={rowIndex} $row={rowIndex}>
                        {row.map((child, index) => {
                            counter += 1
                            return (
                                <SimpleGridOffsetItem
                                    counter={counter}
                                    key={`${rowIndex}-${index}`}
                                >
                                    {child}
                                </SimpleGridOffsetItem>
                            )
                        })}
                    </SimpleGridOffsetStyles.Row>
                )
            })}
        </SimpleGridOffsetStyles.Layout>
    )
}

export const SimpleGridLayout: FC<SimpleGridLayoutProps> = ({
    children,
    variant = SimpleGridVariants.Default,
    hasHeader,
    mobileColumns = 1,
}) => {
    return (
        <s.Layout $variant={variant} $hasHeader={hasHeader}>
            <Composition
                templateColsXs={`repeat(${mobileColumns}, 1fr)`}
                templateColsMd={`repeat(2, 1fr)`}
                templateColsLg={`repeat(3, 1fr)`}
                gapCol={20}
                gapColMd={40}
                gapColLg={60}
                gapRow={80}
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
    mobileColumns?: number
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
        <s.Item>
            <ConditionalWrapper
                condition={!!(linkProps && linkProps.href)}
                wrapper={(children) => (
                    <Link
                        {...{
                            ...linkProps,
                            cursor: {
                                text: 'Learn More',
                            },
                        }}
                        noDecoration
                    >
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

                {linkProps?.text && (
                    <s.Cta>
                        {/* no nested <a> but want styling and common Link behavior */}
                        <Link {...linkProps} as="div" />
                    </s.Cta>
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
                {/* here we translate the props to work with a different component because it's similar enough
                content authors should be able to switch between them */}
                <SimpleList
                    title={listTitle}
                    items={items.map((item) => ({
                        linkProps: {
                            href: item.linkProps?.href,
                            text: item.title,
                            ...(item.linkProps ?? {}),
                        },
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
