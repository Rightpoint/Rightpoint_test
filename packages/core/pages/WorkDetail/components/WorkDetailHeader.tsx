import {
    AspectWrapperRatios,
    BackgroundColors,
    contentfulRichTextToReact,
    Header,
    HeaderVariants,
    Hero,
    HeroContentWidths,
    Link,
    MultiMedia,
} from '@rightpoint/core/components'
import { FC } from 'react'
import { WorkDetailPageStyles as s } from '../WorkDetailPage.styles'
import { WorkDetailPageProps } from '../WorkDetailPage.page'
import { getConfigsManager } from '../../../next-contentful/mappers/registry/all-configs'

export const WorkDetailHeader: FC<WorkDetailPageProps> = ({
    title,
    tagline,
    multiMediaProps,
    backgroundColor,
    industryLinkProps,
    workCategoryLinkProps,
    introDocument,
}) => {
    const intro = contentfulRichTextToReact(introDocument, getConfigsManager())
    return (
        <Header
            headerTextProps={{
                title: tagline,
                variant: HeaderVariants.CaseStudy,
            }}
            renderMedia={() => (
                <Hero title={title} contentWidth={HeroContentWidths.Medium}>
                    <MultiMedia
                        {...multiMediaProps}
                        aspectWrapperRatio={AspectWrapperRatios.Portrait}
                        aspectWrapperRatioDesktop={
                            AspectWrapperRatios.Landscape
                        }
                    />
                    {industryLinkProps && (
                        <Link href={industryLinkProps.href}>
                            <s.HeaderLink $align="left">
                                <s.Position>
                                    {industryLinkProps.text}
                                </s.Position>
                            </s.HeaderLink>
                        </Link>
                    )}
                    {workCategoryLinkProps && (
                        <Link href={workCategoryLinkProps.href}>
                            <s.HeaderLink $align="right">
                                <s.Position>
                                    {workCategoryLinkProps.text}
                                </s.Position>
                            </s.HeaderLink>
                        </Link>
                    )}
                </Hero>
            )}
            backgroundColor={backgroundColor as BackgroundColors}
            backgroundPosition={
                backgroundColor !== BackgroundColors.None ? 'solid' : undefined
            }
            renderContentBelow={() => <s.HeaderText>{intro}</s.HeaderText>}
            a11y={{
                label: `${title} case study introduction`,
            }}
        />
    )
}
