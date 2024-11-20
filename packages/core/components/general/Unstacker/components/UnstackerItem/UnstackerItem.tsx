import {
    MultiMedia,
    MultiMediaProps,
} from '../../../MultiMedia/MultiMedia.component'
import { ProgressBar } from '../ProgressBar'
import { motion, useTransform } from 'framer-motion'
import { FC, useContext, useEffect } from 'react'
import { Button } from '../../../Button/Button.component'
import { UnstackerItemStyles as s } from './UnstackerItem.styles'
import { UnstackerContext, UnstackerItemContext } from '../../Unstacker.context'
import BezierEasing from 'bezier-easing'
import { Hero } from '../../../Hero/Hero.component'
import { ConditionalWrapper } from '@rightpoint/core/utils'
import { Link, LinkProps } from '../../../Link/Link.component'
import { RootComponentContext } from '../../../../layout/RootComponent/RootComponent.context'
import { contentfulRichTextToReact } from '../../../RichText/contentful-rich-text-to-react'
import { Document } from '@contentful/rich-text-types'

/**
 * Get media width props
 */
type MediaSize = {
    mediaWidth: string
    aspectRatio: number
}

/**
 * Image sizes to properly create a "stack"
 * - Slightly overlap on text
 * - Images should stack/overlap nicely
 * Note: content authors do not want control over this.
 */
const itemSizes = [
    {
        aspectRatio: 810 / 550,
        mediaWidth: '60%',
    },
    {
        aspectRatio: 350 / 480, // portrait
        mediaWidth: '38%',
    },
    {
        aspectRatio: 610 / 300,
        mediaWidth: '75%',
    },
    {
        aspectRatio: 16 / 10,
        mediaWidth: '65%',
    },
]
interface GetMediaSize {
    index: number
}
const getMediaSize = ({ index }: GetMediaSize): MediaSize => {
    const size = itemSizes[index]
    return size || itemSizes[0]
}
export interface UnstackerItemProps {
    title: string
    content: Document
    multiMediaProps: MultiMediaProps
    linkProps?: LinkProps
}
export const UnstackerItem: FC<UnstackerItemProps> = ({
    title,
    content,

    multiMediaProps,
    linkProps,
}) => {
    const { index, itemProgress } = useContext(UnstackerItemContext)
    const { debug, heroTitle } = useContext(UnstackerContext)
    const { isLast, parallax, textOpacity, textTransform } = useItemAnimations()

    const mediaSize = getMediaSize({ index })
    const rootContext = useContext(RootComponentContext)

    const makeId = () => `${rootContext.id}-${index}-title`

    return (
        <s.UnstackerItem
            className={`i-${index}`}
            $hasHero={!!heroTitle}
            as="section"
            aria-labelledby={makeId()}
        >
            {/* 
                The hero very large text appears at the last slide.
            */}
            <ConditionalWrapper
                condition={isLast && !!heroTitle}
                wrapper={(children) => (
                    <Hero title={heroTitle} isAnimated={false}>
                        {children}
                    </Hero>
                )}
            >
                {/* MediaWrapper sets max width and relative context */}
                <s.MediaWrapper>
                    {/* Overflow hider for image parallax effect */}
                    <div
                        style={{
                            overflow: 'hidden',
                        }}
                    >
                        <motion.div
                            style={{
                                width: mediaSize.mediaWidth,
                                margin: '0 auto',
                                translateY: parallax,
                                scale: 1.1,
                            }}
                            data-hint={`Media width/parallax`}
                            data-cursor-text={title}
                        >
                            <MultiMedia
                                {...multiMediaProps}
                                aspectWrapperRatio={mediaSize.aspectRatio}
                                aspectWrapperRatioDesktop={
                                    mediaSize.aspectRatio
                                }
                            />
                        </motion.div>
                    </div>

                    <s.TextWrapper
                        as={motion.div}
                        style={{
                            opacity: textOpacity,
                            transform: textTransform,
                        }}
                    >
                        <s.Title as="h2" id={makeId()}>
                            {title}
                        </s.Title>
                        <s.Body>{contentfulRichTextToReact(content)}</s.Body>
                        {linkProps && (
                            <s.Cta>
                                <Link {...linkProps}>
                                    <Button>{linkProps.text}</Button>
                                </Link>
                            </s.Cta>
                        )}
                    </s.TextWrapper>
                </s.MediaWrapper>
            </ConditionalWrapper>

            {debug && (
                <ProgressBar
                    progress={itemProgress}
                    parentStyles={{
                        position: 'fixed',
                        top: index * 5,
                        height: 2,
                    }}
                    color="blue"
                />
            )}
        </s.UnstackerItem>
    )
}

const useItemAnimations = () => {
    const { itemProgress, itemProgressWithDeadzone, itemCount, index } =
        useContext(UnstackerItemContext)
    const { easings } = useContext(UnstackerContext)

    const isLast = index === itemCount - 1
    const isFirst = index === 0

    const textOpacity = useTransform(
        itemProgress,
        [-1, -0.5, -0.3, 0, 0.5, 0.6, 1],
        [0, 0, 0, 1, 1, 0, 0],
        { clamp: false }
    )

    const textTransform = useTransform(
        itemProgressWithDeadzone,
        [
            -1,
            0,
            // if last item, don't animate
            isLast ? 0 : 0.1,
        ],
        [
            isFirst ? 'translateY(0%)' : 'translateY(-50%)',
            'translateY(0%)',
            isLast ? 'translateY(0%)' : 'translateY(0%)',
        ],
        {
            ease: [
                BezierEasing.apply(null, easings.text1),
                BezierEasing.apply(null, easings.text2),
            ],
        }
    )

    const parallax = useTransform(itemProgress, [-0.2, 1], [-20, 20], {
        // ease: [BezierEasing.apply(null, [0.35, 0.11, 0.68, 0.92])],
    })
    return { isLast, parallax, textOpacity, textTransform }
}
