import { Box, Composition } from 'atomic-layout'
import { FC, ReactNode } from 'react'
import { BackgroundColor } from '../BackgroundColor/BackgroundColor.component'
import { BackgroundColors } from '../BackgroundColor/BackgroundColor.styles'
import { HeaderText, HeaderTextProps } from '../HeaderText/HeaderText.component'
import { MultiMedia, MultiMediaProps } from '../MultiMedia/MultiMedia.component'
import { HeaderStyles as s } from './Header.styles'
import { ConditionalWrapper } from '@rightpoint/core/utils'
import { isEmpty } from 'lodash'

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
export interface HeaderProps {
    headerTextProps?: HeaderTextProps
    multiMediaProps?: MultiMediaProps
    // halfBackground?: boolean
    backgroundPosition?: 'top' | 'bottom' | 'solid' | null
    backgroundColor?: BackgroundColors
    renderContentBelow?: () => JSX.Element
    renderMedia?: () => JSX.Element
    body?: ReactNode
    a11y?: {
        label?: string
    }
    as?: any
}

export const Header: FC<HeaderProps> = ({
    headerTextProps,
    multiMediaProps,
    backgroundPosition,
    backgroundColor,
    body,
    renderMedia,
    renderContentBelow,
    a11y = {},
    as = 'div',
}) => {
    const hasContent = !!(body || renderContentBelow)
    return (
        <s.Header aria-label={a11y.label} as={as}>
            {/* Header content, e.g. page title */}
            <ConditionalWrapper
                condition={['top', 'solid'].includes(backgroundPosition)}
                wrapper={(children) => (
                    <BackgroundColor color={backgroundColor} removeBox={true}>
                        {children}
                    </BackgroundColor>
                )}
            >
                <Box
                    paddingTopLg={230}
                    paddingTop={200}
                    paddingBottom={0}
                    paddingBottomLg={0}
                >
                    {headerTextProps && (
                        <s.Text>
                            <HeaderText {...headerTextProps} />
                        </s.Text>
                    )}
                </Box>
            </ConditionalWrapper>

            {/* Main content, e.g. media or hero+media */}
            <ConditionalWrapper
                condition={['solid', 'top', 'bottom'].includes(
                    backgroundPosition
                )}
                wrapper={(children) => {
                    return (
                        <BackgroundColor
                            color={backgroundColor}
                            removeBox={true}
                            halfPosition={backgroundPosition}
                        >
                            {children}
                        </BackgroundColor>
                    )
                }}
            >
                {renderMedia && renderMedia()}
                {!renderMedia && !isEmpty(multiMediaProps) && (
                    <HeaderMediaWithAspect multiMediaProps={multiMediaProps} />
                )}
            </ConditionalWrapper>

            {/* Content below e.g. large text, intro copy */}
            {hasContent && (
                <ConditionalWrapper
                    condition={['solid', 'bottom'].includes(backgroundPosition)}
                    wrapper={(children) => (
                        <BackgroundColor
                            color={backgroundColor}
                            removeBox={true}
                        >
                            {children}
                        </BackgroundColor>
                    )}
                >
                    {/* 
                        this content below can be arbitrary.
                    */}
                    <HeaderContentLarge>
                        {body} {renderContentBelow && renderContentBelow()}
                    </HeaderContentLarge>
                </ConditionalWrapper>
            )}
        </s.Header>
    )
}

const HeaderContentLarge = ({ children }) => {
    return <s.ContentLarge>{children}</s.ContentLarge>
}

/**
 * Refactor: this component is getting messy.
 * - There is a background color layout layer
 * - Title layer
 * - Media content layer, which has a media or hero+media child
 * - Below content layer, which has arbitrary children
 */
