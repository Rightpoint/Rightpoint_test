import styled, { css } from 'styled-components'
import { cssVarsTypography } from '@rightpoint/core/styles'
import { typography } from '@rightpoint/core/styles'
import NextLink from 'next/link'
import { ButtonStyles } from '../../general/Button/Button.styles'

const fragments = {
    hover: css``,
}

const NextLinkStyled = styled(NextLink)<{
    $noDecoration?: boolean
    $styledLink?: boolean
    $noDecorationAddHover?: boolean
    $addDecoration?: boolean
}>`
    ${cssVarsTypography.textColor};

    ${({ $styledLink }) =>
        $styledLink &&
        css`
            ${typography.TextLinkCss}
        `}

    ${({ $noDecoration, $noDecorationAddHover }) =>
        $noDecoration
            ? css`
                  text-decoration: none;

                  ${$noDecorationAddHover &&
                  css`
                      text-decoration: underline;
                      text-decoration-color: transparent;
                      text-underline-offset: 4px;
                      transition: text-decoration-color 0.1s ease-in-out;

                      &:hover {
                          text-decoration-color: var(
                              ${typography.utils.cssVarNames.content.colorText},
                              black
                          );
                      }
                  `}
              `
            : css`
                  text-decoration: underline;
                  text-underline-offset: 4px;

                  transition: 0.2s ease-in-out;
                  &:hover {
                      text-underline-offset: 2px;
                  }
              `}



    ${({ $addDecoration }) =>
        $addDecoration &&
        css`
            text-decoration: underline;
            text-underline-offset: 4px;
            transition: text-decoration-color 0.1s ease-in-out;
            text-decoration-color: var(
                ${typography.utils.cssVarNames.content.colorText},
                black
            );
        `}
`

export const LinkStyles = {
    NextLinkStyled,
    NextLinkButtonStyled: styled(NextLinkStyled)`
        ${ButtonStyles.buttonCss}
    `,
}
