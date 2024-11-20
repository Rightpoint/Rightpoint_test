import {
    landingPageCategoryMapperConfig,
    landingPageMapperConfig,
    standardPageMapperConfig,
    thoughtCategoryMapperConfig,
    thoughtDetailMapperConfig,
    workCategoryMapperConfig,
    workDetailPageMapperConfig,
    solutionPageMapperConfig,
    industryPageMapperConfig,
} from '@rightpoint/core/pages'

/**
 * All page mappers.
 *
 * - Used to render pages
 * - Used to generate sitemap
 */
export const getAllPageMappers = () => {
    return [
        standardPageMapperConfig,
        workCategoryMapperConfig,
        workDetailPageMapperConfig,
        thoughtDetailMapperConfig,
        thoughtCategoryMapperConfig,
        landingPageMapperConfig,
        landingPageCategoryMapperConfig,
        solutionPageMapperConfig,
        industryPageMapperConfig,
    ]
}
