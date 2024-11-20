import { motion, useTransform, useScroll } from 'framer-motion'
import {
    ComponentType,
    FC,
    ReactNode,
    useEffect,
    useRef,
    useState,
} from 'react'
import { ConditionalWrapper, useWindowDimensions } from '@rightpoint/core/utils'
import { useScrollAnimation } from '../Animation/Animation.component'
import { HeroStyles as s } from './Hero.styles'
import bezier from 'bezier-easing'
import { useBezierEditorContextDefaults } from '../../utils/BezierEditor/BezierEditor.component'
import { ImageProps } from '../Image/Image.component'
import { MultiMedia, MultiMediaProps } from '../MultiMedia/MultiMedia.component'
import { Link, LinkProps } from '../Link/Link.component'
import { useResponsiveQuery } from 'atomic-layout'
import { Document } from '@contentful/rich-text-types'
import { contentfulRichTextToReact } from '../RichText/contentful-rich-text-to-react'
import { Button } from '../Button/Button.component'

export const HeroContentWidths = {
    FullBleed: 'FullBleed',
    FullWidth: 'FullWidth',
    Large: 'Large',
    Medium: 'Medium',
    Small: 'Small',
} as const

export interface HeroProps {
    title?: string
    subtitle?: string | ReactNode
    multiMediaProps?: MultiMediaProps

    linkProps?: LinkProps

    // arbitrary components
    contentComponent?: JSX.Element | ReactNode | ComponentType
    contentComponentContentTypeId?: string
    contentProps?: Record<string, any>

    contentWidth?: keyof typeof HeroContentWidths

    isAnimated?: boolean
    titleOverlap?: boolean
    titleSticky?: boolean
    Title?: ComponentType<any>

    edgeToEdge?: boolean

    content?: Document
    ctaButtonText?: string
    children?: ReactNode
}

/**
 * Hero scroll based behavior
 */
const useHeroScrollStyles = (ref) => {
    const { scrollY } = useScroll()
    const { height: windowHeight } = useWindowDimensions()
    const [range, setRange] = useState([0, 0])
    useEffect(() => {
        const ENTER_START_OFFSET = 200
        const ENTER_DISTANCE = 200
        // we have the ref
        if (ref.current && windowHeight) {
            const rect = ref.current.getBoundingClientRect()
            // Start position is when element top reaches viewport bottom
            const elAbsoluteOffsetTop = window.scrollY + rect.top
            const start =
                elAbsoluteOffsetTop - windowHeight + ENTER_START_OFFSET
            // End position is when element bottom reaches viewport top
            const end = start + ENTER_DISTANCE
            const isAboveFold = start < windowHeight

            if (isAboveFold) {
                /**
                 * Note: this fails when hero is too high up.
                 *
                 * Start should be what?
                 * End should be ?
                 *  Animation ending == reaching translate 0. Therefore, animation should end earlier
                 */
                setRange([start, start])
            } else {
                setRange([start, end])
            }
        } else {
        }
    }, [ref, windowHeight])
    const progress = useTransform(scrollY, range, [0, 1], {
        clamp: false,
    })
    const progressW = useTransform(progress, [0, 1], ['0%', '100%'], {})

    const { transform: transformBezier } = useBezierEditorContextDefaults({
        transform: [0.06, 0.95, 0.29, 0.97],
    })

    const transform = useTransform(
        progress,
        [0, 1],
        ['translateY(40%)', 'translateY(0%)'],
        { ease: [bezier.apply(null, transformBezier)] }
    )
    const stylesFirst = {
        transform,
        opacity: progress,
    }
    const transform2 = useTransform(
        progress,
        [0.5, 1],
        ['translateY(20%)', 'translateY(0%)']
    )
    const opacity2 = useTransform(progress, [0.5, 1], [0, 1])
    const stylesSecond = {
        transform: transform2,
        opacity: opacity2,
    }
    return { stylesFirst, stylesSecond }
}

export const Hero: FC<HeroProps> = ({
    title,
    subtitle,
    multiMediaProps,
    contentProps,
    contentComponent,
    contentComponentContentTypeId,
    contentWidth,
    isAnimated = true,
    titleOverlap = true,
    titleSticky = false,
    Title,
    children,
    linkProps,
    edgeToEdge,
    content,
    ctaButtonText,
}) => {
    const ContentComponent = contentComponent as ComponentType
    const { Animation } = useScrollAnimation()

    /**
     * Hero scroll based animations
     */
    const ref = useRef<HTMLDivElement>(null)
    const { stylesFirst, stylesSecond } = useHeroScrollStyles(ref)

    /**
     * Disable title sticky on mobile - it looks bad since images are full
     * width consistently and fade in on top
     */
    const isMobile = useResponsiveQuery({ to: 'sm' })
    if (isMobile) {
        titleSticky = false
    }

    /**
     * Detect if there is content inside the hero for overlap logic
     */
    const hasContent = !!(
        ContentComponent ||
        multiMediaProps ||
        children ||
        content
    )

    /**
     * Do not overlap if there is a title+subtitle, and we have no content or else they clash
     */
    const shouldNotOverlap = title && subtitle && !hasContent
    const shouldOverlap = !shouldNotOverlap && titleOverlap
    return (
        <s.Hero $contentWidth={contentWidth} $edgeToEdge={edgeToEdge} ref={ref}>
            <ConditionalWrapper
                condition={!!linkProps?.href}
                wrapper={(children) => <Link {...linkProps}>{children}</Link>}
            >
                {title && (
                    <ConditionalWrapper
                        condition={isAnimated}
                        wrapper={(children) => (
                            <Animation
                                renderFallback={({ children }) => (
                                    <motion.div style={stylesFirst}>
                                        {children}
                                    </motion.div>
                                )}
                            >
                                {children}{' '}
                            </Animation>
                        )}
                    >
                        <ConditionalWrapper
                            condition={!!Title}
                            wrapper={(children) => <Title>{children}</Title>}
                        >
                            <s.Title
                                $isStickyPlaceholder={titleSticky}
                                as={'h1'}
                                $overlap={shouldOverlap}
                            >
                                {title}
                            </s.Title>
                        </ConditionalWrapper>
                    </ConditionalWrapper>
                )}

                {titleSticky && (
                    <s.StickyTitlePositioner aria-hidden={true}>
                        <s.StickyTitle
                            as={motion.div}
                            layout="position"
                            style={{}}
                        >
                            <s.Title>{title}</s.Title>
                        </s.StickyTitle>
                    </s.StickyTitlePositioner>
                )}
                {/* 
                    Render content row if:
                    - Content component provided e.g. <Hero contentComponent={<foo/>}/>
                        this was built to allow CMS to render any component as content, but is not as used as initially thought
                        due to the pattern of having other components import Hero themselves.

                        Instead <Hero> with arbitrary children like Hero+Grid, Hero+Image, Hero+Quote, 
                        we generally build an <XComposed> component that imports Hero, wired up to Contentful as needed by that block.
                    - Children provided e.g. <Hero><foo/></Hero>
                    - Media provided
                */}
                {hasContent && (
                    <s.ContentRow>
                        {content && (
                            <s.RichText>
                                {contentfulRichTextToReact(content)}
                            </s.RichText>
                        )}
                        {multiMediaProps && (
                            <MultiMedia
                                {...multiMediaProps}
                                aspectWrapperRatio={16 / 9}
                                aspectWrapperRatioDesktop={16 / 9}
                            />
                        )}
                        {ContentComponent && (
                            <s.ContentComponent
                                $legacyMediaInContent={
                                    contentComponentContentTypeId ===
                                    'multiMedia'
                                }
                            >
                                <ContentComponent {...contentProps} />
                            </s.ContentComponent>
                        )}
                        {children}
                    </s.ContentRow>
                )}
                {subtitle && (
                    <s.Subtitle>
                        <Animation
                            renderFallback={({ children }) => (
                                <motion.div
                                    data-hint="render-fallback"
                                    style={stylesSecond}
                                >
                                    {children}
                                </motion.div>
                            )}
                        >
                            {subtitle}
                        </Animation>
                    </s.Subtitle>
                )}

                {ctaButtonText && (
                    <s.Cta>
                        <Button>{ctaButtonText}</Button>
                    </s.Cta>
                )}
                {/* sticky title landing zone */}
                {titleSticky && <s.Title>&nbsp;</s.Title>}
            </ConditionalWrapper>
        </s.Hero>
    )
}

export interface HeroContentfulProps {
    title?: string
    subtitle?: string
    multiMediaProps?: MultiMediaProps
    imageProps?: ImageProps
    text?: string
    creditProps?: {
        name?: string
        title?: string
        linkProps?: any
    }
}

/**
 * WIP: Hero Variants.
 *
 * To improve content author UX / brittleness, it may make sense to
 * allow variants in the CMS instead of direct access to the component.
 */
export const HeroContentful: FC<HeroContentfulProps> = ({
    title,
    subtitle,
    multiMediaProps,
    imageProps,
    text,
    creditProps,
}) => {
    return <Hero title={title} subtitle={subtitle} />
}
