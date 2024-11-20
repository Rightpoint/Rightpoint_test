import styled, { css } from 'styled-components'
import { typography, FontWeights } from '@rightpoint/core/styles'

const typistCss = css`
    .Typist .Cursor {
        display: inline-block;
    }
    .Typist .Cursor--blinking {
        opacity: 1;
        animation: blink 1s linear infinite;
    }

    @keyframes blink {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
`

const HeaderTypewriter = styled.div`
    .Cursor {
        position: relative;
    }

    text-align: center;

    ${typistCss}
`

const Cursor = styled.span``

const CursorLineSizer = styled.span`
    opacity: 0;
`

const CursorLine = styled.span`
    position: absolute;
    top: 10%;
    right: 0;
    bottom: 10%;
    width: 2px;
    background: black;
`

const Title = styled(typography.H3).attrs({
    as: 'h3',
    $fontFamily: 'sans',
    $fontWeight: FontWeights.Light,
})``

export const HeaderTypewriterStyles = {
    HeaderTypewriter,
    Cursor,
    CursorLineSizer,
    CursorLine,
    Title,
}
