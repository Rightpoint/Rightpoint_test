import { motion } from 'framer-motion'
import React from 'react'
import { SocialLinks } from '../../SocialLinks/SocialLinks.component'
import { NavbarPopupContentStyles as s } from './NavbarPopupContent.styles'

interface NavbarPopupContentSocialLinksProps {
    mobileOnly?: boolean
    desktopOnly?: boolean
}

export const NavbarPopupContentSocialLinks: React.FC<
    NavbarPopupContentSocialLinksProps
> = ({ mobileOnly, desktopOnly }) => {
    return (
        <s.SocialLinks
            as={motion.div}
            $mobileOnly={mobileOnly}
            $desktopOnly={desktopOnly}
        >
            <SocialLinks />
        </s.SocialLinks>
    )
}
