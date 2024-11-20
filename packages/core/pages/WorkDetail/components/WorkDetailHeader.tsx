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
    PageHeader,
    RootComponent,
} from '@rightpoint/core/components'
import { FC } from 'react'
import { WorkDetailPageProps } from '../WorkDetailPage.page'
import { getConfigsManager } from '../../../next-contentful/mappers/registry/all-configs'
import { WorkDetailHeaderStyles as s } from './WorkDetailHeader.styles'

export const WorkDetailHeader: FC<WorkDetailPageProps> = ({
    title,
    tagline,
    multiMediaProps,
    backgroundColor,
    introDocument,
}) => {
    const intro = contentfulRichTextToReact(introDocument, getConfigsManager())
    return (
        <RootComponent
            container
            noMargins
            noPadding
            background={{
                backgroundColor: BackgroundColors.Black,
            }}
        >
            <PageHeader
                title={title}
                multiMediaProps={multiMediaProps}
                eyebrow={tagline}
                renderBelow={() => (
                    // this needs to be b100
                    <s.BottomSection>
                        <s.Introduction>
                            {contentfulRichTextToReact(introDocument)}
                        </s.Introduction>
                        <s.Links>
                            <s.LinksHeader>Services</s.LinksHeader>
                            <s.Link>TBD when Solutions are up</s.Link>
                            <s.Link>TBD when Solutions are up</s.Link>
                            <s.Link>TBD when Solutions are up</s.Link>
                        </s.Links>
                    </s.BottomSection>
                )}
            />
        </RootComponent>

        // <div
        //     style={{
        //         paddingTop: 100,
        //     }}
        // >
        //     {/* {multiMediaProps && <MultiMedia {...multiMediaProps} />} */}
        //     <p>Tagline:{tagline}</p>
        //     <p>Title: {title}</p>
        //     <p>intro: {contentfulRichTextToReact(introDocument)}</p>
        //     <div>
        //         Services...
        //         <div>... related industries/solutions</div>
        //     </div>
        // </div>
        // <Header
        //     headerTextProps={{
        //         title: tagline,
        //         variant: HeaderVariants.CaseStudy,
        //     }}
        //     renderMedia={() => (
        //         <Hero title={title} contentWidth={HeroContentWidths.Medium}>
        //             <MultiMedia
        //                 {...multiMediaProps}
        //                 aspectWrapperRatio={AspectWrapperRatios.Portrait}
        //                 aspectWrapperRatioDesktop={
        //                     AspectWrapperRatios.Landscape
        //                 }
        //             />
        //             {industryLinkProps && (
        //                 <Link href={industryLinkProps.href}>
        //                     <s.HeaderLink $align="left">
        //                         <s.Position>
        //                             {industryLinkProps.text}
        //                         </s.Position>
        //                     </s.HeaderLink>
        //                 </Link>
        //             )}
        //             {workCategoryLinkProps && (
        //                 <Link href={workCategoryLinkProps.href}>
        //                     <s.HeaderLink $align="right">
        //                         <s.Position>
        //                             {workCategoryLinkProps.text}
        //                         </s.Position>
        //                     </s.HeaderLink>
        //                 </Link>
        //             )}
        //         </Hero>
        //     )}
        //     // backgroundColor={backgroundColor as BackgroundColors}
        //     // backgroundPosition={
        //     //     backgroundColor !== BackgroundColors.None ? 'solid' : undefined
        //     // }
        //     renderContentBelow={() => <s.HeaderText>{intro}</s.HeaderText>}
        //     a11y={{
        //         label: `${title} case study introduction`,
        //     }}
        // />
    )
}
