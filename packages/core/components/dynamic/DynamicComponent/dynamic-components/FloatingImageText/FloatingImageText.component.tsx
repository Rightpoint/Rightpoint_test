import { Document, BLOCKS } from '@contentful/rich-text-types'
import { Box, Composition } from 'atomic-layout'
import { get } from 'lodash'
import { FC } from 'react'
import {
    Hero,
    HeroContentWidths,
} from '../../../../general/Hero/Hero.component'
import {
    MultiMedia,
    MultiMediaProps,
} from '../../../../general/MultiMedia/MultiMedia.component'
import { contentfulRichTextToReact } from '../../../../general/RichText/contentful-rich-text-to-react'
import { ConditionalWrapper } from '@rightpoint/core/utils'
import { FloatingImages } from './FloatingImages'
import { FloatingImageTextStyles as s } from './FloatingImageText.styles'
import { StatProps, Stats } from './Stats'

export enum FloatingImageVariants {
    Left = 'left',
    Right = 'right',
}

export interface FloatingImageTextProps {
    title: string
    variant: `${FloatingImageVariants}`
    bodyDocument?: Document
    stats?: StatProps[]
    multiMediaProps?: MultiMediaProps
}

const variants: {
    [key in FloatingImageVariants]: string
} = {
    [FloatingImageVariants.Left]: `
        . . . . . . 
        I I I . . . 
        I I I T T T
        I I I T T T
        . . . T T T
    `,
    [FloatingImageVariants.Right]: `
        . . . . . . 
        . . . I I I
        T T T I I I 
        T T T I I I 
        T T T . . . 
    `,
}

const renderRichText = (document) => {
    return contentfulRichTextToReact(document, undefined, {
        renderNode: {
            [BLOCKS.HEADING_2]: (node, children) => {
                return <s.Title as="h2">{children}</s.Title>
            },
        },
    })
}

export const FloatingImageText: FC<FloatingImageTextProps> = ({
    title,
    variant,
    bodyDocument,
    stats,
    multiMediaProps,
}) => {
    return (
        <Composition
            areas="I T"
            template={`
                I
                T
            `}
            templateMd={variants[variant] || variants.left}
            templateColsXs={`1fr`}
            templateColsMd={`repeat(6, 1fr)`}
            gapColMd={40}
            gapColLg={60}
            as={s.FloatingImageText}
        >
            {(areas) => (
                <>
                    <areas.T as={s.TextArea}>
                        <s.Title dangerouslySetInnerHTML={{ __html: title }} />

                        <s.Body>
                            {bodyDocument && renderRichText(bodyDocument)}
                        </s.Body>
                        <Stats stats={stats} />
                    </areas.T>
                    <areas.I>
                        {multiMediaProps && <MultiMedia {...multiMediaProps} />}
                    </areas.I>
                </>
            )}
        </Composition>
    )
}

export type BackgroundProps = {
    color?: string
}
export interface FloatingImageTextComposedProps extends FloatingImageTextProps {
    heroTitle?: string
    multiMediasProps: MultiMediaProps[]
    heroVariant?: string | 'withImage'
    imageVariant?: string | 'rounded'
    backgroundProps?: BackgroundProps
}

/**
 * This is a "one off component", and is powered by a JSON field in Contentful.
 * This component basically bridges together other components to create our one off layout.
 */
export const FloatingImageTextComposed: FC<FloatingImageTextComposedProps> = ({
    multiMediasProps,
    heroVariant,
    imageVariant,
    backgroundProps,
    ...props
}) => {
    multiMediasProps = multiMediasProps || []
    const [
        firstMultiMediaProps,
        secondMultiMediaProps,
        ...thirdAndAboveMultiMediaProps
    ] = multiMediasProps
    const hasHeroImage = heroVariant === 'withImage'

    const isRounded = imageVariant === 'rounded'

    return (
        <ConditionalWrapper
            condition={isRounded}
            wrapper={(children) => (
                <s.RoundedWrapper>{children}</s.RoundedWrapper>
            )}
        >
            <Hero
                title={props.heroTitle}
                edgeToEdge={true}
                titleOverlap={true}
                multiMediaProps={hasHeroImage && firstMultiMediaProps}
                contentWidth={HeroContentWidths.Small}
            />
            {hasHeroImage && <Box height={80} />}
            <FloatingImageText
                {...props}
                multiMediaProps={
                    hasHeroImage ? secondMultiMediaProps : firstMultiMediaProps
                }
            />
            {thirdAndAboveMultiMediaProps.length > 0 && (
                <FloatingImages
                    backgroundProps={backgroundProps}
                    multiMediasProps={
                        hasHeroImage
                            ? // if hero image, we need 3rd+
                              thirdAndAboveMultiMediaProps
                            : // if not hero image, we need 2nd+ images
                              [
                                  secondMultiMediaProps,
                                  ...thirdAndAboveMultiMediaProps,
                              ]
                    }
                />
            )}
        </ConditionalWrapper>
    )
}
