import styled, { css } from 'styled-components'
import { media, typography } from '@rightpoint/core/styles'

const mediaMobile = media('xs', 'md')

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

            ${mediaMobile} {
                justify-content: center;
                padding-left: 10px;
            }
        }
        svg {
            font-size: 1.3rem;
        }
    `,
    ShareText: styled.span`
        ${mediaMobile} {
            display: none;
        }
    `,
    MobileIcon: styled.span`
        display: none;
        svg {
            font-size: 2rem;
        }
        ${mediaMobile} {
            display: block;
        }
    `,
    DesktopIcon: styled.span`
        display: inline-block;
        ${mediaMobile} {
            display: none;
        }
    `,
}
