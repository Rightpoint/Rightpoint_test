import styled, { css } from 'styled-components'
import {
    cssVarsTypography,
    icons,
    media,
    typography,
} from '@rightpoint/core/styles'
import { colors } from '@rightpoint/core/variables'
import { LinkStyles } from '../Link/Link.styles'

export const LinksListStyles = {
    LinksList: styled.div``,

    Links: styled.div`
        ${media('xs', 'lg')} {
            margin-top: 50px;
        }
    `,
    LinksHeader: styled.div`
        ${cssVarsTypography.textColor}
        ${typography.FoundersB100Css}
        margin-bottom: .7em;
    `,

    Link: styled.div`
        position: relative;

        &:not(:last-child) > * {
            border-bottom: none;
        }
        > * {
            ${cssVarsTypography.textColor}
            display: block;
            min-width: 200px;
            padding: 15px 0;
            border-top: 1px solid ${colors.iron};
            border-bottom: 1px solid ${colors.iron};
            text-decoration: none;
            &:hover {
                ${() => css`
                    ${LinksListStyles.Arrow} {
                        transform: translateY(-50%) translateX(10px)
                            rotate(-90deg);
                    }
                `}
            }
        }
    `,
    Arrow: styled(icons.SmallArrow)`
        pointer-events: none;
        position: absolute;
        top: 50%;
        right: 1.6rem;
        transform: translateY(-50%) rotate(-90deg);
        transition: all 0.3s ease 0s;
        ${cssVarsTypography.textAltColor}
    `,
}
