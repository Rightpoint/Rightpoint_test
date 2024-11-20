/**
 * This component should only be used when requiring a partial background color.
 *
 * See RootComponent.background for more typical whole-component wrapping of background colors.
 */
import { ForwardRefComponent, motion, useTransform } from 'framer-motion'
import { FC, forwardRef, useEffect, useRef, useState } from 'react'
import { ConditionalWrapper, useInViewScroll } from '@rightpoint/core/utils'
import {
    BackgroundColorDefinition,
    backgroundColorDefinitions,
    BackgroundColors,
    BackgroundColorStyles as s,
} from './BackgroundColor.styles'
import {
    backgroundActions,
    backgroundSelectors,
    useAppSelector,
} from '@rightpoint/core/redux'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from 'atomic-layout'
import { cssVarNames, zIndexes } from '@rightpoint/core/styles'

export enum BackgroundColorTypes {
    Solid = 'Solid',
    Fade = 'Fade',
}

interface UseBackgroundColor {
    ref: React.RefObject<any>
    color: BackgroundColors
}
const useBackgroundColor = ({ ref, color }: UseBackgroundColor) => {
    const { isVisible } = useCalculateViewportProgress(ref)
    const dispatch = useDispatch()

    useEffect(() => {
        if (isVisible) {
            dispatch(
                backgroundActions.set({
                    color,
                })
            )
        } else {
            dispatch(backgroundActions.clear())
        }
    }, [isVisible, color, dispatch])

    return {
        isVisible,
    }
}

const BackgroundBox: FC<any> = ({ children, ...props }) => (
    <Box
        paddingVertical={90}
        paddingVerticalMd={150}
        paddingVerticalLg={170}
        paddingVerticalXl={200}
        {...props}
    >
        {children}
    </Box>
)

const getDefinition = (color: BackgroundColors): BackgroundColorDefinition =>
    backgroundColorDefinitions[color] ||
    backgroundColorDefinitions[BackgroundColors.None]

/**
 * Setting these via styled components causes a mystery render/cache issue.
 *
 * Set via raw React.
 */
const BackgroundColorCssVarFix: ForwardRefComponent<HTMLDivElement, any> =
    forwardRef(
        (
            {
                color,
                children,
                setVarsOnly = false,
                style = {},
                halfPosition = false,
            },
            ref
        ) => {
            const vars = cssVarNames.content
            const definition = getDefinition(color)
            const backgroundColorCss = definition.backgroundColorCss
            const hasBackground = backgroundColorCss !== 'transparent'
            if (halfPosition === 'solid') {
                halfPosition = false
            }
            return (
                <div
                    ref={ref}
                    style={{
                        background:
                            !halfPosition && !setVarsOnly && backgroundColorCss,
                        // set vars
                        [vars.background]: definition.backgroundColorCss,
                        [vars.colorText]: definition.text,
                        [vars.colorTextAlternate]:
                            definition.textAlternateColor,
                        [vars.colorAccent]: definition.accentColor,
                        [vars.colorDivider]: definition.dividerColor,

                        zIndex: zIndexes.backgroundColorContent,
                        position: 'relative',
                        ...style,
                    }}
                    data-background-vars
                >
                    {halfPosition && (
                        <s.Half data-hint="half" $direction={halfPosition} />
                    )}

                    {children}
                </div>
            )
        }
    )

BackgroundColorCssVarFix.displayName = 'BackgroundColorCssVarFix'

interface BackgroundColorXProps {
    color?: BackgroundColors
    removeBox?: boolean
    half?: boolean
    halfPosition?: 'top' | 'bottom' | 'solid'
}
/**
 * Background color solid
 */
const BackgroundColorSolid: FC<BackgroundColorXProps> = ({
    color,
    children,
    removeBox,
    half,
    halfPosition,
}) => {
    return (
        <BackgroundColorCssVarFix
            color={color}
            half={half}
            halfPosition={halfPosition}
        >
            <ConditionalWrapper
                condition={!removeBox}
                wrapper={(children) => (
                    <BackgroundBox>{children}</BackgroundBox>
                )}
            >
                {children}
            </ConditionalWrapper>
        </BackgroundColorCssVarFix>
    )
}

/**
 * Background color fade in on viewport
 */
const BackgroundColorFade: FC<BackgroundColorXProps> = ({
    color,
    children,
}) => {
    const ref = useRef()

    const { isVisible } = useBackgroundColor({
        ref,
        color,
    })

    const backgroundColorFromState = useSelector(
        backgroundSelectors.backgroundColor
    ) as BackgroundColors

    return (
        <>
            <s.Occluder $backgroundColor={backgroundColorFromState} />
            <BackgroundColorCssVarFix
                color={color}
                setVarsOnly={true}
                ref={ref}
                style={{
                    zIndex: isVisible ? 8 : 6,
                    position: 'relative',
                }}
            >
                <BackgroundBox>{children}</BackgroundBox>
            </BackgroundColorCssVarFix>
        </>
    )
}

/**
 * @deprecated no longer required due to V2 designs
 *
 * Use RootComponent/background-colors instead.
 *
 * getContentColorStyles() returns CSS variables for text based on
 * background colors or explicitly passed content colors
 */
export interface BackgroundColorProps {
    color?: BackgroundColors | any
    type?: BackgroundColorTypes
    half?: boolean
    halfPosition?: 'top' | 'bottom' | 'solid'
    removeBox?: boolean
}
export const BackgroundColor: FC<BackgroundColorProps> = ({
    type,
    ...props
}) => {
    /**
     * Ignore background components if there is no background color.
     * This component may wrap many components that optionally use background.
     */
    if (props.color === BackgroundColors.None || !props.color) {
        return <>{props.children}</>
    }

    switch (type) {
        case BackgroundColorTypes.Fade: {
            return <BackgroundColorFade {...props} />
        }
        case BackgroundColorTypes.Solid: {
            return <BackgroundColorSolid {...props} />
        }
        default: {
            return <BackgroundColorSolid {...props} />
        }
    }
}

/**
 * Calculate progress within viewport
 * @param ref
 */
const useCalculateViewportProgress = (ref) => {
    const THRESHOLD = 1
    const { progress: baseProgress, scrollY } = useInViewScroll(ref, {
        threshold: THRESHOLD,
    })
    const INPUT_RANGE = [0, 1] // reach 1 earlier so that we can see it stop while in viewport
    const OUTPUT_RANGE = [0, 1]
    const progress = useTransform(baseProgress, INPUT_RANGE, OUTPUT_RANGE)
    const [isVisible, setIsVisible] = useState(false)

    /**
     * TODO: Note, this is a percentage of visibility of the child
     * which means for large children, this initial distance grows.
     *
     * The unit here should actually be pixels that don't scale with child size,
     * or percentage of viewport.
     */
    const START_VISIBLE_PERCENTAGE = 0.1
    const END_VISIBLE = 0.9

    useEffect(() => {
        const handleScroll = (v) => {
            if (v > END_VISIBLE) {
                setIsVisible(false)
            } else if (v > START_VISIBLE_PERCENTAGE) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
            false && console.log(v, baseProgress.get(), scrollY.get())
        }
        const unsubscribe = progress.onChange(handleScroll)
        return () => unsubscribe()
    }, [progress, baseProgress, scrollY])

    return { isVisible }
}
