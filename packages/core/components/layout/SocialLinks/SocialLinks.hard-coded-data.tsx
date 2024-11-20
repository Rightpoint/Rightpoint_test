import { icons } from '@rightpoint/core/styles'
import {
    FaFacebook,
    FaFacebookSquare,
    FaInstagram,
    FaLinkedin,
    FaLinkedinIn,
    FaTwitter,
} from 'react-icons/fa'
import { SocialLink } from './SocialLinks.component'

/**
 * @deprecated -- don't hard code.
 *
 * Switch to CMS control after intuitive K:V store in place
 */
export const links: SocialLink[] = [
    {
        // icon: icons.Twitter,
        icon: FaTwitter,
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
        icon: FaFacebookSquare,
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
