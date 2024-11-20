import styled, { css } from 'styled-components'
import { media, typography } from '../../styles'

const mediaMobile = media('xs', 'md')
const mediaDesktop = media('lg')

const StickySidebar = styled.div`
    position: sticky;
    top: 120px;

    ${mediaMobile} {
        top: 40px;
        padding: 12px 0 12px 0;
    }
`

const StickySidebarImage = styled.div`
    ${mediaMobile} {
        display: none;
    }
`

const Image = styled.div`
    grid-column: 1 / -1;
`

const Sidebar = styled.div`
    ${mediaDesktop} {
        max-width: 300px;
    }
`

const GridRightColumn = styled.div`
    grid-column: 2;
`

export const LandingPageStyles = {
    mediaMobile,
    StickySidebar,
    StickySidebarImage,

    Image,
    Sidebar,

    GridRightColumn,

    MobileBottomPardot: styled.div`
        grid-column: 1 / -1;
        display: none;

        ${mediaMobile} {
            display: block;
        }
    `,

    SidebarPardot: styled.div`
        margin-top: 40px;
    `,
}
