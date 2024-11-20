import styled, { css } from 'styled-components'
import {
    horizontalSpacing,
    media,
    resets,
    typography,
} from '@rightpoint/core/styles'
import { AspectWrapperStyles } from '../../utils/AspectWrapper/AspectWrapper.styles'
import { LinksListStyles } from '../../links/LinksList/LinksList.styles'

const mediaHorizontal = media('lg')
const mediaStacked = media('xs', 'lg')

export const InPageLinkListStyles = {
    InPageLinkList: styled.div`
        gap: 50px;
        display: flex;

        padding-bottom: 75px;

        ${media('lg')} {
            padding-top: 120px;
            padding-bottom: 120px;
        }

        ${mediaStacked} {
            flex-direction: column-reverse;
            gap: 30px;

            padding-bottom: 75px;
        }
    `,
    Left: styled.div`
        flex-basis: 60%;
    `,
    Right: styled.div`
        flex-basis: 40%;

        ${mediaStacked} {
            ${horizontalSpacing.utils.edgeToEdgeCss}
        }
    `,
    Content: styled.div``,
    LinksList: styled.div`
        margin-top: 60px;
        ${LinksListStyles.Links} {
            ${media('lg')} {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                column-gap: 20px;
                ${LinksListStyles.Link} {
                    height: 100%;
                    display: flex;
                    align-items: center;
                }
            }
        }
    `,

    Title: styled.button<{ $active?: boolean }>`
        ${typography.FoundersH600Css}
        ${resets.button}
        display: block;
        color: ${typography.utils.cssVarNames.content.colorTextAlternate};
        opacity: 0.5;
        cursor: pointer;

        ${({ $active }) =>
            $active &&
            css`
                opacity: 1;
                color: ${typography.utils.cssVarNames.content.colorText};
            `};
    `,
    Image: styled.div`
        ${media('lg')} {
            position: absolute;
            top: 0;
            width: 40%;
            right: 0;
            bottom: 0;
        }

        img {
            width: 100%;
            height: 100% !important;
            object-fit: cover;
        }

        // prevent aspect wrapper from enforcing aspect
        // this is a "background-image" like element
        > * {
            height: 100%;
        }
        ${mediaHorizontal} {
            ${AspectWrapperStyles.AspectWrapper} {
                position: static;
            }
        }
        ${mediaStacked} {
            --aspect-wrapper-padding: 56%;
        }
    `,
    Cta: styled.div`
        margin-top: 40px;
    `,
    Body: styled(typography.FoundersB200)`
        margin: 20px 0;
    `,
}
