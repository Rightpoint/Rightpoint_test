import { FC } from 'react'
import { Card, CardProps } from '../../general/Card/Card.component'
import { MultiMedia } from '../../general/MultiMedia/MultiMedia.component'
import { ThoughtHeaderStyles as s } from './ThoughtHeader.styles'

export interface ThoughtHeaderProps {
    date?: string
    title: string
    body?: string
    cardProps?: CardProps
}

export const ThoughtHeader: FC<ThoughtHeaderProps> = ({
    date,
    title,
    body,
    cardProps,
}) => {
    return (
        <s.ThoughtHeader>
            <s.MaxWidth>
                <s.Content>
                    <s.Date>{date || cardProps?.date}</s.Date>
                    <s.Title>{title}</s.Title>
                    <s.Body>{body}</s.Body>
                </s.Content>
                <s.Card>
                    <Card {...cardProps} />
                </s.Card>
                <s.Background>
                    <MultiMedia {...cardProps?.multiMediaProps} />
                </s.Background>
            </s.MaxWidth>
        </s.ThoughtHeader>
    )
}
