import { FC, ReactNode, useId } from 'react'
import {
    BackgroundColorData,
    BackgroundColors,
    getBackgroundColorDataAttributes,
    getBackgroundColorStyleVars,
} from './background-color'
import { ContainerWidths, getContainerStyledComponent } from './container'
import { BackgroundMedia } from '../BackgroundMedia/BackgroundMedia.component'
import { RootComponentStyles as s } from './RootComponent.styles'

import { ConditionalWrapper } from '@rightpoint/core/utils'
import { dataAttributes } from '@rightpoint/core/variables'
import type { CSSProperties } from 'styled-components'
import type { MarginSizes } from '@rightpoint/core/styles'

export interface RootComponentProps {
    background?: BackgroundColorData
    styles?: CSSProperties
    container?: ContainerWidths | boolean
    edgeToEdge?: boolean
    a11y?: {
        label?: string
    }
    tag?: string
    children?: ReactNode
    noRootComponent?: boolean

    // list meta
    listMeta?: {
        isFirst?: boolean
        isLast?: boolean
        totalCount?: number
        index?: number
    }

    marginSize?: any | MarginSizes

    noMarginCollapse?: boolean

    noPadding?: boolean
    noMargins?: boolean

    // status
    removeFirstLastSpacing?: boolean

    // remove
    marginTopScale?: number
    marginBottomScale?: number

    noOverflow?: boolean
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

    // explicitly none
    if (isNone) {
        return false
    }

    // has background color
    if (background.backgroundColor) {
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
export const RootComponent: FC<RootComponentProps> = ({
    children,
    background = {},
    styles = {},
    a11y = {},

    edgeToEdge,
    container,

    noRootComponent,

    listMeta: meta = {},

    noMargins,
    noPadding,

    marginSize,

    noMarginCollapse,

    noOverflow,
}) => {
    const id = useId() // remember to use CSS.escape(id) if using in querySelector

    const { isFirst, isLast, totalCount } = meta

    const hasBackground = checkIfBackground(background)

    const ContainerStyled = getContainerStyledComponent(container)

    if (noRootComponent) {
        return <>{children}</>
    }

    return (
        <s.RootComponent
            className={`${isFirst ? 'is-first' : ''} root-component`}
            /**
             * Set: ID
             * Note: these ID require escaping for queries
             */
            id={'s-' + id}
            aria-label={a11y.label}
            /**
             * Opt in to no overflow.
             */
            $noOverflow={noOverflow}
            /**
             * Set: margin
             * Affected by: position, background
             */
            $marginSize={marginSize}
            $addMargin={!noMargins && !hasBackground}
            /**
             * Set: padding
             * Affected by: background
             * - if background, add padding, and no margin.
             * - two background components should overlap.
             */
            $addPadding={!noPadding && !!hasBackground}
            /**
             * Set: data-attributes
             * - identifies root component
             * - used for text scrolling parent match (find closest root, scroll to it.)
             */
            {...getBackgroundColorDataAttributes(background)}
            {...{
                [dataAttributes.root.attribute]: '',
                /**
                 * Set: margin strategy
                 * - no-margin-collapse
                 */
                [dataAttributes.marginStrategy.attribute]:
                    hasBackground && !noMarginCollapse
                        ? // has a background, allow margin collapse
                          ''
                        : // has no background, no margin collapse
                          'no-margin-collapse',
            }}
            data-hint={`${hasBackground} ${noMarginCollapse}`}
            style={{
                /**
                 * Set: CSS vars for background based content
                 */
                ...getBackgroundColorStyleVars(background),

                /**
                 * Force edge to edge
                 */
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
        >
            {/* Background media */}
            {background?.media?.multiMediaProps && (
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
        </s.RootComponent>
    )
}
