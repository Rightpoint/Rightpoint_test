import styled, { css } from 'styled-components'
import { media, resets, typography } from '@rightpoint/core/styles'
import { AspectWrapperStyles } from '../../utils/AspectWrapper/AspectWrapper.styles'
import { LinksListStyles } from '../../links/LinksList/LinksList.styles'

export const InPageLinkListStyles = {
    InPageLinkList: styled.div`
        ${media('lg')} {
            display: flex;
            gap: 50px;
        }
    `,
    Left: styled.div`
        flex-basis: 50%;
    `,
    Right: styled.div`
        flex-basis: 50%;
        position: relative;
    `,
    Content: styled.div``,
    LinksList: styled.div`
        margin-top: 60px;
        ${LinksListStyles.Links} {
            ${media('lg')} {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                column-gap: 20px;
            }
        }
    `,

    Title: styled.button<{ $active?: boolean }>`
        ${typography.FoundersH600Css}
        ${resets.button}
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

        ${AspectWrapperStyles.AspectWrapper} {
            position: static;
        }
    `,
    Cta: styled.div`
        margin-top: 40px;
    `,
    Body: styled(typography.FoundersB200)`
        margin: 20px 0;
    `,
}
