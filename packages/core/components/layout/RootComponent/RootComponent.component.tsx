import { Box } from 'atomic-layout'
import { isEmpty, isNil, omitBy } from 'lodash'
import { FC, ReactNode, useContext, useEffect, useState } from 'react'
import { CSSProperties } from 'styled-components'
import { ConditionalWrapper } from '@rightpoint/core/utils'
import {
    BackgroundColorData,
    getBackgroundColorStyles,
    getContentColorName,
    getContentColorStyles,
} from './background-color'
import {
    Containers,
    ContainerWidths,
    getContainerStyledComponent,
} from './container'
import { getMarginBetweenComponents } from './margin-between-components'
import { RootComponentContext } from './RootComponent.context'

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
interface ComponentRootWrapperProps {
    background?: BackgroundColorData
    noMargins: boolean
    noPadding?: boolean
    styles?: CSSProperties
    container?: ContainerWidths | boolean
    edgeToEdge?: boolean
    a11y?: {
        label?: string
    }
    tag?: string
    children?: ReactNode
}
const ComponentRootWrapper: FC<ComponentRootWrapperProps> = ({
    children,
    background = {},
    noMargins,
    noPadding,
    styles = {},
    edgeToEdge,
    container,
    a11y = {},
    tag,
}) => {
    const { isFirst, isLast, id, removeFirstLastSpacing } =
        useContext(RootComponentContext)

    const bgColorStyles = getBackgroundColorStyles(background)
    const hasBackground = !isEmpty(bgColorStyles)

    /**
     * TODO: this needs to detect explicit white scenario (no padding but background is "white")
     */
    const internalPadding = noPadding
        ? {}
        : {
              paddingTop: hasBackground ? 150 : 0,
              paddingBottom: hasBackground ? 150 : 0,
          }

    const bgContentStyles = getContentColorStyles(background)
    const contentColorName = getContentColorName(background)
    const ContainerStyled = getContainerStyledComponent(container)
    return (
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
                 * Set background color hex, if provided by a components mapEntryToRootProps.
                 */
                ...omitBy(bgColorStyles, isNil), // omit null/undefined values to prevent hydration errors

                /**
                 * Set background-aware content color CSS variables, if provided by a components mapEntryToRootProps or the background color data.
                 * These are consumed by children using `var()` to affect Text, Accent, Link colors.
                 */
                ...omitBy(bgContentStyles, isNil),

                ...(edgeToEdge
                    ? {
                          width: '100vw',
                          marginLeft: 'calc(50% - 50vw)',
                      }
                    : {}),

                ...styles,
            }}
            // used to match scrolling by text
            data-root=""
            data-content-color={contentColorName}
            {...(!isEmpty(bgContentStyles)
                ? {
                      'data-background-vars': '',
                  }
                : {})}
        >
            <ConditionalWrapper
                condition={!!ContainerStyled}
                wrapper={(children) => (
                    <ContainerStyled data-container>{children}</ContainerStyled>
                )}
            >
                {children}
            </ConditionalWrapper>
        </Box>
    )
}

/**
 * Contribute an ID
 */
export const useContributeToId = ({ id, priority }) => {
    const context = useContext(RootComponentContext)
    useEffect(() => {
        context.setComponentContext(({ context, setContext }) => {
            // set the ctx
            setContext({
                ...context,
                ids: [
                    {
                        id,
                        priority,
                    },
                ],
            })
        })
    }, [id, context, priority])
}

export interface RootComponentProps {
    index?: number
    totalCount?: number
    defaultId?: string
    removeFirstLastSpacing?: boolean
    container?: ContainerWidths | boolean
    background?: BackgroundColorData
    noMargins?: boolean
    noPadding?: boolean
    styles?: CSSProperties
    edgeToEdge?: boolean
    a11y?: {
        label?: string
    }
    tag?: string
    children?: ReactNode
}
/**
 * The root component represents the root of each component rendered.
 *
 * It is responsible for:
 * - Between-component spacing
 * - IDs/anchor navigation
 * - Backgrounds
 */
export const RootComponent: FC<RootComponentProps> = ({
    children,
    index = 0,
    totalCount = 0,
    container,
    removeFirstLastSpacing = false,
    background,
    noMargins,
    noPadding,
    edgeToEdge,
    styles = {},
    a11y = {},
    tag,
}) => {
    /**
     * Some data needs to be set in context, so that children can use it.
     * - For example, getting unique ids.
     */
    const [ctx, setCtx] = useState({
        /**
         * Component position can be critical for determining margins near edges
         */
        index: index,
        totalCount: totalCount,
        isFirst: index === 0,
        isLast: index === totalCount - 1,
        removeFirstLastSpacing,

        /**
         * Child components have no context ID duplication, so the root component context
         * contains id data.
         */
        id: `u-${index}`, // TODO: this needs to be replaced with react 18 useId. Currently will fail if multiple render groups used.
        setComponentContext: (fn) => {
            fn({
                context: ctx,
                setContext: setCtx,
            })
        },
    })

    return (
        <RootComponentContext.Provider value={ctx as any}>
            <ComponentRootWrapper
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
            </ComponentRootWrapper>
        </RootComponentContext.Provider>
    )
}
