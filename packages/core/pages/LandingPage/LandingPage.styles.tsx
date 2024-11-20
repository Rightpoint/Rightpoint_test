import styled, { css } from 'styled-components'
import { media, typography } from '../../styles'

const mediaMobile = media('xs', 'md')

const StickySidebar = styled.div`
    position: sticky;
    top: 120px;

    ${mediaMobile} {
        top: 40px;
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
    max-width: 300px;
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
}
