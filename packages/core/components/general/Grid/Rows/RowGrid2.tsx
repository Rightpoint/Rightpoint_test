import { Composition } from 'atomic-layout'
import { gridRenderAreas } from '../Grid.utils'
import { GridRowComponent } from '../Grid.types'
import {
    AspectWrapperContextProvider,
    AspectWrapperRatios,
} from '../../../utils/AspectWrapper/AspectWrapper.context'

export const GridRow2: GridRowComponent = ({ children, isLastRow }) => {
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
                    a a a a a a . . . . . .
                    a a a a a a . . . . . .
                    a a a a a a . . . . . .
                    . . . . . . b b b b b b
                    . c c c c . b b b b b b
                    . c c c c . b b b b b b
                    . c c c c . . . . . . .
                    . c c c c . d d d d d d
                    . . . . . . d d d d d d
                    . . . . . . d d d d d d
                    . . . . . . . . . . . .
                    e e e e e e . . . . . .
                    e e e e e e . . . . . .
                    e e e e e e . f f f f .
                    . . . . . . . f f f f .
                    . . . . . . . f f f f .
                    . . . . . . . f f f f .

                `}
                marginBottom={isLastRow ? 0 : 60}
            >
                {(areas) => (
                    <>
                        {/* 
                            TODO: don't render if child doesn't exist. 
                            It causes extra whitespace 
                        */}
                        <areas.A>{children[0]}</areas.A>
                        <areas.B>{children[1]}</areas.B>
                        <areas.C>
                            <AspectWrapperContextProvider
                                aspectWrapperRatioDesktop={
                                    AspectWrapperRatios.Portrait
                                }
                            >
                                {children[2]}
                            </AspectWrapperContextProvider>
                        </areas.C>
                        <areas.D>{children[3]}</areas.D>
                        <areas.E marginTopLg={30}>{children[4]}</areas.E>
                        <areas.F>
                            <AspectWrapperContextProvider
                                aspectWrapperRatioDesktop={
                                    AspectWrapperRatios.Portrait
                                }
                            >
                                {children[5]}
                            </AspectWrapperContextProvider>
                        </areas.F>
                    </>
                )}
            </Composition>
        </>
    )
}
GridRow2.itemsPerRow = 6
