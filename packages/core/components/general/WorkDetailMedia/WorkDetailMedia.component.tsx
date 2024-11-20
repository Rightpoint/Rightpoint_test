import { Box, Composition } from 'atomic-layout'
import { FC } from 'react'
import { ConditionalWrapper } from '@rightpoint/core/utils'
import { useScrollAnimation } from '../Animation/Animation.component'
import { MultiMedia, MultiMediaProps } from '../MultiMedia/MultiMedia.component'
import { WorkDetailMediaStyles as s } from './WorkDetailMedia.styles'

export interface WorkDetailMediaProps {
    multiMediasProps: MultiMediaProps[]
    columns?: number
    gap?: number
    verticalOffset?: number
    verticallyOffsetWithShadows?: boolean
}

export const WorkDetailMedia: FC<WorkDetailMediaProps> = ({
    multiMediasProps = [],
    columns,
    gap,
    verticalOffset,
    verticallyOffsetWithShadows,
}) => {
    const { Animation } = useScrollAnimation()
    if (verticallyOffsetWithShadows) {
        verticalOffset = 100
        gap = 30
    }
    return (
        <s.WorkDetailMedia>
            <Composition
                templateColsMd={`repeat(${columns}, minmax(0, 1fr))`}
                gap={gap}
            >
                {multiMediasProps.map((multiMediaProps, index) => (
                    <ConditionalWrapper
                        key={index}
                        condition={!!verticalOffset}
                        wrapper={(children) => (
                            <Box
                                marginTopMd={verticalOffset * (index % columns)}
                                key={index}
                                as={s.VerticalOffsetShadowWrapper}
                            >
                                {children}
                            </Box>
                        )}
                    >
                        <Animation>
                            <MultiMedia {...multiMediaProps} />
                        </Animation>
                    </ConditionalWrapper>
                ))}
            </Composition>
        </s.WorkDetailMedia>
    )
}
