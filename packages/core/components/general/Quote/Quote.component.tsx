import { FC } from 'react'
import { useScrollAnimation } from '../Animation/Animation.component'
import { BackgroundColors } from '../BackgroundColor/BackgroundColor.styles'
import { LinkProps } from '../Link/Link.component'
import { QuoteStyles as s } from './Quote.styles'

export type QuoteVariants = 'default' | 'large' | string
export interface QuoteProps {
    text: string
    name?: string
    jobTitle?: string
    linkProps?: LinkProps
    backgroundColor?: BackgroundColors | 'Inherit' | string
    variant?: QuoteVariants
}

export const Quote: FC<QuoteProps> = ({
    text,
    name,
    jobTitle,
    variant,
    linkProps,
    backgroundColor,
}) => {
    const { Animation } = useScrollAnimation({ lessMovement: true })

    return (
        <Animation>
            <s.Quote $variant={variant}>
                <s.Text>{text}</s.Text>
                {name && <s.Name> {name}</s.Name>}
                {jobTitle && <s.JobTitle>{jobTitle}</s.JobTitle>}
            </s.Quote>
        </Animation>
    )
}
