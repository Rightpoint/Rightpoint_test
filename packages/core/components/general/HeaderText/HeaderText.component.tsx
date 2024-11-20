import { FC } from 'react'
import {
    HeaderTypewriter,
    HeaderTypewriterProps,
} from './HeaderTypewriter/HeaderTypewriter.component'
import { HeaderTextStyles as s } from './HeaderText.styles'
import Link from 'next/link'
import { HeaderVariants } from './HeaderText.types'

export interface CreditProps {
    beforeNamesText?: string
    name?: string
    title?: string
    linkProps?: any
}

const Credit: FC<CreditProps> = ({
    name,
    title,
    beforeNamesText,
    linkProps,
}) => {
    return (
        <s.Credit>
            <s.CreditName>
                {beforeNamesText || 'By'} {name}
            </s.CreditName>
            <s.CreditLink>
                <s.CreditTitle>{title}</s.CreditTitle>
            </s.CreditLink>
        </s.Credit>
    )
}

export interface HeaderTextProps {
    title?: string
    typewriterProps?: HeaderTypewriterProps
    ctaProps?: {
        text: string
        href: string
    }
    creditProps?: CreditProps
    variant?: HeaderVariants
}
export const HeaderText: FC<HeaderTextProps> = ({
    title,
    typewriterProps,
    creditProps,
    ctaProps,
    variant,
}) => {
    return (
        <s.Header $variant={variant}>
            <s.TextWrapper>
                <s.Title $creditsMargin={Boolean(creditProps)} as="h1">
                    {typewriterProps && (
                        <HeaderTypewriter {...typewriterProps} />
                    )}
                    {title}
                </s.Title>
            </s.TextWrapper>

            {creditProps && <Credit {...creditProps} />}

            {ctaProps && (
                <Link href={ctaProps.href} passHref legacyBehavior>
                    <s.Cta as="a">{ctaProps.text}</s.Cta>
                </Link>
            )}
        </s.Header>
    )
}
