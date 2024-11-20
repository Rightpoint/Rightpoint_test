import { StatsStyles as s } from './Stats.styles'

export type StatProps = {
    number: string
    superscript?: string
    label: string
}
export interface StatsProps {
    stats: StatProps[]
}
export const Stats = ({ stats = [] }: StatsProps) => {
    return (
        <s.Stats>
            {stats.map(({ number, superscript, label }, i) => (
                <s.Item key={i}>
                    <s.Number>
                        {number}
                        {superscript && <sup>%</sup>}
                    </s.Number>
                    {label && <s.Title>{label}</s.Title>}
                </s.Item>
            ))}
        </s.Stats>
    )
}
