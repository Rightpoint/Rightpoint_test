/**
 * Standard Page
 */
export { StandardPage } from './StandardPage/StandardPage.page'
export { StandardPageHomepage } from './StandardPage/StandardPageHomepage.page'
export {
    getStandardPageStaticPaths,
    getStandardPageStaticProps,
} from './StandardPage/StandardPage.server'
export {
    standardPageMapperConfig,
    type StandardPageEntry,
} from './StandardPage/StandardPage.contentful'

/**
 * Work Detail
 */
export { WorkDetailPage } from './WorkDetail/WorkDetailPage.page'
export {
    getWorkDetailStaticPaths,
    getWorkDetailStaticProps,
} from './WorkDetail/WorkDetailPage.server'
export {
    workDetailPageMapperConfig,
    type WorkDetailEntry,
} from './WorkDetail/WorkDetailPage.contentful'

/**
 * Work Category
 */
export { WorkCategory } from './WorkCategory/WorkCategory.page'
export {
    getWorkCategoryStaticPaths,
    getWorkCategoryStaticProps,
} from './WorkCategory/WorkCategory.server'
export { workCategoryMapperConfig } from './WorkCategory/WorkCategory.contentful'

/**
 * Thought Category
 */
export { ThoughtCategory } from './ThoughtCategory/ThoughtCategory.page'
export {
    getThoughtCategoryStaticPaths,
    getThoughtCategoryStaticProps,
} from './ThoughtCategory/ThoughtCategory.server'
export { thoughtCategoryMapperConfig } from './ThoughtCategory/ThoughtCategory.contentful'

/**
 * Thought Detail
 */
export {
    ThoughtDetail,
    type ThoughtDetailProps,
} from './ThoughtDetail/ThoughtDetail.page'
export {
    getThoughtDetailStaticPaths,
    getThoughtDetailStaticProps,
} from './ThoughtDetail/ThoughtDetail.server'
export {
    thoughtDetailMapperConfig,
    type ThoughtDetailEntry,
} from './ThoughtDetail/ThoughtDetail.contentful'

/**
 * Error Pages
 */
export { Page404 } from './404/404.page'
export { Page500 } from './500/500.page'

/**
 * Test Page (for our chunking test pages)
 */
export { TestPage } from './Test/Test.page'

/**
 * Seo
 */
export { Seo, type SeoProps } from './seo/Seo/Seo.component'
export { seoMapperConfig } from './seo/Seo/Seo.contentful'

/**
 * Pardot
 */
export { pardotThankYouMapperConfig } from './PardotThankYou/PardotThankYou.contentful'
export {
    getPardotThankYouStaticProps,
    getPardotThankYouStaticPaths,
} from './PardotThankYou/PardotThankYou.server'
export { PardotThankYou } from './PardotThankYou/PardotThankYou.page'

/**
 * Landing Page Category
 */
export {
    getLandingPageCategoryStaticPaths,
    getLandingPageCategoryStaticProps,
} from './LandingPageCategory/LandingPageCategory.server'
export { LandingPageCategory } from './LandingPageCategory/LandingPageCategory.page'
export {
    landingPageCategoryMapperConfig,
    type LandingPageCategoryEntry,
} from './LandingPageCategory/LandingPageCategory.contentful'

/**
 * Landing Page
 */
export { LandingPage } from './LandingPage/LandingPage.page'
export {
    getLandingPageStaticPaths,
    getLandingPageStaticProps,
} from './LandingPage/LandingPage.server'
export {
    landingPageMapperConfig,
    type LandingPageEntry,
} from './LandingPage/LandingPage.contentful'

/**
 * Landing Page Thank You
 */
export { LandingPageThankYouPage } from './LandingPageThankYou/LandingPageThankYou.page'
export {
    getLandingPageThankYouStaticPaths,
    getLandingPageThankYouStaticProps,
} from './LandingPageThankYou/LandingPageThankYou.server'
export { landingPageThankYouMapperConfig } from './LandingPageThankYou/LandingPageThankYou.contentful'

/**
 * Solution
 */
export { SolutionPage } from './Solution/Solution.page'
export { SolutionLandingPage } from './Solution/SolutionLanding.page'
export {
    getSolutionPageStaticPaths,
    getSolutionPageStaticProps,
} from './Solution/Solution.server'
export {
    solutionPageMapperConfig,
    type SolutionPageEntry,
} from './Solution/Solution.contentful'

/**
 * Industry page
 */
export { IndustryPage } from './Industry/Industry.page'
export {
    getIndustryPageStaticPaths,
    getIndustryPageStaticProps,
} from './Industry/Industry.server'
export { industryPageMapperConfig } from './Industry/Industry.contentful'

/**
 * Office page (doesn't exist except in card form)
 */
export { officePageMapperConfig } from './Office/Office.contentful'
