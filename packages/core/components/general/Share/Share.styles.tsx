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

            transition: 0.2s ease 0s;
        }
        svg {
            transition: 0.2s ease 0s;
            font-size: 1.3rem;
        }
        &:hover {
            a {
                opacity: 0.5;
            }
            svg {
                transform: translateX(5px);
            }
        }
    `,
    ShareText: styled.div``,
}
