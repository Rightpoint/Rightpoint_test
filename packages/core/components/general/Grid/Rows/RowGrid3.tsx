import { Composition } from 'atomic-layout'
import { gridRenderAreas } from '../Grid.utils'
import { GridRowComponent } from '../Grid.types'
import {
    AspectWrapperContextProvider,
    AspectWrapperRatios,
} from '../../../utils/AspectWrapper/AspectWrapper.context'

export const GridRow3: GridRowComponent = ({ children, isLastRow }) => {
    return (
        <>
            <Composition
                templateColsXs="1"
                templateColsMd="repeat(12, 1fr)"
                gap={20}
                gapRowMdDown={60}
                areas={`
                    a
                    b
                    c
                    d
                    e
                    f
                `}
                areasMd={`
                    . a a a a . . . . . . .
                    . a a a a . . . . . . .
                    . a a a a . . . . . . .
                    . a a a a . b b b b b b
                    . . . . . . b b b b b b
                    . . . . . . b b b b b b
                    . . . . . . . . . . . .
                    c c c c c c . . . . . . 
                    c c c c c c . . . . . . 
                    c c c c c c . d d d d . 
                    . . . . . . . d d d d .
                    . . . . . . . d d d d .
                    e e e e e e . d d d d .
                    e e e e e e . d d d d .
                    e e e e e e . . . . . .
                    e e e e e e . . . . . .
                    . . . . . . f f f f f f
                    . . . . . . f f f f f f
                    . . . . . . f f f f f f

                `}
                marginBottom={isLastRow ? 0 : 60}
            >
                {(areas) => (
                    <>
                        <areas.A>
                            <AspectWrapperContextProvider
                                aspectWrapperRatioDesktop={
                                    AspectWrapperRatios.Portrait
                                }
                            >
                                {children[0]}
                            </AspectWrapperContextProvider>
                        </areas.A>
                        <areas.B>{children[1]}</areas.B>
                        <areas.C marginTopLg={60} marginTopXl={100}>
                            {children[2]}
                        </areas.C>
                        <areas.D>
                            <AspectWrapperContextProvider
                                aspectWrapperRatioDesktop={
                                    AspectWrapperRatios.Portrait
                                }
                            >
                                {children[3]}
                            </AspectWrapperContextProvider>
                        </areas.D>
                        <areas.E marginTopLg={30}>{children[4]}</areas.E>
                        <areas.F>{children[5]}</areas.F>
                    </>
                )}
            </Composition>
        </>
    )
}
GridRow3.itemsPerRow = 6
