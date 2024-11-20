import styled, { css } from 'styled-components'
import { media, typography } from '@rightpoint/core/styles'

export const NavbarPopupFooterStyles = {
    NavbarPopupFooter: styled.div`
        color: var(--local-text-color);
        margin-top: 9.6rem;

        display: flex;
        justify-content: space-between;

        ${media('xs', 'smallMobile')} {
            flex-direction: column-reverse;
        }
    `,

    SocialLinks: styled.div`
        display: flex;
        white-space: nowrap;

        ${media('md')} {
            align-items: flex-end;
            justify-content: flex-end;
        }
    `,
    Copyright: styled.div`
        display: flex;
        align-items: flex-end;
    `,

    CopyrightText: styled(typography.FoundersB300)`
        line-height: 150%;
    `,
}
