import { FC } from 'react'
import {
    AspectWrapper,
    AspectWrapperRatios,
    CardProps,
    Link,
    MultiMedia,
} from '@rightpoint/core/components'
import { WorkDetailPageStyles as s } from '../WorkDetailPage.styles'
import { Composition } from 'atomic-layout'

const WorkDetailRelated: FC<{ relatedWorksProps: CardProps[] }> = ({
    relatedWorksProps,
}) => {
    return (
        <s.WorkDetailRelated>
            <Composition templateColsMd="1fr 1fr">
                {relatedWorksProps.map((workCardProps, index) => {
                    return (
                        <Link {...workCardProps.linkProps} key={index}>
                            <AspectWrapper
                                aspectWrapperRatio={AspectWrapperRatios.Default}
                            >
                                <MultiMedia
                                    {...workCardProps.multiMediaProps}
                                    aspectWrapperRatio={
                                        AspectWrapperRatios.Default
                                    }
                                    aspectWrapperRatioDesktop={
                                        AspectWrapperRatios.Default
                                    }
                                />
                                <s.RelatedItem>
                                    <s.Title>{workCardProps.title}</s.Title>
                                    <s.Subtitle>
                                        {workCardProps.body}
                                    </s.Subtitle>
                                </s.RelatedItem>
                            </AspectWrapper>
                        </Link>
                    )
                })}
            </Composition>
        </s.WorkDetailRelated>
    )
}
