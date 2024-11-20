import Layout from 'atomic-layout'
import { FC } from 'react'
import { Card, CardProps } from '../../general/Card/Card.component'
import { cardGenerators } from '../../general/Card/Card.data'
import { Link, LinkProps } from '../../general/Link/Link.component'
import type { RootComponentProps } from '../../layout/RootComponent/RootComponent.component'
import { HeroBannerStyles as s } from './HeroBanner.styles'

export interface HeroBannerProps {
    eyebrow?: string
    title?: string
    subtitle?: string
    ctaProps?: LinkProps
    cardProps?: CardProps
}

export const HeroBanner: FC<HeroBannerProps> = ({
    eyebrow,
    title,
    subtitle,
    ctaProps,
    cardProps,
}) => {
    return (
        <s.HeroBanner>
            <s.Main>
                <s.Eyebrow>
                    <s.Eyebrow__Icon></s.Eyebrow__Icon>
                    {eyebrow}
                </s.Eyebrow>
                <s.Title>{title}</s.Title>
                <s.Subtitle>{subtitle}</s.Subtitle>
            </s.Main>
            <s.Card>
                <Card {...cardProps} />
            </s.Card>
            {ctaProps && (
                <s.Cta>
                    <Link {...ctaProps} />
                </s.Cta>
            )}
        </s.HeroBanner>
    )
}
