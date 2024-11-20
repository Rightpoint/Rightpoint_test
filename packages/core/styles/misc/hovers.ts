import { css } from 'styled-components'
import { colors } from '../../variables'

export const hovers = {
    typography: {
        // todo: these need redux powered via cached proxy component?
        // need flexible css pattern that applies to most components
        body: css`
            transition: all 0.3s ease;
            &:hover {
                color: ${colors.gray};
            }
        `,
    },
}
