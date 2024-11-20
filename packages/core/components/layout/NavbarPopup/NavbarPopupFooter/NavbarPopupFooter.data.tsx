import { NavbarPopupFooterProps } from './NavbarPopupFooter.component'

import { makeTypedGeneratorFn } from '@rightpoint/core/utils'
const text = ['Facebook', 'Instagram', 'LinkedIn', 'Twitter']

export const navbarPopupFooterGenerators =
    makeTypedGeneratorFn<NavbarPopupFooterProps>()({
        default: () => ({
            links: text.map((t) => ({
                text: t,
                href: t,
            })),
        }),
    })
