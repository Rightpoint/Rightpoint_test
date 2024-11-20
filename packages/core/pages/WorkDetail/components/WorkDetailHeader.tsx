import {
    BackgroundColors,
    ContentColors,
    PageHeader,
} from '@rightpoint/core/components'
import { FC } from 'react'
import { WorkDetailPageProps } from '../WorkDetailPage.page'
import { WorkDetailHeaderStyles as s } from './WorkDetailHeader.styles'

export const WorkDetailHeader: FC<WorkDetailPageProps> = ({
    title,
    tagline,
    multiMediaProps,
    backgroundColor,
    introDocument,
    headerLinksProps,
}) => {
    return (
        <PageHeader
            title={title}
            backgroundMultiMediaProps={multiMediaProps}
            eyebrow={tagline}
            introductionDocument={introDocument}
            contentColor={ContentColors.Light}
            backgroundColor={BackgroundColors.Black}
            legacyBackgroundFallback={true}
            linksHeader="Services"
            linksProps={headerLinksProps}
        />

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
