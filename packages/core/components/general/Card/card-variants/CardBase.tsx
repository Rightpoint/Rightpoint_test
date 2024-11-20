import { Box } from 'atomic-layout'
import { ComponentType, FC, ReactElement, ReactNode } from 'react'
import { useScrollAnimation } from '../../Animation/Animation.component'
import { Link, type LinkProps } from '../../../links/Link/Link.component'
import {
    MultiMedia,
    type MultiMediaProps,
} from '../../MultiMedia/MultiMedia.component'
import { CardStyles as s } from '../Card.styles'
import { CardTagsProps, CardTags } from './CardTags'
import { dataAttributes } from '@rightpoint/core/variables'

import {
    createCursorControlAttributes,
    CursorControlProps,
} from '../../Cursor/Cursor.component'

type CardBaseProps = {
    title: string
    linkProps?: LinkProps
    cursorProps?: CursorControlProps
    // allow merging other styles to control child
    as?: string | ComponentType<any>
    children?: ReactNode
}

export const CardBase: FC<CardBaseProps> = ({
    children,
    linkProps,
    as = 'article',
}) => {
    if (linkProps) {
        return (
            <Link
                {...linkProps}
                noDecoration
                // cursor control props only used if linkable
                {...createCursorControlAttributes({
                    cursorControlProps: linkProps.cursorProps,
                })}
            >
                <s.Card as={as}>{children}</s.Card>
            </Link>
        )
    }
    return <s.Card as={as}>{children}</s.Card>
}

export interface CardMediaProps extends CardTagsProps {
    multiMediaProps?: MultiMediaProps
    naturalAspect?: boolean
}

export const CardMedia: FC<CardMediaProps> = ({
    multiMediaProps,
    tagsProps,
    naturalAspect,
}) => {
    // Aspect ratio override is only used by CardFullWidth to allow NO aspect ratio (automatic)
    return (
        <s.CardMedia>
            {multiMediaProps && (
                <MultiMedia
                    {...multiMediaProps}
                    aspectWrapperRatio={
                        naturalAspect
                            ? undefined
                            : multiMediaProps.aspectWrapperRatio ?? 8 / 10
                    }
                    aspectWrapperRatioDesktop={
                        // aspect ratio defaults to 8/10 but can be specifically null to remove the aspect ratio wrapper
                        naturalAspect
                            ? undefined
                            : multiMediaProps.aspectWrapperRatioDesktop ??
                              8 / 10
                    }
                />
            )}
            {/* {tagsProps && tagsProps.length > 0 && (
                <CardTags tagsProps={tagsProps} />
            )} */}
        </s.CardMedia>
    )
}

interface CardContentBoxProps {
    children?: ReactNode
}
/**
 * Content box wrapper exists to satisfy design requirements to
 * make mobile content not expand to full width of container
 */
export const CardContentBox: FC<CardContentBoxProps> = ({ children }) => {
    const { Animation } = useScrollAnimation({
        lessMovement: true,
    })
    return (
        <Box paddingRightXs={'8%'} as={s.CardContent}>
            <Animation>{children}</Animation>
        </Box>
    )
}
