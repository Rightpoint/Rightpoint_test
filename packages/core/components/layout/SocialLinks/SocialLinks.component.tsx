import { FC, useContext } from 'react'
import { icons } from '@rightpoint/core/styles'
import { SocialIconProps } from '@rightpoint/core/styles/icons/social/SocialIcon'
import { SocialLinksStyles as s } from './SocialLinks.styles'
import { LinkProps } from '../../links/Link/Link.component'

export type SocialLinksProps = {
    css?: any
    className?: string
    style?: any
    color?: string
}

type SocialLink = LinkProps & {
    text: string
    icon: React.FC<SocialIconProps>
}

const links: SocialLink[] = [
    {
        icon: icons.Twitter,
        text: 'Twitter',
        href: 'http://twitter.com/rightpoint',
    },
    {
        icon: icons.LinkedIn,
        text: 'LinkedIn',
        href: 'https://www.linkedin.com/company/rightpoint',
    },
    {
        icon: icons.Facebook,
        text: 'Facebook',
        href: 'http://www.facebook.com/pages/Rightpoint/152725551865',
    },
    {
        icon: icons.Instagram,
        text: 'Instagram',
        href: 'https://www.instagram.com/therightpoint/',
    },
]

export const SocialLinks: FC<SocialLinksProps> = ({ ...props }) => {
    return (
        <s.SocialLinks {...props}>
            {links.map(({ href, text, icon: Icon = 'span' }, i) => (
                <s.SocialLink
                    href={href}
                    passHref
                    target="_blank"
                    legacyBehavior
                    key={i}
                >
                    <Icon title={text} />
                </s.SocialLink>
            ))}
        </s.SocialLinks>
    )
}
