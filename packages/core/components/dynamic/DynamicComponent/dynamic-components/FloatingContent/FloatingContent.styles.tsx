import styled, { css } from 'styled-components'
import { typography } from '@rightpoint/core/styles'

const Item = styled.div`
    position: absolute;
    outline: 1px solid red;
    border-radius: 5px;
    padding: 20px;
`

const FloatingContent = styled.div`
    position: relative;
    outline: 1px solid red;
    min-height: 500px;
`

export const FloatingContentStyles = {
    FloatingContent,
    Item,
}
