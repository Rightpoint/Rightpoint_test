import { cssVarsTypographyValues, typography } from '@rightpoint/core/styles'
import styled from 'styled-components'

export const SocialLinksStyles = {
    SocialLinks: styled.div`
        font-size: 20px;
    `,
    SocialLink: styled.div`
        display: inline-block;
        text-decoration: none;

        &:first-child {
            margin-left: -8px;
        }
        a {
            padding: 6px;
            display: inline-block;

            svg {
                display: block;
            }
        }
    `,
}
