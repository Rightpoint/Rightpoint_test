import { Document } from '@contentful/rich-text-types'
import { Composition } from 'atomic-layout'
import { FC, ReactNode, useContext, useEffect, useState } from 'react'
import { useScrollAnimation } from '../Animation/Animation.component'
import { contentfulRichTextToReact } from '../RichText/contentful-rich-text-to-react'
import { RichTextStyles } from '../RichText/RichText.styles'
import { WorkDetailTextStyles as s } from './WorkDetailText.styles'

export interface WorkDetailTextProps {
    title?: string
    subtitle?: string
    body?: ReactNode | Document
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
                                <s.Subtitle>{subtitle}</s.Subtitle>
                            </Animation>
                        </s.StickyHeader>
                    </Side>
                    <Content>
                        <Animation>
                            <RichTextStyles.RichText>
                                {contentfulRichTextToReact(body)}
                            </RichTextStyles.RichText>
                        </Animation>
                    </Content>
                </>
            )}
        </Composition>
    )
}
