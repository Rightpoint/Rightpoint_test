import * as React from 'react'
import styled, { css } from 'styled-components'

const Grid = styled.div<any>`
    display: grid;

    --gap: 10px;
    gap: var(--gap);

    ${({ row, reverse, children }) =>
        children?.length > 1
            ? row
                ? css`
                      grid-template-columns: ${reverse
                          ? '1.618fr 1fr'
                          : '1fr 1.618fr'};
                  `
                : css`
                      grid-template-rows: ${reverse
                          ? '1.618fr 1fr'
                          : '1fr 1.618fr'};
                  `
            : 'grid-template-rows: 1fr;'}

    ${({ root }) =>
        root
            ? css`
                  height: calc(100vw * (1 / 1.618));
                  padding: var(--gap);
              `
            : css``}

    ${({ debug }) => (debug ? 'border: 1px solid cyan;' : '')}
`

export const GoldenRatioTestLayout: React.FC<any> = React.forwardRef(
    ({ children, debug, ...props }, ref) => {
        return (
            <Grid {...props} row root debug={debug} ref={ref}>
                <Grid column debug={debug}>
                    {children({ index: 1 })}
                    <Grid row reverse debug={debug}>
                        {children({ index: 2 })}
                        <Grid column debug={debug}>
                            <Grid row debug={debug}>
                                <Grid column debug={debug} reverse>
                                    <Grid column debug={debug}>
                                        {children({ index: 6 })}
                                    </Grid>
                                    {children({ index: 5 })}
                                </Grid>
                                {children({ index: 4 })}
                            </Grid>
                            {children({ index: 3 })}
                        </Grid>
                    </Grid>
                </Grid>
                {children({ index: 0 })}
            </Grid>
        )
    }
)
