import styled, { css } from 'styled-components'

export const ImageStyles = {
    PureImage: styled.img`
        display: block;
        width: 100%;
    `,
    Image: styled.div<{ $isLoaded?: boolean }>`
        position: relative;
        overflow: hidden; // prevent preview css from overflowing
        max-width: 100%;

        img {
            opacity: 1;
            position: relative;
            z-index: 1;
        }
    `,
    Placeholder: styled.div`
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transform: scale(1.5);
        filter: blur(40px);
        z-index: 0;
    `,
}
