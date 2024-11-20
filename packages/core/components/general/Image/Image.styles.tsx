import styled, { css } from 'styled-components'

const PureImage = styled.img`
    display: block;
    width: 100%;
`

const Image = styled.div<{ $isLoaded?: boolean }>`
    position: relative;
    overflow: hidden; // prevent preview css from overflowing
    max-width: 100%;

    img {
        opacity: 0;
        transition: 0.2s ease 0s;
    }

    ${(props) =>
        props.$isLoaded &&
        css`
            img {
                opacity: 1;
            }
        `}
`

const Placeholder = styled.div<{ $isLoaded: boolean }>`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: scale(1.5);
    filter: blur(40px);
    ${({ $isLoaded }) => $isLoaded && 'opacity: 0;'}
`

export const ImageStyles = {
    PureImage,
    Image,
    Placeholder,
}
