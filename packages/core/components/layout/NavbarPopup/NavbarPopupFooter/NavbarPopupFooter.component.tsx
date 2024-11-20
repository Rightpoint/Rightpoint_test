import { FC, useContext } from 'react'
import { NavbarPopupFooterStyles as s } from './NavbarPopupFooter.styles'
import {
    SocialLinks,
    SocialLinksProps,
} from '../../SocialLinks/SocialLinks.component'

export interface NavbarPopupFooterProps {
    // stories can pass links as props, but usually comes from context
    links?: SocialLinksProps[]
}

export const NavbarPopupFooter: FC<NavbarPopupFooterProps> = () => {
    return (
        <s.NavbarPopupFooter>
            {/* only on mobile */}
            <s.Copyright>
                <s.CopyrightText>
                    © Copyright Rightpoint 2013-{new Date().getFullYear()}
                </s.CopyrightText>
            </s.Copyright>

            <s.SocialLinks>
                <SocialLinks />
            </s.SocialLinks>
        </s.NavbarPopupFooter>
    )
}
