import { createContext } from 'react'
import type { NavbarFooterLinkProps } from './NavbarPopupFooter/NavbarPopupFooter.component'

export interface NavbarPopupContext {
    // if we need to control child multi media components
    footerProps: {
        links?: NavbarFooterLinkProps[]
    }
}

export const NavbarPopupContext = createContext<NavbarPopupContext>({
    footerProps: {
        links: [],
    },
})
