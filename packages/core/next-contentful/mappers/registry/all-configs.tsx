import {
    imageMapperConfig,
    linkMapperConfig,
    linkMapperNewConfig,
    multiMediaMapperConfig,
    simpleGridMapperConfig,
    workDetailTextMapperConfig,
    workDetailMediaMapperConfig,
    workDetailImpactMapperConfig,
    longRichTextMapperConfig,
    quoteMapperConfig,
    pardotMapperConfig,
    midArticleCtaMapperConfig,
    dynamicComponentMapperConfig,
    personPageMapperConfig,
    cardsListMapperConfig,
    verticalTabsMapperConfig,
    pageHeaderMapperConfig,
    headerMapperConfig,
    heroBannerMapperConfig,
    simpleContentMapperConfig,
    simpleCtaMapperConfig,
    componentGroupMapperConfig,
    horizontalCardsMapperConfig,
    inPageLinkListMapperConfig,
    // deprecated -- remove
    bigLinkListMapperConfig,
    heroMapperConfig,
    navigationBarMapperConfig,
    whatWeDeliverMapperConfig,
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
    officePageMapperConfig,
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

        // no person page exists, but we still want to use it for entry->card mapping
        personPageMapperConfig,

        // no office page exists, but we still want to use it for entry->card mapping
        officePageMapperConfig,
    ]
    const components = [
        // headers
        pageHeaderMapperConfig,
        headerMapperConfig,

        // components
        simpleGridMapperConfig,
        verticalTabsMapperConfig,
        quoteMapperConfig,

        // cards
        cardsListMapperConfig,
        horizontalCardsMapperConfig,

        // simple content
        simpleContentMapperConfig,
        simpleCtaMapperConfig,

        // work
        workDetailTextMapperConfig,
        workDetailMediaMapperConfig,
        workDetailImpactMapperConfig,

        // thought
        longRichTextMapperConfig,
        midArticleCtaMapperConfig,

        // pardot
        pardotMapperConfig,

        // dynamic
        dynamicComponentMapperConfig,

        heroBannerMapperConfig,

        componentGroupMapperConfig,
        inPageLinkListMapperConfig,

        // deprecated -- remove
        whatWeDeliverMapperConfig,
        heroMapperConfig,
        bigLinkListMapperConfig,
        navigationBarMapperConfig,

        // removed but commented in case it needs to be re-introduced
        // personMapperConfig,
    ]
    const atoms = [
        imageMapperConfig,
        multiMediaMapperConfig,
        linkMapperConfig,
        linkMapperNewConfig,
        seoMapperConfig,
    ]
    const manager = ConfigsManager.init([...pages, ...components, ...atoms])
    return manager
}

export const getConfigsManager = (): ReturnType<typeof getManager> => {
    if (!cache.manager) {
        console.log('Instantiated a manager')
        cache.manager = getManager()
    }
    return cache.manager
}

export type ConfigManagerType = ReturnType<typeof getConfigsManager>
