import { FC, useContext } from 'react'
import { icons } from '@rightpoint/core/styles'
import { NavbarPopupFooterStyles as s } from './NavbarPopupFooter.styles'
import { NavbarPopupContext } from '../NavbarPopup.context'
import Link, { LinkProps as LinkPropsNext } from 'next/link'
import { Composition } from 'atomic-layout'

interface ClockProps {
    location: string
    timezone: string
}
const Clock: FC<ClockProps> = ({ location, timezone }) => {
    const formattedTime = `9:39AM`
    return (
        // TODO: link to the chicago HQ
        // <Link href="" passHref>
        <s.FooterLink as="a">Chicago HQ {formattedTime}</s.FooterLink>
        // </Link>
    )
}

export type NavbarFooterLinkProps = LinkPropsNext & {
    text: string
}
interface FooterLinkProps extends NavbarFooterLinkProps {}
const FooterLink: FC<FooterLinkProps> = ({ text, href }) => {
    return (
        <Link href={href} passHref target="_blank" legacyBehavior>
            <s.FooterLink>{text}</s.FooterLink>
        </Link>
    )
}

export interface NavbarPopupFooterProps {
    // stories can pass links as props, but usually comes from context
    links?: NavbarFooterLinkProps[]
}

export const NavbarPopupFooter: FC<NavbarPopupFooterProps> = () => {
    const areas = `
      logo links clock
      / auto 1fr 1fr
    `
    // const context = useContext(NavbarPopupContext)
    const links: FooterLinkProps[] = [
        {
            text: 'Facebook',
            href: 'http://www.facebook.com/pages/Rightpoint/152725551865',
        },
        { text: 'Instagram', href: 'https://www.instagram.com/therightpoint/' },
        {
            text: 'LinkedIn',
            href: 'https://www.linkedin.com/company/rightpoint',
        },
        {
            text: 'Twitter',
            href: 'http://twitter.com/rightpoint',
        },
        {
            text: 'Examples Page',
            href: '/examples',
            onClick: (ev) => {},
        },
    ]

    return (
        <s.NavbarPopupFooter>
            <Composition template={areas}>
                {(areas) => (
                    <>
                        <areas.Logo>
                            <s.LogoMark>
                                <icons.LogoMark />
                            </s.LogoMark>
                        </areas.Logo>
                        <areas.Links
                            align="flex-end"
                            style={{ whiteSpace: 'nowrap' }}
                        >
                            {links.map(FooterLink)}
                        </areas.Links>
                        <areas.Clock place="flex-end">
                            <Clock location="" timezone="" />
                        </areas.Clock>
                    </>
                )}
            </Composition>
        </s.NavbarPopupFooter>
    )
}
