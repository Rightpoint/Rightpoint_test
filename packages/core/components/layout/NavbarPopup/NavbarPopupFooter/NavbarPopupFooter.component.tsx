import { FC, useContext } from 'react'
import { NavbarPopupFooterStyles as s } from './NavbarPopupFooter.styles'
import { Composition } from 'atomic-layout'
import {
    SocialLinks,
    SocialLinksProps,
} from '../../SocialLinks/SocialLinks.component'

export interface NavbarPopupFooterProps {
    // stories can pass links as props, but usually comes from context
    links?: SocialLinksProps[]
}

export const NavbarPopupFooter: FC<NavbarPopupFooterProps> = () => {
    const areas = `
      copyright socialLinks
    `

    return (
        <s.NavbarPopupFooter>
            <Composition template={areas}>
                {(areas) => (
                    <>
                        <areas.Copyright as={s.CopyrightText} align="center">
                            © Copyright Rightpoint 2013-2022
                        </areas.Copyright>
                        <areas.SocialLinks
                            align="flex-end"
                            justifyContent="flex-end"
                            style={{
                                whiteSpace: 'nowrap',

                                display: 'flex',
                            }}
                        >
                            <SocialLinks />
                        </areas.SocialLinks>
                    </>
                )}
            </Composition>
        </s.NavbarPopupFooter>
    )
}
