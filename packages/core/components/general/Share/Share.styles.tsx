import styled, { css } from 'styled-components'
import { media, typography } from '@rightpoint/core/styles'

export const ShareStyles = {
    Share: styled.div``,
    ShareItem: styled(typography.FoundersB200).attrs({})`
        &:first-child {
            border-top: 1px solid ${({ theme }) => theme.colors.black};
        }
        border-bottom: 1px solid ${({ theme }) => theme.colors.black};
        a {
            text-decoration: none;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 10px 8px 0;
        }
        svg {
            font-size: 1.3rem;
        }
    `,
    ShareText: styled.span``,
    MobileIcon: styled.span`
        display: none;
        svg {
            font-size: 2rem;
        }
    `,
    DesktopIcon: styled.span`
        display: inline-block;
    `,
}
