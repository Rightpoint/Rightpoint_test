import type { ThoughtDetailEntry } from '@rightpoint/core/pages'

import { getClientEnvironment } from '../utils/get-client-environment'
import { createOrUpdateEntry } from '../utils/create-or-update-entry'
import { deterministicId } from '../utils/deterministic-id'
import { entryToLink } from '../utils/entry-to-link'
import { createMultiMediaAndAsset } from '../utils/create-multi-media-and-asset'

import { scrapeThoughtData } from './parse-thought-page'
import { getOrCreatePerson } from '../utils/get-or-create-author'

// uncomment, and see how we did it for work, if we need advanced scraping of different components
// import { importAllWorkComponents } from './components/import-all-components'
// import { importWorkCategories } from './import-work-categories'

/**
 * 1: Scrape work data from URL
 * 2: Identified section types in parse-work.ts (quote, text, image, etc)
 * 3: Scrape section specific type (e.g. quote, text, image, etc)
 * 4: Import to contentful section specific type
 */
const slugFromUrl = (url) => {
    return url.split('/').slice(-1)[0].toLowerCase()
}

const importThoughtEntry = async (url) => {
    console.log(' ')
    console.log(' ')
    console.log(' ')
    console.log(' ')
    console.log('######')
    console.log('BEGIN IMPORT THOUGHT: ', url)
    const environment = await getClientEnvironment()

    if (!environment) {
        return console.log('Failed to get environment')
    }

    console.log('BEGIN SCRAPE: ', url)
    const scraper = await scrapeThoughtData(url)
    console.log('COMPLETE SCRAPE: ', url)

    // /**
    //  * Make components
    //  */
    // const componentEntries = (
    //     await importAllWorkComponents({
    //         scraper,
    //         environment,
    //     })
    // ).filter(Boolean)
    // const componentEntryLinks = componentEntries.map((entry) =>
    //     entryToLink(entry, 'Entry')
    // )

    const slug = url.split('/').slice(-1)[0].toLowerCase()
    console.log('Slug:', slug)

    // const categories = await importWorkCategories({ scraper })

    const fields: Partial<ThoughtDetailEntry['fields']> = {
        name: 'Thought: ' + scraper.title,
        // skip this -- can't populate automatically. Writers must pick the "pull quote"
        // introduction:
        title: scraper.title,

        slug: slugFromUrl(url),
        body: await scraper.bodyDocument,

        // skip this -- most blog posts are simple and don't need components
        // components:
        media: scraper.image
            ? await createMultiMediaAndAsset({
                  environment,
                  title: `Thought: ${scraper.title}`,
                  description: '',
                  url: scraper.image,
                  asLinkReference: true,
              })
            : null,

        // introduction
        datePublished: scraper.dateISO,
        originalUrl: url, // we should store the URL so that we can redirect to the new one, or look up entries when transforming old links.

        authors: [
            entryToLink(
                (await getOrCreatePerson(scraper.author)) as any,
                'Entry'
            ),
        ].filter(Boolean), // filter out nulls

        // backgroundColor: '',
        // related: relatedWork.relatedHrefs.map((href) => {
        //     // need to take href and find related work reference. Can only be done later.
        //     // possibly manual step.
        // }),
    }
    console.log(' ')
    console.log('BEGIN THOUGHT ENTRY MAIN UPLOAD')
    const entry = await createOrUpdateEntry({
        environment,
        contentTypeId: 'pageThought',
        id: deterministicId('thought', fields.slug),
        fields,
    })
    console.log('COMPLETE THOUGHT IMPORT', url)
    return entry
}

const allThoughtUrls = [
    // this list is current as of 1/26/23 from Carie -- it excludes many articles intended for deletion.
    'https://www.rightpoint.com/thought/articles/2020/01/30/five-ways-to-thrive-in-the-experience-economy',
    'https://www.rightpoint.com/thought/articles/2020/02/13/10-ways-to-drive-adoption-for-your-mhealth-app',
    'https://www.rightpoint.com/thought/articles/2020/03/27/tips-tools-and-tactics-for-working-from-home',
    'https://www.rightpoint.com/thought/articles/2020/03/31/nine-ways-to-earn-executive-support-for-your-new-intranet',
    'https://www.rightpoint.com/thought/articles/2020/04/02/learn-how-to-do-more-with-teams-and-microsoft-365',
    'https://www.rightpoint.com/thought/articles/2020/04/09/the-new-competitive-advantage-is-experiences-for-customers-and-employees-alike',
    'https://www.rightpoint.com/thought/articles/2020/04/27/marketing-in-the-experience-economy-level-up-with-digital-operations',
    'https://www.rightpoint.com/thought/articles/2020/04/29/increase-conversions-with-ai-powered-product-discoverability',
    'https://www.rightpoint.com/thought/articles/2020/05/04/experience-led-transformation-in-todays-experience-economy-part-1',
    'https://www.rightpoint.com/thought/articles/2020/05/06/experience-led-transformation-in-todays-experience-economy-part-2',
    'https://www.rightpoint.com/thought/articles/2020/05/26/a-marketers-guide-to-customer-data-platforms-cdp',
    'https://www.rightpoint.com/thought/articles/2020/06/04/a-message-from-our-ceo',
    'https://www.rightpoint.com/thought/articles/2020/06/08/the-virtual-employee-experience',
    'https://www.rightpoint.com/thought/articles/2020/06/15/heres-the-missing-piece-to-the-customer-experience-conversation',
    'https://www.rightpoint.com/thought/articles/2020/06/26/post-pandemic-why-companies-should-shift-real-estate-budget-to-digital-and-the-employee-experience',
    'https://www.rightpoint.com/thought/articles/2020/06/29/how-5g-and-edge-computing-are-changing-the-personal-transportation-industry',
    'https://www.rightpoint.com/thought/articles/2020/07/01/app-clips-onboarding-for-your-everywhere-app',
    'https://www.rightpoint.com/thought/articles/2020/07/06/your-app-is-a-medical-device',
    'https://www.rightpoint.com/thought/articles/2020/07/07/the-future-of-apps-marketing-and-product',
    'https://www.rightpoint.com/thought/articles/2020/07/10/google-design-sprints-sprinting-in-a-hackathon',
    'https://www.rightpoint.com/thought/articles/2020/07/15/ios14-brings-security-without-sacrifice',
    'https://www.rightpoint.com/thought/articles/2020/07/16/voice-commerce-in-a-contactless-commerce-world',
    'https://www.rightpoint.com/thought/articles/2020/07/21/embracing-the-employee-experience-part-1',
    'https://www.rightpoint.com/thought/articles/2020/07/23/embracing-the-employee-experience-part-2',
    'https://www.rightpoint.com/thought/articles/2020/07/24/the-history-state-and-future-of-telemedicine',
    'https://www.rightpoint.com/thought/articles/2020/08/07/act-on-insight-taking-a-pit-stop-to-reach-a-new-audience',
    'https://www.rightpoint.com/thought/articles/2020/08/11/the-virtual-onboarding-experience',
    'https://www.rightpoint.com/thought/articles/2020/08/12/7-ways-digital-operations-support-the-modern-it-operations',
    'https://www.rightpoint.com/thought/articles/2020/08/19/remote-monitoring-and-telehealth-is-the-only-path-forward-for-providers',
    'https://www.rightpoint.com/thought/articles/2020/08/20/take-the-lead-the-attributes-of-an-experience-led-business',
    'https://www.rightpoint.com/thought/articles/2020/08/31/learning-for-the-future-of-work',
    'https://www.rightpoint.com/thought/articles/2020/09/16/episerver-acquires-optimizely-taking-the-guesswork-out-of-creating-personalized-customer-experiences',
    'https://www.rightpoint.com/thought/articles/2020/10/28/how-todays-leading-organizations-are-securing-their-futures-by-embracing-change-management',
    'https://www.rightpoint.com/thought/articles/2020/10/29/becoming-an-experience-led-company-part-1',
    'https://www.rightpoint.com/thought/articles/2020/11/09/becoming-an-experience-led-company-part-2',
    'https://www.rightpoint.com/thought/articles/2020/11/10/charities-chance-to-embrace-digital',
    'https://www.rightpoint.com/thought/articles/2020/11/11/watch-hulus-journey-to-create-brand-love',
    'https://www.rightpoint.com/thought/articles/2020/11/12/becoming-an-experience-led-company-part-3',
    'https://www.rightpoint.com/thought/articles/2020/11/14/becoming-an-experience-led-company-part-4',
    'https://www.rightpoint.com/thought/articles/2020/11/16/change-management-the-key-questions-to-set-your-technology-investment-up-for-success',
    'https://www.rightpoint.com/thought/articles/2020/12/02/measuring-change-management-success-defining-and-ensuring-a-solid-roi',
    'https://www.rightpoint.com/thought/articles/2020/12/07/cx-predictions-for-2021',
    'https://www.rightpoint.com/thought/articles/2020/12/09/power-the-pivot-how-to-innovate-with-research-and-strategy',
    'https://www.rightpoint.com/thought/articles/2020/12/14/power-the-pivot-creating-a-strategic-roadmap',
    'https://www.rightpoint.com/thought/articles/2020/12/16/connecting-the-principles-of-mindfulness-to-leadership-and-innovation',
    'https://www.rightpoint.com/thought/articles/2021/01/20/cultivating-connection-understanding-the-evolving-needs-of-your-customers-from-afar',
    'https://www.rightpoint.com/thought/articles/2021/01/20/emotion-carries-forge-meaningful-customer-relationships-by-building-emotional-loyalty',
    'https://www.rightpoint.com/thought/articles/2021/02/01/four-trends-to-consider-in-2021',
    'https://www.rightpoint.com/thought/articles/2021/02/01/modernize-your-enterprise-with-an-ecommerce-center-of-excellence',
    'https://www.rightpoint.com/thought/articles/2021/02/02/5-proven-strategies-for-delivering-a-superior-payments-experience',
    'https://www.rightpoint.com/thought/articles/2021/02/04/perspective-on-microsoft-viva-employee-experience-platform-exp',
    'https://www.rightpoint.com/thought/articles/2021/02/08/exp-is-our-dna-microsoft-viva-and-rightpoint',
    'https://www.rightpoint.com/thought/articles/2021/02/09/microsoft-viva-quick-take-manufacturing-and-the-front-line',
    'https://www.rightpoint.com/thought/articles/2021/03/01/5-examples-of-how-marketers-can-create-relevant-customer-lifecycle-messaging',
    'https://www.rightpoint.com/thought/articles/2021/03/01/wave-reviews-rightpoint-shines-in-forresters-customer-experience-strategy-consulting-report',
    'https://www.rightpoint.com/thought/articles/2021/03/03/point-of-no-return-to-reduce-churn-utilize-data-at-each-step-of-the-customer-journey',
    'https://www.rightpoint.com/thought/articles/2021/03/10/rate-of-return-the-roi-on-customer-experiences-is-hard-to-measure-but-present-throughout',
    'https://www.rightpoint.com/thought/articles/2021/03/11/maintaining-culture-during-a-pandemic-how-we-engage-with-our-team-virtually',
    'https://www.rightpoint.com/thought/articles/2021/03/29/balancing-your-customer-experience-and-employee-experience-through-2021',
    'https://www.rightpoint.com/thought/articles/2021/03/29/create-meaningful-user-experiences-by-making-an-app-part-of-your-digital-eco-system',
    'https://www.rightpoint.com/thought/articles/2021/03/30/the-4-key-technical-reasons-why-episerver-optimizely-is-an-obvious-dxp-leader',
    'https://www.rightpoint.com/thought/articles/2021/04/05/googles-may-update-explained-core-web-vitals-and-page-experience',
    'https://www.rightpoint.com/thought/articles/2021/04/09/the-havocs-of-war',
    'https://www.rightpoint.com/thought/articles/2021/04/09/the-magento-and-facebook-conversion-api-conundrum',
    'https://www.rightpoint.com/thought/articles/2021/04/19/content-and-commerce-complement-each-other-using-adobes-experience-cloud',
    'https://www.rightpoint.com/thought/articles/2021/04/28/the-rapid-innovation-sprint-as-an-accelerator-for-your-big-idea',
    'https://www.rightpoint.com/thought/articles/2021/05/13/aligning-your-employee-experience-in-merger-situations',
    'https://www.rightpoint.com/thought/articles/2021/05/20/change-does-you-good-experience-evolution-and-always-on-measurements-enable-quick-strategic-shifts',
    'https://www.rightpoint.com/thought/articles/2021/05/21/sitecore-bolsters-its-offerings-with-five-exciting-acquisitions',
    'https://www.rightpoint.com/thought/articles/2021/05/24/web3-and-non-fungible-tokens-signal-new-era-of-direct-to-consumer',
    'https://www.rightpoint.com/thought/articles/2021/05/25/mobile-wallets-create-fragmented-liquidity-the-opportunity-for-payments-evolution',
    'https://www.rightpoint.com/thought/articles/2021/05/27/gain-a-superpower-explore-the-apple-hig-and-android-material-io',
    'https://www.rightpoint.com/thought/articles/2021/05/27/we-are-all-digital-corporations-now',
    'https://www.rightpoint.com/thought/articles/2021/07/14/everything-developers-and-designers-need-to-know-about-safari-15',
    'https://www.rightpoint.com/thought/articles/2021/07/21/improve-your-employee-portal-experience-with-viva-connections',
    'https://www.rightpoint.com/thought/articles/2021/07/22/the-benefits-of-software-containerization',
    'https://www.rightpoint.com/thought/articles/2021/07/26/immersive-experience-benefits',
    'https://www.rightpoint.com/thought/articles/2021/07/28/reflections-on-shopify-unite',
    'https://www.rightpoint.com/thought/articles/2021/08/05/the-modern-guide-for-headless-commerce',
    'https://www.rightpoint.com/thought/articles/2021/08/25/the-impact-github-copilot-will-have-on-software-development',
    'https://www.rightpoint.com/thought/articles/2021/09/16/consumers-emerge-from-lockdown-set-to-default-mode',
    'https://www.rightpoint.com/thought/articles/2021/11/03/the-role-of-mobile-apps-in-the-omnichannel-experience',
    'https://www.rightpoint.com/thought/articles/2021/12/01/customer-experience-by-any-other-name-is-as-sweet-for-your-customers',
    'https://www.rightpoint.com/thought/articles/2021/12/09/forecasting-customer-experience-priorities-in-the-post-pandemic-era',
    'https://www.rightpoint.com/thought/articles/2022/01/04/nfts-and-cryptoart',
    'https://www.rightpoint.com/thought/articles/2022/01/24/avoid-confirmation-bias-and-level-up-your-stats',
    'https://www.rightpoint.com/thought/articles/2022/01/31/data-driven-roadmaps-enable-brands-to-go-the-distance',
    'https://www.rightpoint.com/thought/articles/2022/02/10/crafting-the-perfect-gift-guide',
    'https://www.rightpoint.com/thought/articles/2022/02/14/driving-scale-and-adoption',
    'https://www.rightpoint.com/thought/articles/2022/02/23/a-reflection-on-my-first-eight-months-at-rightpoint',
    'https://www.rightpoint.com/thought/articles/2022/03/10/5-considerations-for-e-commerce-brands-as-web3-approaches',
    'https://www.rightpoint.com/thought/articles/2022/03/16/nft-community-engagement-and-crypto-retail',
    'https://www.rightpoint.com/thought/articles/2022/03/22/entertainment-brands-are-the-new-commerce-powerhouses',
    'https://www.rightpoint.com/thought/articles/2022/03/22/three-steps-that-elevated-seaworlds-app-reviews-from-rough-to-rave',
    'https://www.rightpoint.com/thought/articles/2022/05/07/15-years-of-rightpoint',
    'https://www.rightpoint.com/thought/articles/2022/05/23/ambient-computing-google-closes-the-gap-at-google-io-2022',
    'https://www.rightpoint.com/thought/articles/2022/06/03/designing-voice-experiences',
    'https://www.rightpoint.com/thought/articles/2022/06/21/the-most-ubiquitous-mobile-application-platform-in-the-world',
    'https://www.rightpoint.com/thought/articles/2022/06/23/payments-are-the-new-marketplaces',
    'https://www.rightpoint.com/thought/articles/2022/06/24/the-personal-and-personalized-journey-through-life-itself',
    'https://www.rightpoint.com/thought/articles/2022/06/28/rightpoint-named-microsofts-2022-us-partner-of-the-year-for-employee-experience',
    'https://www.rightpoint.com/thought/articles/2022/07/05/the-time-of-employee-experience-is-here',
    'https://www.rightpoint.com/thought/articles/2022/07/08/new-guards-and-playbooks-for-the-luxury-digital-experience',
    'https://www.rightpoint.com/thought/articles/2022/07/11/test-blog',
    'https://www.rightpoint.com/thought/articles/2022/07/29/the-future-of-sitecore-a-modern-dxp',
    'https://www.rightpoint.com/thought/articles/2022/08/25/google-analytics-4',
    'https://www.rightpoint.com/thought/articles/2022/09/13/high-scale-adobe-commerce-in-the-wild',
    'https://www.rightpoint.com/thought/articles/2022/09/19/adobe-commerce-and-adobe-experience-manager-more-than-the-sum-of-their-parts',
    'https://www.rightpoint.com/thought/articles/2022/09/19/can-digital-solve-the-medication-non-adherence-problem',
    'https://www.rightpoint.com/thought/articles/2022/09/27/the-future-of-sitecore-the-composable-dxp-is-here',
    'https://www.rightpoint.com/thought/articles/2022/11/10/the-future-of-sitecore-content-is-at-the-core-of-the-dxp',
    'https://www.rightpoint.com/thought/articles/2022/11/15/a-culture-of-intrapreneurship',
    'https://www.rightpoint.com/thought/articles/2023/01/03/why-a-flexible-workspace-is-a-better-future',
]

const importAll = async ({ limit = null } = {}) => {
    for (let index = 0; index < allThoughtUrls.length; index++) {
        if (Number(limit)) {
            console.log('LIMITING IMPORT TO: ', limit)
            if (index >= limit) {
                console.log('LIMIT REACHED -- exiting')
                return
            }
        }

        const url = allThoughtUrls[index]
        try {
            await importThoughtEntry(url)
        } catch (ex) {
            console.log('!!!')
            console.log('!!!')
            console.error('ERROR IMPORTING THOUGHT', url, ex)
            console.error('ERROR IMPORTING THOUGHT', url, ex)
            console.error('ERROR IMPORTING THOUGHT', url, ex)
            console.log('!!!')
            console.log('!!!')
        }
    }
}

importAll()
