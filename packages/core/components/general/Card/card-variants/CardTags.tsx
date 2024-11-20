import { FC } from 'react'
import { ConditionalWrapper } from '@rightpoint/core/utils'
import { Link, LinkProps } from '../../../links/Link/Link.component'
import { CardStyles as s } from '../Card.styles'
import { isEmpty } from 'lodash'

/**
 * Card base components that may be shared by child cards.
 *
 * @deprecated by new designs
 * card tags are a common sense feature for re-introduction; maintain.
 */
export interface CardTagProps {
    text: string
    color?: string
    backgroundColor?: string
    linkProps?: LinkProps
}
/**
 * @deprecated by new designs
 * card tags are a common sense feature for re-introduction; maintain.
 */
export const CardTag: FC<CardTagProps> = ({
    text,
    color,
    backgroundColor,
    linkProps,
}) => {
    return (
        <ConditionalWrapper
            condition={!isEmpty(linkProps)}
            wrapper={(children) => <Link {...linkProps}>{children}</Link>}
        >
            <s.CardTag
                style={{
                    background: backgroundColor,
                    color: color,
                }}
            >
                {text}
            </s.CardTag>
        </ConditionalWrapper>
    )
}

/**
 * @deprecated by new designs
 * card tags are a common sense feature for re-introduction; maintain.
 */
export interface CardTagsProps {
    tagsProps: CardTagProps[]
}
/**
 * @deprecated by new designs
 * card tags are a common sense feature for re-introduction; maintain.
 */
export const CardTags: FC<CardTagsProps> = ({ tagsProps }) => (
    <s.CardTags>
        {tagsProps.map((tagProps, i) => (
            <CardTag {...tagProps} key={i} />
        ))}
    </s.CardTags>
)
