import styled, { css } from 'styled-components'
import { cssVarNames, media, typography } from '@rightpoint/core/styles'

const Stats = styled.div`
    margin-bottom: 30px;
    margin-top: 30px;
    ${media('md')} {
        margin-bottom: 60px;
        margin-top: 100px;
    }
`
const Item = styled.div`
    display: inline-block;
    &:not(:last-child) {
        margin-right: 30px;
        margin-bottom: 30px;
        ${media('md')} {
            font-size: 12rem;
        }
        ${media('lg')} {
            margin-right: 80px;
        }
    }
`
const Number = styled.div`
    font-size: 7.2rem;

    ${media('md')} {
        font-size: 9rem;
    }
    ${media('lg')} {
        font-size: 14rem;
    }
    sup {
        font-size: 0.5em;
    }
`
const Title = styled(typography.BodyM)``

export const StatsStyles = {
    Stats,
    Item,
    Number,
    Title,
}
