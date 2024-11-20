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
    cardMapperConfig,
} from '@rightpoint/core/components'
import { seoMapperConfig, officePageMapperConfig } from '@rightpoint/core/pages'

export const getAllComponentMappers = () => {
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
        cardMapperConfig,

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

    return [...components, ...atoms]
}
