import styled, { css } from 'styled-components'
import { typography } from '@rightpoint/core/styles'

const NavbarPopupFooter = styled.div``

const LogoMark = styled.div`
    width: 40px;
    path {
        fill: white;
    }
    margin-right: 10px;
`

const FooterLink = styled(typography.BodySSans).attrs(() => ({
    as: 'a',
    $fontFamily: 'sans',
}))`
    display: inline-block;
    padding: 5px 10px;
    text-decoration: none;
    margin-bottom: -5px;
    color: ${({ theme }) => theme.colors.textGrayOnBlack};
`

const Clock = styled(typography.BodyS)``

export const NavbarPopupFooterStyles = {
    NavbarPopupFooter,
    LogoMark,
    FooterLink,
    Clock,
}
