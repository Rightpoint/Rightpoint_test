import { FC } from 'react'
import { useScrollAnimation } from '../Animation/Animation.component'
import { Link, LinkProps } from '../../links/Link/Link.component'
import { QuoteStyles as s } from './Quote.styles'
import { BackgroundColors } from '../../layout/RootComponent/background-color'

export type QuoteVariants = 'default' | 'large' | string
export interface QuoteProps {
    text: string
    name?: string
    eyebrow?: string
    jobTitle?: string
    variant?: QuoteVariants
    linkProps?: LinkProps
}

export const Quote: FC<QuoteProps> = ({
    eyebrow,
    text,
    name,
    jobTitle,
    variant,
    linkProps,
}) => {
    const { Animation } = useScrollAnimation({ lessMovement: true })

    return (
        <Animation>
            <s.Quote>
                {eyebrow && <s.Eyebrow>{eyebrow}</s.Eyebrow>}
                <s.Text $variant={variant}>{text}</s.Text>
                {name && <s.Name> {name}</s.Name>}
                {jobTitle && <s.JobTitle>{jobTitle}</s.JobTitle>}
                {linkProps && (
                    <s.Link>
                        <Link {...linkProps} asStyledLink />
                    </s.Link>
                )}
            </s.Quote>
        </Animation>
    )
}
