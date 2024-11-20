import styled, { css } from 'styled-components'
import { cssVarNames, media, typography } from '@rightpoint/core/styles'

const FloatingImageText = styled.div`
    position: relative;
    z-index: 1; // on top of hero
`

const Title = styled(typography.H2).attrs({})`
    b,
    strong {
        font-family: var(${cssVarNames.typography.fontSans});
        font-weight: 100;
    }
    margin-bottom: 1.5em;

    ${media('xs', 'md')} {
        font-size: 3.4rem;
        margin-bottom: 1em;
    }
`

const TextArea = styled.div`
    ${media('xs', 'md')} {
        margin-top: 30px;
        margin-left: 40px;
        padding-right: 20px;
    }
`

const Body = styled(typography.BodyL)`
    > *:first-child {
        margin-top: 0;
    }
    > *:last-child {
        margin-bottom: 0;
    }
`

const FloatingImages = styled.div`
    position: relative;
    grid-template-columns: repeat(12, 1fr);
    grid-row-gap: 20px;
    z-index: 2;
    > * {
        z-index: 2;
        &:nth-child(1) {
            grid-row: 1;
            grid-column: 11/13;
        }
        &:nth-child(2) {
            grid-row: 2;
            grid-column: 3/7;
        }
        &:nth-child(3) {
            grid-row: 3;
            grid-column: 9/13;
            margin-top: -50%;
        }
        &:nth-child(4) {
            grid-row: 4;
            grid-column: 2/5;
        }
        &:nth-child(5) {
            grid-row: 5;
            grid-column: 6/9;
        }
        &:nth-child(6) {
            grid-row: 6;
            grid-column: 1/7;
            margin-top: -25%;
        }
    }

    ${media('xs', 'md')} {
        > * {
            &:nth-child(1) {
                grid-row: 1;
                grid-column: 8/13;
            }
            &:nth-child(2) {
                grid-column: 1/6;
            }
            &:nth-child(3) {
                grid-column: 8/13;
                margin-top: -50%;
            }
            &:nth-child(4) {
                grid-column: 2/7;
            }

            &:nth-child(n + 5) {
                display: none;
            }
        }
    }
`

const FloatingImagesBg = styled.div`
    position: absolute;
    top: 35%;
    left: 0;
    right: 0;
    bottom: -150px;
    background: var(--floating-bottom-bg-color);
    width: 100vw;
    margin-left: calc(50% - 50vw);
    z-index: 0;
    grid-row: unset !important; 
    grid-column: unset !important;
    margin-top: unset !important;
    ${media('xs', 'md')} {
        top: top: 80%;
        display: block !important;
    }
}
`

const RoundedWrapper = styled.div`
    // image
    img {
        border-radius: 10px;
    }
`

export const FloatingImageTextStyles = {
    FloatingImageText,
    Title,
    Body,
    FloatingImages,
    FloatingImagesBg,
    RoundedWrapper,
    TextArea,
}
