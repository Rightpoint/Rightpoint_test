import { Box, Composition } from 'atomic-layout'
import { FC, ReactNode, useState } from 'react'
import { MultiMedia, MultiMediaProps } from '../MultiMedia/MultiMedia.component'
import { HeaderStyles as s } from './Header.styles'
import { BackgroundColors } from '../../layout/RootComponent/background-color'
import { HeaderTextProps } from '../HeaderText/HeaderText.component'

export const HeaderMediaWithAspect = ({ multiMediaProps }) => {
    return (
        <s.Media>
            <MultiMedia
                {...multiMediaProps}
                aspectWrapperRatio={4 / 5}
                aspectWrapperRatioDesktop={16 / 9}
            />
        </s.Media>
    )
}

/**
 * @deprecated
 * Maintained to prevent builds breaking, and as breadcrumbs for new header update.
 *
 * The old header component was reused on many pages and had many sub-components
 * with varying functionality (typewriter, people credits, etc.)
 *
 * When the new header is built, refactor the consumers to use the new,
 * simpler header component.
 */
interface OldHeaderTextProps {
    title?: string
    typewriterProps?: any
    ctaProps?: {
        text: string
        href: string
    }
    creditProps?: any
    variant?: any
}

/**
 * @deprecated
 *
 * Maintained to prevent consumers breaking, and as breadcrumbs for new header update.
 */
type OldRenderFn = () => ReactNode
export interface HeaderProps {
    title?: any
    multiMediaProps?: MultiMediaProps

    headerTextProps?: OldHeaderTextProps
    renderContentBelow?: OldRenderFn
    renderMedia?: OldRenderFn

    a11y?: {
        label: string
    }
}

export const Header: FC<HeaderProps> = ({ title, ...rest }) => {
    const [isExpanded, setIsExpanded] = useState(false)
    return (
        <s.Header>
            Obsolete header component.{' '}
            <span onClick={() => setIsExpanded(!isExpanded)}>
                Click to reveal data.
            </span>
            <br />
            {title}
            {isExpanded && (
                <pre style={{ textAlign: 'left' }}>
                    {JSON.stringify(rest, null, 2)}
                </pre>
            )}
        </s.Header>
    )
}
