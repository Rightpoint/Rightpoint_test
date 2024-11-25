import { FC, useRef } from 'react'
import { Card, CardProps } from '../../general/Card/Card.component'
import { Link, LinkProps } from '../../links/Link/Link.component'
import { HeroBannerStyles as s } from './HeroBanner.styles'
import { IconEyebrow } from '../IconEyebrow/IconEyebrow.component'
import type { RootComponentProps } from '../../layout/RootComponent/RootComponent.component'
import { useScrollAnimation } from '../../general/Animation/Animation.component'

export interface HeroBannerProps {
    eyebrow?: string
    title?: string
    subtitle?: string
    ctaProps?: LinkProps
    cardProps?: CardProps

    rootProps?: RootComponentProps
}

export const HeroBanner: FC<HeroBannerProps> = ({
    eyebrow,
    title,
    subtitle,
    ctaProps,
    cardProps,
}) => {
    const { Animation } = useScrollAnimation({
        lessMovement: true,
    })
    return (
        <s.HeroBanner>
            <s.Grid>
                <s.Main>
                    <Animation>
                        <s.Eyebrow>
                            <IconEyebrow text={eyebrow} />
                        </s.Eyebrow>
                        <s.Title>{title}</s.Title>
                        <s.Subtitle>{subtitle}</s.Subtitle>
                    </Animation>
                </s.Main>
                <s.Card>{cardProps && <Card {...cardProps} />}</s.Card>
            </s.Grid>
            {ctaProps && (
                <s.Cta>
                    <Link {...ctaProps} />
                </s.Cta>
            )}
        </s.HeroBanner>
    )
}
