import { FC, ReactElement, ReactNode } from 'react'
import { Grid, GridProps } from '../Grid/Grid.component'
import { gridGenerators } from '../Grid/Grid.data'
import { AnimateOnScrollStyles as s } from './AnimateOnScroll.styles'

export interface AnimateOnScrollProps
    extends Pick<GridProps, 'cardVariant' | 'gridLayout'> {
    Wrapper?: ReactNode
    titleSticky?: boolean
}

export const AnimateOnScroll: FC<AnimateOnScrollProps> = ({
    Wrapper = ({ children }) => <div>None{children}</div>,
    titleSticky,
    ...rest
}) => {
    return (
        <s.AnimateOnScroll>
            <Grid
                heroProps={{
                    title: 'Scroll',
                    titleSticky: titleSticky,
                }}
                Wrapper={Wrapper}
                {...gridGenerators.default()}
                {...rest}
            ></Grid>
        </s.AnimateOnScroll>
    )
}
