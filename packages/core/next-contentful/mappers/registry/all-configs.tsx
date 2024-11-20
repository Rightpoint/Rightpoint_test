import {
    bigLinkListMapperConfig,
    heroMapperConfig,
    imageMapperConfig,
    linkMapperConfig,
    multiMediaMapperConfig,
    navigationBarMapperConfig,
    simpleGridMapperConfig,
    whatWeDeliverMapperConfig,
    gridMapperConfig,
    navigationMapperConfig,
    workDetailTextMapperConfig,
    workDetailMediaMapperConfig,
    workDetailImpactMapperConfig,
    longRichTextMapperConfig,
    quoteMapperConfig,
    pardotMapperConfig,
    midArticleCtaMapperConfig,
    dynamicComponentMapperConfig,
    personMapperConfig,
    cardsListMapperConfig,
    verticalTabsMapperConfig,
} from '@rightpoint/core/components'
import {
    landingPageCategoryMapperConfig,
    landingPageMapperConfig,
    pardotThankYouMapperConfig,
    seoMapperConfig,
    standardPageMapperConfig,
    thoughtCategoryMapperConfig,
    thoughtDetailMapperConfig,
    workCategoryMapperConfig,
    workDetailPageMapperConfig,
    solutionPageMapperConfig,
    industryPageMapperConfig,
} from '@rightpoint/core/pages'

import { ConfigsManager } from './manager'

const cache = {
    manager: null,
}

const getManager = () => {
    const pages = [
        standardPageMapperConfig,
        workCategoryMapperConfig,
        workDetailPageMapperConfig,
        thoughtDetailMapperConfig,
        thoughtCategoryMapperConfig,
        landingPageMapperConfig,
        landingPageCategoryMapperConfig,
        pardotThankYouMapperConfig,
        solutionPageMapperConfig,
        industryPageMapperConfig,
    ]
    const layout = [navigationMapperConfig]
    const components = [
        heroMapperConfig,
        gridMapperConfig,
        verticalTabsMapperConfig,
        simpleGridMapperConfig,
        bigLinkListMapperConfig,
        navigationBarMapperConfig,
        whatWeDeliverMapperConfig,
        quoteMapperConfig,
        cardsListMapperConfig,
        // work
        workDetailTextMapperConfig,
        workDetailMediaMapperConfig,
        workDetailImpactMapperConfig,

        // thought
        longRichTextMapperConfig,
        midArticleCtaMapperConfig,
        pardotMapperConfig,

        dynamicComponentMapperConfig,

        personMapperConfig,
    ]
    const atoms = [
        // this one doesn't match real images, because those are "assets" with no
        imageMapperConfig,
        multiMediaMapperConfig,
        linkMapperConfig,
        seoMapperConfig,
    ]
    const manager = ConfigsManager.init([
        ...layout,
        ...pages,
        ...components,
        ...atoms,
    ])
    return manager
}

export const getConfigsManager = (): ReturnType<typeof getManager> => {
    if (!cache.manager) {
        cache.manager = getManager()
    }
    return cache.manager
}

export type ConfigManagerType = ReturnType<typeof getConfigsManager>
