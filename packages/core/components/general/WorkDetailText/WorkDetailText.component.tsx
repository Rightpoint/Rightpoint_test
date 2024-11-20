import { Composition } from 'atomic-layout'
import { FC, ReactNode, useContext, useEffect, useState } from 'react'
import { useScrollAnimation } from '../Animation/Animation.component'
import { RichTextStyles } from '../RichText/RichText.styles'
import { WorkDetailTextStyles as s } from './WorkDetailText.styles'

export interface WorkDetailTextProps {
    title?: string
    subtitle?: string
    body?: ReactNode
}

export const WorkDetailText: FC<WorkDetailTextProps> = ({
    title,
    subtitle,
    body,
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
            gapRowMdDown={60}
            templateMd={areasDesktop}
            templateColsMd={colsDesktop}
            gapColMd={40}
            gapColXl={80}
        >
            {({ Side, Content }) => (
                <>
                    <Side paddingRightSmDown={'20%'}>
                        <s.StickyHeader>
                            <Animation>
                                <s.Title>{title}</s.Title>
                                <s.Subtitle>{subtitle}</s.Subtitle>
                            </Animation>
                        </s.StickyHeader>
                    </Side>
                    <Content paddingLeftSmDown={60}>
                        <Animation>
                            <RichTextStyles.RichText>
                                {body}
                            </RichTextStyles.RichText>
                        </Animation>
                    </Content>
                </>
            )}
        </Composition>
    )
}
