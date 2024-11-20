import { Box } from 'atomic-layout'
import { FC, ReactNode, useContext, useId, useState } from 'react'
import { CSSProperties } from 'styled-components'
import { ConditionalWrapper } from '@rightpoint/core/utils'
import { dataAttributes } from '@rightpoint/core/variables'
import {
    BackgroundColorData,
    BackgroundColors,
    getBackgroundColorDataAttributes,
    getBackgroundColorStyleVars,
} from './background-color'
import { ContainerWidths, getContainerStyledComponent } from './container'
import { getMarginBetweenComponents } from './margin-between-components'
import { RootComponentContext } from './RootComponent.context'
import { BackgroundMedia } from '../BackgroundMedia/BackgroundMedia.component'

interface RootComponentProps {
    background?: BackgroundColorData
    noMargins?: boolean
    noPadding?: boolean
    styles?: CSSProperties
    container?: ContainerWidths | boolean
    edgeToEdge?: boolean
    a11y?: {
        label?: string
    }
    tag?: string
    children?: ReactNode

    noRootComponent?: boolean
}

/**
 * Check if the background props are empty, or
 * effectively empty (transparent, or None, etc.)
 */
const checkIfBackground = (background: BackgroundColorData) => {
    if (!background) {
        return false
    }

    // has background media
    if (background.media?.multiMediaProps) {
        return true
    }

    // has a background color that is not None
    const isNone = background.backgroundColor === BackgroundColors.None
    if (!isNone && background.backgroundColor) {
        return true
    }

    return false
}

/**
 * This component is always the root of all components.
 *
 * It determines vertical and horizontal spacing between components.
 *
 * Use cases:
 * - Component has a background, and should not have margin if stacked next to another component with a background.
 * - Component is first/last, and should not have extra margin
 * - Component should have a container / max width.
 */
const RootComponent: FC<RootComponentProps> = ({
    children,
    background = {},
    noMargins,
    noPadding,
    styles = {},
    edgeToEdge,
    container,
    a11y = {},
    tag,
    noRootComponent,
}) => {
    const { isFirst, isLast, removeFirstLastSpacing } =
        useContext(RootComponentContext)

    const hasBackground = checkIfBackground(background)

    /**
     * TODO: this needs to be moved into a styled component for mobile spacing
     */
    const internalPadding = noPadding
        ? {}
        : {
              paddingTop: hasBackground ? 150 : 0,
              paddingBottom: hasBackground ? 150 : 0,
          }

    const ContainerStyled = getContainerStyledComponent(container)

    const hasBackgroundMedia = background?.media?.multiMediaProps
    const id = useId() // remember to use CSS.escape(id) if using in querySelector

    return (
        /**
         * @deprecated - Standardize CSS/styling and maintain consistency without atomic-layout.
         *
         * One reason is that atomic-layout custom breakpoints are non trivial to resolve and match
         * the styled-components custom breakpoints.
         */
        <Box
            as={tag || 'section'}
            /**
             * Set an ID for anchor navigation
             */
            id={'s-' + id}
            aria-label={a11y.label}
            /**
             * Set the margins between components.
             * Affected by: position, background
             *
             * TODO: mobile margins;
             * Can we convert margins to styled components?
             * We will have hydration issues with style/js-media
             */
            {...getMarginBetweenComponents({
                isFirst,
                isLast,
                removeFirstLastSpacing,
                hasBackground,
                noMargins,
            })}
            /**
             * Set the internal spacing inside components.
             * Affected by: background
             */
            {...internalPadding}
            style={{
                /**
                 * Background related color vars
                 */
                ...getBackgroundColorStyleVars(background),

                ...(edgeToEdge
                    ? {
                          width: '100vw',
                          marginLeft: 'calc(50% - 50vw)',
                      }
                    : {}),

                position: 'relative',

                // to be below other components in flow and no z-index
                // critical to allow -1 indexed background media
                zIndex: 0,

                ...styles,
            }}
            /**
             * Set content/background attributes
             */
            /**
             * Identify root component
             * Used for text scrolling parent match
             */
            {...getBackgroundColorDataAttributes(background)}
            {...{
                [dataAttributes.root.attribute]: '',
            }}
        >
            {/* Background media */}
            {hasBackgroundMedia && (
                <BackgroundMedia
                    {...background.media}
                    contentColor={background.contentColor}
                />
            )}
            <ConditionalWrapper
                condition={!!ContainerStyled}
                wrapper={(children) => (
                    <ContainerStyled data-hint={container}>
                        {children}
                    </ContainerStyled>
                )}
            >
                {children}
            </ConditionalWrapper>
        </Box>
    )
}

export interface RootComponentWrapperProps extends RootComponentProps {
    index?: number
    totalCount?: number
    removeFirstLastSpacing?: boolean
}
/**
 * The root component represents the root of each component rendered.
 *
 * It is responsible for:
 * - Between-component spacing
 * - IDs/anchor navigation
 * - Backgrounds
 */
export const RootComponentWrapper: FC<RootComponentWrapperProps> = ({
    index = 0,
    totalCount = 0,
    removeFirstLastSpacing = false,

    // base props
    children,
    container,
    background,
    noMargins,
    noPadding,
    edgeToEdge,
    styles = {},
    a11y = {},
    tag,
    noRootComponent,
}) => {
    /**
     * @deprecated we are no longer using much of this context
     * refactor to simply pass down the props directly to chlid
     */
    const [ctx, _] = useState({
        index: index,
        totalCount: totalCount,
        isFirst: index === 0,
        isLast: index === totalCount - 1,
        removeFirstLastSpacing,
    })

    /**
     * Bypass Root component.
     *
     * Currently used by a ComponentGroup component which itself outputs root components
     * and flattens the output.
     *
     * Example:
     * [Component, (ComponentGroup)[Component, Component]] effectively output [Component, Component, Component]
     *
     * Without this behavior, the margin calculations between components will fail.
     *
     */
    if (noRootComponent) {
        return <>{children}</>
    }

    return (
        <RootComponentContext.Provider value={ctx as any}>
            <RootComponent
                background={background}
                noMargins={noMargins}
                styles={styles}
                container={container}
                edgeToEdge={edgeToEdge}
                noPadding={noPadding}
                a11y={a11y}
                tag={tag}
            >
                {children}
            </RootComponent>
        </RootComponentContext.Provider>
    )
}
