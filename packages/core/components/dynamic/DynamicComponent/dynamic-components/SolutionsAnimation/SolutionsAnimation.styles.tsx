import styled from 'styled-components'
import { breakpoints, media } from '@rightpoint/core/styles'

export const SolutionsAnimationStyles = {
    SolutionsAnimation: styled.div`
        margin: 0 auto;
        max-width: 650px;
        padding-bottom: 50px;
        ${media('xs', 'sm')} {
            max-width: 500px;
        }

        // @media screen and (max-width: ${breakpoints.sm}px) and (min-resolution: 350dpi) {
        //     // scale factor 3
        //     max-width: 250px;
        //     transform: scale(1.4);
        // }

        @media screen and (max-width: ${breakpoints.sm}px) and (min-resolution: 260dpi) {
            // scale factor 2
            max-width: 250px;
            transform: scale(1.5);
        }
    `,
}
