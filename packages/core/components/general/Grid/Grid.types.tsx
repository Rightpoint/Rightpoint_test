import { FC } from 'react'

/**
 * These are the possible layouts
 */
export enum GridLayouts {
    Grid1 = 'Grid1',
    Grid2 = 'Grid2',
    Grid3 = 'Grid3',
}

export type GridLayoutsKeys = keyof typeof GridLayouts

interface GridRowComponentProps {
    isLastRow?: boolean
}
export type GridRowComponent = FC<GridRowComponentProps> & {
    itemsPerRow: number
}
