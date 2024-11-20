import styled, { css } from 'styled-components'
import { media, typography } from '@rightpoint/core/styles'

const mediaMobile = media('xs', 'md')

export const ShareStyles = {
    Share: styled.div``,
    ShareItem: styled(typography.FoundersB100).attrs({})`
        &:not(:last-child) {
            border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
        }
        a {
            text-decoration: none;
            display: flex;
            justify-content: space-between;
            padding: 10px 0 8px 0;
            ${mediaMobile} {
                && {
                    justify-content: center;
                    padding: 20px 0;
                    &:first-child {
                        padding-top: 0;
                    }
                    border-bottom: none;
                    font-size: 1.8rem;
                }
            }
        }
    `,
    ShareText: styled.span`
        ${mediaMobile} {
            display: none;
        }
    `,
}
