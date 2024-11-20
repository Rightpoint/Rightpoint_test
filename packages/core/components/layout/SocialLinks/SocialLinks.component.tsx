import { FC, useContext } from 'react'
import { SocialLinksStyles as s } from './SocialLinks.styles'
import NextLink from 'next/link'
import { links } from './SocialLinks.hard-coded-data'
import type { SocialIconProps } from '@rightpoint/core/styles/icons/social/SocialIcon'
import type { LinkProps } from '../../links/Link/Link.component'

export type SocialLinksProps = {
    color?: string
}

export type SocialLink = LinkProps & {
    text: string
    icon: React.FC<SocialIconProps>
}
export const SocialLinks: FC<SocialLinksProps> = () => {
    return (
        <s.SocialLinks>
            {links.map(({ href, text, icon: Icon }, i) => (
                <s.SocialLink key={i}>
                    <NextLink href={href} target="_blank">
                        <Icon title={text} />
                    </NextLink>
                </s.SocialLink>
            ))}
        </s.SocialLinks>
    )
}
