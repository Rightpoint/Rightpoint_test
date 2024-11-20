import { Children, FC, ReactNode } from 'react'
import { CardsListFullWidthStyles as s } from './CardsListFullWidth.styles'

export interface CardsListFullWidthListProps {
    children?: ReactNode
}

export const CardsListFullWidthList: FC<CardsListFullWidthListProps> = ({
    children,
}) => {
    return (
        <s.CardsListFullWidth>
            {Children.map(children, (child, index) => {
                return <s.Card key={index}>{child}</s.Card>
            })}
        </s.CardsListFullWidth>
    )
}
