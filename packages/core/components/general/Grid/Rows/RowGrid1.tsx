import { Composition } from 'atomic-layout'
import { GridRowComponent } from '../Grid.types'
import { AspectWrapperContextProvider } from '../../../utils/AspectWrapper/AspectWrapper.context'
import { Children } from 'react'

export const GridRow1: GridRowComponent = ({ children, isLastRow }) => {
    return (
        <Composition
            templateColsXs="1"
            templateColsMd="repeat(12, 1fr)"
            gapRowLg={100}
            areas={`
                a
                b
                c
                d
                e
                f
            `}
            // remove areas if count is less than letter count
            areasMd={`
                a a a a a a . . . . . .
                a a a a a a . b b b b .
                a a a a a a . b b b b .
                a a a a a a . . . . . .
                . . . . . d d d d d . .
                . . . . . d d d d d . .
                e e e . . d d d d d . .
                e e e . . d d d d d . .
                e e e . . . . . . . . .
                e e e . . . . . . . . .
                . . . . . . . f f f f f 
                . . . . . . . f f f f f 
                . . . . . . . f f f f f
            `}
            marginBottom={isLastRow ? 0 : 50}
        >
            {(areas) => {
                return (
                    <>
                        {/* Here, the grid may provide/override child asset ratios  */}
                        <areas.A>{children[0]}</areas.A>
                        <areas.B>
                            <AspectWrapperContextProvider
                                aspectWrapperRatioDesktop={500 / 700}
                            >
                                {children[1]}
                            </AspectWrapperContextProvider>
                        </areas.B>
                        <areas.C>
                            <AspectWrapperContextProvider
                                aspectWrapperRatioDesktop={500 / 500}
                            >
                                {children[2]}
                            </AspectWrapperContextProvider>
                        </areas.C>
                        {children[3] && <areas.D>{children[3]}</areas.D>}
                        {children[4] && (
                            <areas.E marginVerticalMd={60}>
                                {children[4]}
                            </areas.E>
                        )}
                        {children[5] && <areas.F>{children[5]}</areas.F>}
                    </>
                )
            }}
        </Composition>
    )
}
GridRow1.itemsPerRow = 6
