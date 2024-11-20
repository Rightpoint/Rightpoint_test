import styled, { css } from 'styled-components'
import { cssVarsTypography } from '@rightpoint/core/styles'
import { typography } from '@rightpoint/core/styles'
import NextLink from 'next/link'
import { ButtonStyles } from '../../general/Button/Button.styles'

const NextLinkStyled = styled(NextLink)<{
    $noDecoration?: boolean
    $styledLink?: boolean
}>`
    ${cssVarsTypography.textColor};

    ${({ $styledLink }) =>
        $styledLink &&
        css`
            ${typography.TextLinkCss}
        `}

    ${({ $noDecoration }) =>
        $noDecoration
            ? css`
                  text-decoration: none;
              `
            : css`
                  text-decoration: underline;
                  text-underline-offset: 4px;

                  transition: 0.2s ease-in-out;
                  &:hover {
                      text-underline-offset: 2px;
                  }
              `}
`

export const LinkStyles = {
    NextLinkStyled,
    NextLinkButtonStyled: styled(NextLinkStyled)`
        ${ButtonStyles.buttonCss}
    `,
}
