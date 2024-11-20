import { Composition } from 'atomic-layout'
import { FC } from 'react'
import { WorkDetailImpactStyles as s } from './WorkDetailImpact.styles'

export interface WorkDetailImpactProps {
    title: string
    impacts: {
        bigText: string
        description: string
    }[]
}

export const WorkDetailImpact: FC<WorkDetailImpactProps> = ({
    title,
    impacts,
}) => {
    return (
        <s.WorkDetailImpact>
            <s.Title>{title}</s.Title>
            <s.Grid>
                {impacts.map((impact, index) => (
                    <s.Impact key={index}>
                        <s.BigText>{impact.bigText}</s.BigText>
                        <s.Description>{impact.description}</s.Description>
                    </s.Impact>
                ))}
            </s.Grid>
        </s.WorkDetailImpact>
    )
}
