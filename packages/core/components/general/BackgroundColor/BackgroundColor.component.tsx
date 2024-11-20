/**
 * This component should only be used when requiring a partial background color.
 *
 * See RootComponent.background for more typical whole-component wrapping of background colors.
 */
import { ForwardRefComponent } from 'framer-motion'
import { FC, forwardRef, ReactNode } from 'react'
import {
    BackgroundColorDefinition,
    backgroundColorDefinitions,
    BackgroundColors,
    BackgroundColorStyles as s,
} from './BackgroundColor.styles'
import { cssVarNames, zIndexes } from '@rightpoint/core/styles'

/**
 * @deprecated
 */
export enum BackgroundColorTypes {
    Solid = 'Solid',
    Fade = 'Fade',
}

/**
 * @deprecated
 */
const getDefinition = (color: BackgroundColors): BackgroundColorDefinition =>
    backgroundColorDefinitions[color] ||
    backgroundColorDefinitions[BackgroundColors.None]

/**
 * Setting these via styled components causes a mystery render/cache issue.
 *
 * Set via raw React.
 * @deprecated
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
    children?: ReactNode
}
/**
 * @deprecated
 */
export const BackgroundColor: FC<BackgroundColorProps> = ({
    type,
    ...props
}) => {
    return (
        <>
            Obsolete background component; Replaced by
            RootComponent.background-color
            {props.children}
        </>
    )
}
