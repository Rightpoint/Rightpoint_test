import styled, { css } from 'styled-components'
import { typography } from '@rightpoint/core/styles'

export const ScrollingTextStyles = {
    ScrollingText: styled.div`
        overflow: hidden;
        margin-top: 100px;
        margin-bottom: 50px;
    `,
    Text: styled(typography.FoundersH100)`
        white-space: nowrap;
    `,
}
