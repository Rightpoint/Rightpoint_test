import { Children, FC } from 'react'
import { CardsListOffsetStyles as s } from './CardsListOffset.styles'

export interface CardsListOffsetProps {}

export const CardsListOffset: FC<CardsListOffsetProps> = ({ children }) => {
    return (
        <s.CardsListOffset>
            {Children.map(children, (child, index) => {
                if (index > 3) {
                    return null
                }
                return <s.OffsetItem key={index}>{child}</s.OffsetItem>
            })}
        </s.CardsListOffset>
    )
}
