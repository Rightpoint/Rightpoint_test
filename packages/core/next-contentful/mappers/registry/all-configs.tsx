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

const cache = {
    manager: null,
    clientOnly: null,
    serverOnly: null,
}

export const getConfigsManager = (): ReturnType<typeof getManager> => {
    if (!cache.manager) {
        /**
         * This will currently log from:
         * - imports to serverless functions
         * - imports via contentfulToReact()
         */
        cache.manager = getManager()

        /**
         * Future refactor notes on removing 99% of this dependency from the client side:
         * - Reduce bundle size
         * - Allow server-side code
         *
         * It was unknown whether Contentful depth limits or other issues would require a singular
         * class that could be used to fetch data client side or server-side.
         *
         * The fact it is mixed in a single class export also prevents Next.js from separating
         * server-side imports from client side imports, which is why currently Image.contentful.tsx uses
         * an expensive serverless function to process image blur/metadata.
         *
         * e.g. importing `plaiceholder` will break the build as it uses node.js specific imports at import resolution time.
         * Even a dynamic import will break the build.
         *
         * Today, near launch, the client side version of the manager is only used for:
         * - mapping contentTypeIds to Components in Component.component.tsx
         * - mapping contentTypeIds to Components in contentfulToReact()
         * - and finally mapper.prepareJsonUnsafeProps() in Component.component.tsx
         *      - and this is already discouraged because it won't work when a component needs to be used in a Page manually
         *         - so is not frequently used
         *      - and does not work with nested components without themselves using the Components main component.
         *         - e.g. ComponentA has componentBProps: await getComponentsProps([entryB]) <ComponentA {...componentBProps} /> won't work
         *           because Components is the layer that takes ComponentPropsWithMeta and renders a component / does the jsonUnsafeProps() call
         *
         * That means this entire manager is not needed on the client side with some refactoring.
         *
         * We need to extract the following from the component configs:
         * - contentTypeIds: dynamicComponent
         *   - this is used to map contentTypeIds to Components in Component.component.tsx and contentfulToReact()
         * - remove mapper.prepareJsonUnsafeProps()
         *   - most components in v2 round don't use it anymore for reasons above) entirely
         */
    }
    return cache.manager
}

export type ConfigManagerType = ReturnType<typeof getConfigsManager>
