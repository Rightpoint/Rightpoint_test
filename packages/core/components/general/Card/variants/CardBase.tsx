import { Box } from 'atomic-layout'
import { ComponentType, FC, ReactElement } from 'react'
import { useScrollAnimation } from '../../Animation/Animation.component'
import { Link, LinkProps } from '../../Link/Link.component'
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
}

export const CardBase: FC<CardBaseProps> = ({
    children,
    title,
    linkProps,
    as = 'article',
}) => {
    return (
        <Link
            {...linkProps}
            anchorProps={{
                'aria-label': title,
            }}
            noDecoration
        >
            <s.Card data-cursor-text={title} as={as}>
                {children}
            </s.Card>
        </Link>
    )
}

export interface CardMediaProps extends CardTagsProps {
    multiMediaProps?: MultiMediaProps
}

export const CardMedia: FC<CardMediaProps> = ({
    multiMediaProps,
    tagsProps,
}) => {
    const { Animation } = useScrollAnimation({
        isImage: true,
    })
    return (
        <s.CardMedia>
            <Animation>
                {multiMediaProps && (
                    <MultiMedia
                        {...multiMediaProps}
                        // aspectWrapperRatio={16 / 9} // old site: cards were landscape on mobile
                    />
                )}
                {/* {tagsProps && tagsProps.length > 0 && (
                    <CardTags tagsProps={tagsProps} />
                )} */}
            </Animation>
        </s.CardMedia>
    )
}

export const CardContentBox = ({ children }) => {
    const { Animation } = useScrollAnimation({
        lessMovement: true,
        isText: true,
    })
    return (
        <Box paddingRightXs={'5%'} paddingRightLg={'20%'} as={s.CardContent}>
            <Animation>{children}</Animation>
        </Box>
    )
}
