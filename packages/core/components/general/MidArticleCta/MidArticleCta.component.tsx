import { useResponsiveQuery } from 'atomic-layout'
import { FC, ReactNode } from 'react'
import { useScrollAnimation } from '../Animation/Animation.component'
import { Link, LinkProps } from '../../links/Link/Link.component'
import { MultiMedia, MultiMediaProps } from '../MultiMedia/MultiMedia.component'
import { MidArticleCtaStyles as s } from './MidArticleCta.styles'

export interface MidArticleCtaProps {
    title: string
    titleMobile?: string
    subtitle?: ReactNode
    multiMediaProps?: MultiMediaProps
    linkProps?: LinkProps
}

export const MidArticleCta: FC<MidArticleCtaProps> = ({
    title,
    titleMobile,
    subtitle,
    multiMediaProps,
    linkProps,
}) => {
    const isMobile = useResponsiveQuery({ from: 'xs', to: 'md' })
    const { Animation } = useScrollAnimation()
    return (
        <s.MidArticleCta>
            <Animation>
                {/* if there's mobile text, hide desktop */}
                <s.Title as={'h2'}>
                    {isMobile && titleMobile ? titleMobile : title}
                </s.Title>
                {multiMediaProps && (
                    <s.Media>
                        <MultiMedia {...multiMediaProps} />
                    </s.Media>
                )}
                {/* subtitle is rich text, can contain pardot form or other */}
                <s.Subtitle>{subtitle}</s.Subtitle>

                {linkProps?.href && <Link {...linkProps} />}
            </Animation>
        </s.MidArticleCta>
    )
}
