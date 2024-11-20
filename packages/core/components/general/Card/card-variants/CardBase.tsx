import { Box } from 'atomic-layout'
import { ComponentType, FC, ReactElement, ReactNode } from 'react'
import { useScrollAnimation } from '../../Animation/Animation.component'
import { Link, LinkProps } from '../../../links/Link/Link.component'
import {
    MultiMedia,
    MultiMediaProps,
} from '../../MultiMedia/MultiMedia.component'
import { CardStyles as s } from '../Card.styles'
import { CardTagsProps, CardTags } from './CardTags'

type CardBaseProps = {
    title: string
    linkProps: LinkProps
    // allow merging other styles to control child
    as?: string | ComponentType<any>
    children?: ReactNode
}

export const CardBase: FC<CardBaseProps> = ({
    children,
    title,
    linkProps,
    as = 'article',
}) => {
    if (linkProps) {
        return (
            <Link {...linkProps} noDecoration data-cursor-text={title}>
                <s.Card data-cursor-text={linkProps.text} as={as}>
                    {children}
                </s.Card>
            </Link>
        )
    }
    return <s.Card as={as}>{children}</s.Card>
}

export interface CardMediaProps extends CardTagsProps {
    multiMediaProps?: MultiMediaProps
    aspectRatio?: number
}

export const CardMedia: FC<CardMediaProps> = ({
    multiMediaProps,
    tagsProps,
    aspectRatio,
}) => {
    // const { Animation } = useScrollAnimation({
    //    isImage: true,
    // })
    return (
        <s.CardMedia>
            {multiMediaProps && (
                <MultiMedia
                    {...multiMediaProps}
                    aspectWrapperRatio={
                        // aspect ratio defaults to 8/10 but can be specifically null to remove the aspect ratio wrapper
                        aspectRatio === undefined ? 8 / 10 : aspectRatio
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
