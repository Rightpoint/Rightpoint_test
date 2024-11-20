import { useResponsiveQuery } from 'atomic-layout'
import { motion, MotionProps } from 'framer-motion'
import { ComponentType, FC, ReactNode, useRef } from 'react'
import { useAspectWrapperContext } from './AspectWrapper.context'
import { AspectWrapperStyles as s } from './AspectWrapper.styles'

export interface AspectWrapperProps {
    aspectWrapperRatio?: number | string
    aspectWrapperRatioDesktop?: number | string
    backgroundFallback?: boolean
    sizerMotionProps?: MotionProps
    renderSizerContent?: () => JSX.Element
    children?: ReactNode
}

/**
 * Support parsing standard 16:9 syntax or math: 16/9
 */
const getAspectNumberFromStringOrNumber = (
    aspectStringOrNumber: string | number
): number => {
    const number = Number(aspectStringOrNumber)
    if (typeof aspectStringOrNumber === 'number') {
        return number
    } else {
        try {
            const str = aspectStringOrNumber
            const splits = str.split(':')
            return Number(splits[0]) / Number(splits[1])
        } catch (ex) {}
    }
}

export const aspectRatioToPadding = (aspectRatio): string =>
    ((1 / aspectRatio) * 100).toFixed(2) + '%'

/**
 * Wraps media and applies an aspect ratio if provided.
 */
export interface AspectSizerProps {
    aspectRatio: number | string
    backgroundFallback?: boolean
    motionProps?: MotionProps
    children?: ReactNode
}
export const AspectSizer: FC<AspectSizerProps> = ({
    aspectRatio,
    backgroundFallback = false,
    motionProps = {},
    children,
}) => {
    const aspectRatioPadding = aspectRatioToPadding(
        getAspectNumberFromStringOrNumber(aspectRatio)
    )
    return (
        <s.Sizer
            $aspectRatioPadding={aspectRatioPadding}
            as={motion.div}
            /**
             * Motion props allow external components to animate the sizer
             */
            {...motionProps}
        >
            {backgroundFallback && <s.Background data-hint="bg" />}
            {children}
        </s.Sizer>
    )
}

export const AspectWrapper: FC<AspectWrapperProps> = ({
    children,
    backgroundFallback,
    aspectWrapperRatio,
    aspectWrapperRatioDesktop,
    sizerMotionProps,
    renderSizerContent,
}) => {
    // this ratio is both responsive, and possibly overridden by context.
    // - if a desktop ratio provided and it's a desktop size, we get the desktop ratio.
    // - if a parent context has overridden the desktop ratio, we get that.
    const responsiveAspectWrapperRatio = useResponsiveContextAspectWrapperRatio(
        aspectWrapperRatio,
        aspectWrapperRatioDesktop
    )
    const hasAspect = Boolean(responsiveAspectWrapperRatio)
    const ref = useRef()
    if (!hasAspect) {
        return <>{children}</>
    }

    return (
        <s.AspectWrapper
            data-hint="aspect"
            cssVars={`
                --background-color: #f5f5f5;
            `}
            ref={ref}
        >
            {/* this element is the sizer: it has a dimension */}
            <AspectSizer
                aspectRatio={responsiveAspectWrapperRatio}
                backgroundFallback={backgroundFallback}
                motionProps={sizerMotionProps}
            >
                {renderSizerContent && renderSizerContent()}
            </AspectSizer>
            <s.Content absoluteChild={true}>{children}</s.Content>
        </s.AspectWrapper>
    )
}

/**
 * These are the props explicitly passed down to the child component
 */
interface WrappedComponentProps {
    // expose the parents aspect ratio to child components for
    // handling as needed e.g. video iframe centering
    parentAspectRatio: number
}
export const withAspectWrapper = <ComponentToWrapProps extends object>(
    ComponentToWrap: ComponentType<
        ComponentToWrapProps & WrappedComponentProps
    >,
    options?: object
): React.FC<ComponentToWrapProps & AspectWrapperProps> => {
    const WrappedComponent = ({
        aspectWrapperRatio,
        aspectWrapperRatioDesktop,
        backgroundFallback,
        sizerMotionProps,
        ...props
    }: AspectWrapperProps) => {
        const aspectWrapperNumber =
            getAspectNumberFromStringOrNumber(aspectWrapperRatio)

        const responsiveAspectWrapperRatio =
            useResponsiveContextAspectWrapperRatio(
                aspectWrapperRatio,
                aspectWrapperRatioDesktop
            )

        if (!aspectWrapperNumber && !responsiveAspectWrapperRatio) {
            // console.log(
            //     'No aspect wrapper and no responsive aspect wrapper ratio'
            // )
            return (
                <ComponentToWrap
                    {...(props as ComponentToWrapProps)}
                    parentAspectRatio={null}
                />
            )
        }
        return (
            // extract specific sizer props and pass to the aspect wrapper
            <AspectWrapper
                aspectWrapperRatio={aspectWrapperNumber}
                aspectWrapperRatioDesktop={aspectWrapperRatioDesktop}
                sizerMotionProps={sizerMotionProps}
                backgroundFallback={backgroundFallback}
            >
                <ComponentToWrap
                    {...(props as ComponentToWrapProps)}
                    parentAspectRatio={responsiveAspectWrapperRatio}
                    sizerMotionProps={sizerMotionProps}
                />
            </AspectWrapper>
        )
    }
    WrappedComponent.displayName = 'withAspectWrapper'
    return WrappedComponent
}

/**
 * Use an aspect ratio that is responsive (desktop vs mobile)
 * but also Context
 */
const useResponsiveContextAspectWrapperRatio = (
    aspectWrapperRatio: string | number,
    aspectWrapperRatioDesktop: string | number
) => {
    const context = useAspectWrapperContext()
    const isDesktop = useResponsiveQuery({ from: 'md' })

    let responsiveAspectWrapperRatio
    /**
     * If there's a aspectWrapperRatio provided by parent context,
     * then it's already responsive. Pull its responsive aspect ratio.
     */
    if (context.aspectWrapperRatio) {
        responsiveAspectWrapperRatio = context.aspectWrapperRatio
    } else {
        /**
         * Get responsive ratio. For now, only desktop.
         */
        responsiveAspectWrapperRatio = aspectWrapperRatio
        if (aspectWrapperRatioDesktop && isDesktop) {
            responsiveAspectWrapperRatio = aspectWrapperRatioDesktop
        }
    }
    return responsiveAspectWrapperRatio
}
