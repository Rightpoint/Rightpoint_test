import {
    bigLinkListMapperConfig,
    componentHeaderMapperConfig,
    heroMapperConfig,
    imageMapperConfig,
    linkMapperConfig,
    multiMediaMapperConfig,
    navigationBarMapperConfig,
    simpleGridMapperConfig,
    unstackerMapperConfig,
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
    ]
    const layout = [navigationMapperConfig]
    const components = [
        heroMapperConfig,
        unstackerMapperConfig,
        gridMapperConfig,
        simpleGridMapperConfig,
        bigLinkListMapperConfig,
        navigationBarMapperConfig,
        componentHeaderMapperConfig,
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
