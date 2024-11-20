import { FC, ReactChildren, ReactNode } from 'react'
import { Box, Composition } from 'atomic-layout'
import {
    GridLayouts,
    GridItemVariants,
    SimpleGridStyles as s,
} from './SimpleGrid.styles'
import { Image, ImageProps } from '../Image/Image.component'
import { Hero, HeroProps } from '../Hero/Hero.component'
import { MultiMedia, MultiMediaProps } from '../MultiMedia/MultiMedia.component'
import { useScrollAnimation } from '../Animation/Animation.component'
import { contentfulRichTextToReact } from '../RichText/contentful-rich-text-to-react'
import { Document } from '@contentful/rich-text-types'
import { ConditionalWrapper } from '@rightpoint/core/utils'
import { Link, LinkProps } from '../Link/Link.component'
export interface SimpleGridLayoutProps {
    layout?: GridLayouts
    children?: ReactNode
    alignment?: 'left' | 'center' | 'right'
    variant?: GridItemVariants
    columnsXl?: string
    hasHero?: boolean
}

export const SimpleGridLayout: FC<SimpleGridLayoutProps> = ({
    children,
    alignment,
    variant = GridItemVariants.Default,
    columnsXl,
    hasHero,
}) => {
    return (
        <s.Layout $alignment={alignment} $variant={variant} $hasHero={hasHero}>
            <Composition
                // todo: this is 2 col on logo grid.
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
    body?: string
    bodyRichTextDocument?: Document
    image?: ImageProps
    multiMediaProps?: MultiMediaProps
    linkProps?: LinkProps
}
const SimpleGridItem: FC<SimpleGridItemProps> = ({
    title,
    body,
    bodyRichTextDocument,
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
                    <Link {...linkProps} legacyBehavior>
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
                {(body || bodyRichTextDocument) && (
                    <Animation>
                        <s.Body>
                            {/* render rich text if provided, otherwise fall back to body */}
                            {(bodyRichTextDocument &&
                                contentfulRichTextToReact(
                                    bodyRichTextDocument
                                )) ||
                                body}
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

export interface SimpleGridComposedProps extends SimpleGridProps {
    heroProps?: Partial<HeroProps>
    columnsXl?: string
}
export const SimpleGridComposed: FC<SimpleGridComposedProps> = ({
    heroProps,
    ...props
}) => {
    const hasHero = !!heroProps.title || !!heroProps.subtitle
    return (
        <>
            {hasHero && <Hero {...heroProps} edgeToEdge={true} />}
            {/* if hero, grid needs spacing above */}
            <SimpleGrid {...props} hasHero={hasHero} />
        </>
    )
}
