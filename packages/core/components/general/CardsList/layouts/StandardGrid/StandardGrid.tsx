import { Children, FC, ReactNode } from 'react'
import { StandardGridStyles as s } from './StandardGrid.styles'

export interface CardsListOffsetProps {
    children?: ReactNode
}

export const StandardGrid: FC<CardsListOffsetProps> = ({ children }) => {
    return (
        <s.StandardGrid>
            {Children.map(children, (child, index) => {
                return <s.Item key={index}>{child}</s.Item>
            })}
        </s.StandardGrid>
    )
}
