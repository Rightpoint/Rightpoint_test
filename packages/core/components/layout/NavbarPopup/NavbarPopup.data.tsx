import { NavbarPopupProps } from './NavbarPopup.component'
import { navbarPopupFooterGenerators } from './NavbarPopupFooter/NavbarPopupFooter.data'

import { makeTypedGeneratorFn } from '@rightpoint/core/utils'

export const navbarPopupGenerators = makeTypedGeneratorFn<NavbarPopupProps>()({
    default: () => ({
        footerProps: navbarPopupFooterGenerators.default(),
    }),
})
