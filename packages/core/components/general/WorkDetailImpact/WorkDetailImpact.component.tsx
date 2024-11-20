import { Composition } from 'atomic-layout'
import { FC } from 'react'
import { useScrollAnimation } from '../Animation/Animation.component'
import { WorkDetailImpactStyles as s } from './WorkDetailImpact.styles'

export interface WorkDetailImpactProps {
    title: string
    impacts: {
        bigText: string
        description: string
    }[]
}

// export const WorkDetailImpact: FC<WorkDetailImpactProps> = ({
//     title,
//     impacts,
// }) => {
//     return (
//         <s.WorkDetailImpact>
//             <s.Title>{title}</s.Title>
//             <s.Grid>
//                 {impacts.map((impact, index) => (
//                     <s.Impact key={index}>
//                         <s.BigText>{impact.bigText}</s.BigText>
//                         <s.Description>{impact.description}</s.Description>
//                     </s.Impact>
//                 ))}
//             </s.Grid>
//         </s.WorkDetailImpact>
//     )
// }

export const WorkDetailImpact: FC<WorkDetailImpactProps> = ({
    title,
    impacts,
}) => {
    const areasMobile = `
      side
      content
    `
    const areasDesktop = `
      side content
    `
    const colsDesktop = `minmax(100px, 1fr) minmax(300px, 3fr)`

    const { Animation } = useScrollAnimation({
        lessMovement: true,
    })

    return (
        <Composition
            templateXs={areasMobile}
            // space between areas when stacked
            gapRowMdDown={40}
            templateMd={areasDesktop}
            templateColsMd={colsDesktop}
            gapColMd={40}
            gapColXl={80}
        >
            {({ Side, Content }) => (
                <>
                    <Side>
                        <s.StickyHeader>
                            <Animation>
                                <s.Title>{title}</s.Title>
                                {/* <s.Subtitle>{subtitle}</s.Subtitle> */}
                            </Animation>
                        </s.StickyHeader>
                    </Side>
                    <Content>
                        <Animation>
                            <s.WorkDetailImpact>
                                <s.Grid>
                                    {impacts.map((impact, index) => (
                                        <s.Impact key={index}>
                                            <s.BigText>
                                                {impact.bigText}
                                            </s.BigText>
                                            <s.Description>
                                                {impact.description}
                                            </s.Description>
                                        </s.Impact>
                                    ))}
                                </s.Grid>
                            </s.WorkDetailImpact>
                        </Animation>
                    </Content>
                </>
            )}
        </Composition>
    )
}
