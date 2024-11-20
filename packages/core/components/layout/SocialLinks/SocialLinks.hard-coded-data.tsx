import { icons } from '@rightpoint/core/styles'
import {
    FaInstagram,
    FaSquareFacebook,
    FaLinkedinIn,
    FaXTwitter,
} from 'react-icons/fa6'

import { SocialLink } from './SocialLinks.component'

/**
 * @deprecated -- don't hard code.
 *
 * Switch to CMS control after intuitive K:V store in place
 */
export const links: SocialLink[] = [
    {
        // icon: icons.Twitter,
        icon: FaXTwitter,
        text: 'Twitter',
        href: 'http://twitter.com/rightpoint',
    },
    {
        // icon: icons.LinkedIn,
        icon: FaLinkedinIn,
        text: 'LinkedIn',
        href: 'https://www.linkedin.com/company/rightpoint',
    },
    {
        // icon: icons.Facebook,
        icon: FaSquareFacebook,
        text: 'Facebook',
        href: 'http://www.facebook.com/pages/Rightpoint/152725551865',
    },
    {
        // icon: icons.Instagram,
        icon: FaInstagram,
        text: 'Instagram',
        href: 'https://www.instagram.com/therightpoint/',
    },
]
