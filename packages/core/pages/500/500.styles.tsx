import styled from 'styled-components'
import { typography } from '@rightpoint/core/styles'

export const Page500Styles = {
    Page: styled.div`
        padding-top: 140px;
        padding-bottom: 200px;
        text-align: center;
        padding-left: var(--container-padding);
        padding-right: var(--container-padding);
    `,

    Title: styled.h1`
        text-align: center;
        ${typography.FoundersH300Css}
    `,
    Subtitle: styled(typography.FoundersH600)``,
    Body: styled(typography.FoundersB100)`
        margin-top: 1em;
    `,
}
