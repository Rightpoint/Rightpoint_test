import styled, { css } from 'styled-components'
import { typography } from '@rightpoint/core/styles'

const NavbarPopupFooter = styled.div`
    color: var(--local-text-color);
    margin-top: 9.6rem;
`

const CopyrightText = styled(typography.FoundersB300)`
    line-height: 150%;
`

export const NavbarPopupFooterStyles = {
    NavbarPopupFooter,
    CopyrightText,
}
