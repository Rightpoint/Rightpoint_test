import { NavbarPopupProps } from './NavbarPopup.component'

import { makeTypedGeneratorFn } from '@rightpoint/core/utils'

export const navbarPopupGenerators = makeTypedGeneratorFn<NavbarPopupProps>()({
    default: () => ({}),
})
