import styled, { css } from 'styled-components'
import {
    cssVarNames,
    cssVarsTypography,
    icons,
    media,
    typography,
} from '@rightpoint/core/styles'
import { colors } from '@rightpoint/core/variables'
import { LinkStyles } from '../Link/Link.styles'

export const LinksListStyles = {
    LinksList: styled.div`
        ${media('xs', 'lg')} {
            margin-top: 50px;
        }
    `,
    LinksHeader: styled.div`
        ${cssVarsTypography.textColor}
        ${typography.FoundersB100Css}
        margin-bottom: .7em;
    `,
    Links: styled.div``,

    Link: styled.div`
        position: relative;

        > * {
            ${cssVarsTypography.textColor}
            display: block;
            min-width: 200px;
            padding: 15px 0;
            padding-right: 40px; // cover the arrow
            break-inside: avoid; // prevent columns from breaking it

            &:before,
            &:after {
                content: '';
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                border-top: 1px solid
                    var(${cssVarNames.content.colorDivider}, ${colors.iron});
            }
            &:after {
                top: auto;
                bottom: 0px;
                transform: translateY(1px);
            }

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
