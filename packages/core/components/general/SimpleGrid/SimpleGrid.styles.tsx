import { AspectWrapperStyles } from '@rightpoint/core/components'
import styled, { css } from 'styled-components'
import {
    cssVarNames,
    cssVarsTypography,
    media,
    typography,
} from '@rightpoint/core/styles'

export enum GridLayouts {
    Default = 'Default',
    FullWidth = 'FullWidth',
}

export enum GridItemVariants {
    Default = 'Default',
    ClientList = 'ClientList',
    Capabilities = 'Capabilities',
}

const Layout = styled.div<{
    $layout?: GridLayouts | undefined
    $alignment?: string
    $variant?: GridItemVariants
    $hasHero?: boolean
}>`
    text-align: ${({ $alignment }) => $alignment || 'left'};
    ${({ $hasHero }) =>
        $hasHero &&
        css`
            margin-top: 120px;
            ${media('lg')} {
                margin-top: 130px;
            }
        `}
`

const Image = styled.div`
    position: relative;
    img {
        width: 100%;
    }
`

const Title = styled(typography.BodyL).attrs({
    $fontFamily: 'sans',
})`
    margin-bottom: 0.2em;
    ${cssVarsTypography.textColor};
`

const Body = styled(typography.BodyM).attrs({
    $fontFamily: 'serif',
})`
    ${cssVarsTypography.textColor};
    & > *:first-child {
        margin-top: 0;
    }
    & > *:last-child {
        margin-bottom: 0;
    }
`

const Item = styled.div``

export const SimpleGridStyles = {
    Layout,
    Title,
    Body,
    Image,
    Item,
}
