import * as contentful from 'contentful-management'
import { parse } from 'node-html-parser'
import axios from 'axios'
import { richTextFromMarkdown } from '@contentful/rich-text-from-markdown'
import {
    Document,
    Block,
    Inline,
    Text,
    BLOCKS,
} from '@contentful/rich-text-types'

import crypto from 'crypto'

import {
    LongRichTextEntry,
    MultiMediaEntry,
    PersonEntry,
} from '@rightpoint/core/components'
import { ThoughtDetailEntry } from '@rightpoint/core/pages'
import fs from 'fs'
import { Asset, Entry } from 'contentful'
import { get } from 'lodash'
import { metadataTags } from './importer-v2/utils/import-metadata'

const client = contentful.createClient({
    accessToken: 'CFPAT-tMvr0fC6duHbTee3S-iH0XSUfjJCvJHcC4G1MIFU-qE',
})

const SPACE_ID = '82nyha70yb5v'
// const ENVIRONMENT_ID = 'staging'
const ENVIRONMENT_ID = 'master-10-09-22-pre-clone'
const THOUGHT_CONTENT_TYPE_ID = 'pageThought'

const truncate = (input, length) =>
    input.length > length ? `${input.substring(0, length)}...` : input

const getOrFetch = async (url) => {
    const finalPath = url.split('/').slice(-1)[0]
    const localPath = __dirname + '/cache/' + finalPath
    let responseData
    console.log('Fetching: ', finalPath)
    try {
        responseData = fs.readFileSync(localPath)
        console.log('File found in cache', localPath)
    } catch (ex) {
        console.log('No file found')
        // otherwise, fetch from URL and save it
        const response = await axios.get(url).catch((error) => null)

        // catch 403 that CF/RP sometimes sends
        if (!response) {
            console.error('No response')
            return null
        }
        try {
            fs.writeFileSync(localPath, response.data)
        } catch (ex) {
            console.error('Write error', ex)
        }
        responseData = response.data
    }
    return responseData
}
/**
 * Parse website.com careers endpoint HTML and convert to usable shape.
 */
const scrapeThoughtData = async (url) => {
    const data = await getOrFetch(url)
    if (!data) {
        console.log('Scrape failed. Skipping')
        return null
    }

    const root = parse(data)

    const TurndownService = require('turndown')
    const turndownService = new TurndownService()
    turndownService.addRule('headings', {
        filter: ['h3', 'h4', 'h5', 'h6'],
        replacement: (content) => {
            console.log('REPLACING HEADING', content)
            return '## ' + content + '\n\n'
        },
    })

    const parseRoot = {
        get author() {
            const author = root.querySelector('.thought-header__author')
            if (author) {
                return {
                    name: author
                        .querySelector('.thought-header__author__name')
                        ?.text.trim()
                        // remove the comma
                        .replace(',', ''),
                    jobTitle: author
                        .querySelector('.thought-header__author__position')
                        ?.text.trim(),
                }
            }
        },
        get dateISO() {
            const dateString = root
                .querySelector('.thought-header-date')
                ?.text.trim()
            try {
                return new Date(dateString).toISOString()
            } catch (ex) {
                console.log('Failed to convert date', dateString)
            }
        },
        get title() {
            return root.querySelector('h1')?.text.trim() || 'No title found'
        },
        get image() {
            return root
                .querySelector('.thought-header__image source:first-child')
                ?.getAttribute('srcset')
        },
        get categories() {
            return root
                .querySelector('.thought-header__categories')
                ?.text.trim()
        },
        get htmlToMarkdown() {
            return root
                .querySelectorAll('.text-multiple-columns__content')
                ?.map((node) => turndownService.turndown(node.innerHTML))
        },
        get richTextAsync() {
            return (async () => {
                // https://github.com/contentful/rich-text/tree/master/packages/rich-text-from-markdown
                return richTextFromMarkdown(
                    parseRoot.htmlToMarkdown?.join('') || '# no content',
                    (node) => {
                        /**
                         * This is not triggering for [] images for some reason.
                         */
                        process.env.NODE_ENV !== 'production' &&
                            console.log('unsupported node: ', node)
                        return null
                    }
                )
            })()
        },
    }
    return {
        document: await parseRoot.richTextAsync,
        ...parseRoot,
    }
}

const wait = async (time = 1000) => {
    const promise = new Promise((success, failure) => {
        setTimeout(() => {
            success(true)
        }, time)
    })
    return promise
}

const createLongRichTextEntry = async (environment, { url }) => {
    const LONG_RICH_TEXT_CONTENT_TYPE_ID = 'longRichText'
    const scrapeData_ = await scrapeThoughtData(url)
    const scrapeData: Exclude<typeof scrapeData_, any[]> = scrapeData_ as any
    const documentWithAssets = await replaceImagesTextWithAssets(
        scrapeData.document,
        environment,
        scrapeData
    )
    const fields: LongRichTextEntry['fields'] = {
        internalName: `Article/${truncate(scrapeData.title, 20)} - Text`,
        text: documentWithAssets,
    }
    const entry = await environment
        .createEntry(LONG_RICH_TEXT_CONTENT_TYPE_ID, {
            fields: transformToLocale(fields, 'en-US'),
            metadata: metadataTags,
        })
        .then((entry) => entry.publish())

    console.log('Done uploading long rich text entry', entry.sys.id)
    console.log(' ')
    return [entry, scrapeData] as const
}

/**
 * Given a contentful rich text document,
 * the converter leaves media as text nodes:
 * ![](/-/media/high scale adobe commerce in the wild image 4.png?la=en)
 * Find these locations, and:
 * - Upload asset
 * - Replace the text node with a link to the asset
 */
const replaceImagesTextWithAssets = async (
    document: Document,
    environment,
    scrapeData: Awaited<ReturnType<typeof scrapeThoughtData>>
) => {
    /**
     *
     * Block is a type that contains nodeTypes that are of BLOCK enum
     * Inline is a type that contains nodeTypes that are of INLINE enum
     */
    let imageCount = 1
    type ContentContainingNodeTypes = Block | Inline | Document
    type Nodes = Inline | Block | Document | Text
    async function recurse<T>(node: T)
    async function recurse(node: Nodes) {
        /**
         * If there's content, they are an array of nodes.
         */
        const isDocumentBlockOrInline = (
            node
        ): node is ContentContainingNodeTypes => !!node.content
        if (isDocumentBlockOrInline(node)) {
            const newContent = []
            /**
             * Await sequentially to avoid rate limiting
             */
            for await (const content of node.content) {
                newContent.push(await recurse(content))
            }
            node.content = newContent
        }

        const transformMarkdownFormattedImageNodes = async (node) => {
            /**
             * Check if this node contains a child text node
             * that contains a markdown formatted image
             */
            const isProbableMarkdownImage = (value) => value.includes('![]')
            const isParentOfChildWithMarkdown = (node) => {
                const child = get(node, 'content[0]')
                const childIsText = child && child.nodeType === 'text'
                const childIsMarkdownImage =
                    childIsText && isProbableMarkdownImage(child.value)
                return childIsMarkdownImage
            }

            /**
             * If so, upload the asset, and replace the node.
             */
            if (isParentOfChildWithMarkdown(node)) {
                const child = get(node, 'content[0]')
                const getMarkdownUrlRegex = new RegExp(
                    /!\[[^\]]*\]\((?<filename>.*?)(?=\"|\))(?<optional>\".*\")?\)/
                )
                const matches = getMarkdownUrlRegex.exec(child.value)
                const groups = matches.groups
                const filename = groups.filename
                const asset = await createAsset(environment, {
                    title: `${truncate(scrapeData.title, 20)} - #${imageCount}`,
                    description: '',
                    // RP urls have spaces
                    url: encodeURI(filename),
                    domain: 'https://www.rightpoint.com',
                })
                imageCount += 1
                node = {
                    /**
                     * Both embedded entries and contentful Assets are of type 'embedded-entry'
                     */
                    nodeType: BLOCKS.EMBEDDED_ASSET,
                    content: [
                        // remove the text content.
                    ],
                    data: {
                        target: createLink(asset, 'Asset'),
                    },
                }
            }
            return node
        }
        node = await transformMarkdownFormattedImageNodes(node)

        /**
         * Link transformation should be done later in a separate process
         * after all content is uploaded.
         *
         * We can transform links in various rich texts to reference entries instead of URLs.
         *
         * - Work link
         * - Article link
         * - We can also log links
         */
        return node
    }
    return await recurse(document)
}
type CreateLink = (entry: Entry<any> | Asset, type: 'Entry' | 'Asset') => any
const createLink: CreateLink = (entry, type) => {
    return {
        sys: {
            type: 'Link',
            linkType: type || 'Entry',
            id: entry.sys.id,
        },
    }
}

const getOrCreateAssetById = (id) => {}

/**
 * Create an asset with title from remote URL
 * https://www.contentful.com/developers/docs/references/content-management-api/#/reference/assets/asset/create-update-an-asset/console/js
 */
type CreateAsset = (
    environment: any,
    options: {
        title: string
        description: string
        domain: string
        url: string
        filenameOverride?: string
    }
) => Promise<Asset>
const createAsset: CreateAsset = async (
    environment,
    { title, description, domain, url, filenameOverride }
) => {
    if (!url) {
        return null
    }
    const stripQueryString = (v: string) => v.split('?')[0]
    const getFilenameFromUrl = (v: string) => v.split('/').slice(-1)[0]

    const filename = getFilenameFromUrl(url)
    const filenameWithoutQueryString = stripQueryString(filename)
    const urlWithoutQueryString = stripQueryString(url)
    const uploadUrl = domain + urlWithoutQueryString
    const extension = urlWithoutQueryString.split('.').slice(-1)[0]

    const contentType = 'image/' + extension
    console.log('Content type: ', contentType)
    console.log('Filename:', filenameWithoutQueryString)
    console.log('Remote URL: ', uploadUrl)

    // create an ID to prevent duplicate uploads
    const md5 = crypto.createHash('md5')
    md5.update(uploadUrl)
    const VERSION = 'V1'
    const hashedId = VERSION + md5.digest('hex')

    console.log('Checking if asset exists...')
    // check if asset exists
    let asset = await environment
        .getAsset(hashedId)
        .then((asset) => {
            // asset exists
            console.log('- Asset already exists, skipping create.', hashedId)
            return asset
        })
        .catch((err) => {
            // asset doesn't exist
            console.log("- Asset doesn't exist, creating.", hashedId)
        })

    // if no asset, create it.
    if (!asset) {
        asset = await environment
            .createAssetWithId(hashedId, {
                fields: {
                    title: {
                        'en-US': title,
                    },
                    description: {
                        'en-US': description,
                    },
                    file: {
                        'en-US': {
                            contentType,
                            fileName:
                                filenameOverride ?? filenameWithoutQueryString,
                            upload: uploadUrl,
                        },
                    },
                },
            })
            // process images
            .then((asset) => asset.processForAllLocales())
            // publish asset
            .then((asset) => asset.publish())
    }

    console.log('Done handling asset')
    console.log(' ')
    return asset
}

const createMultiMediaEntry = async (
    environment,
    {
        title,
        assetLink,
    }: { title: string; assetLink: Awaited<ReturnType<typeof createAsset>> }
) => {
    console.log('Creating MultiMedia entry: ', title)
    /**
     * The deterministic ID is used to prevent duplicate entries;
     * Version + MM (MultiMedia) + ID of Asset
     * V1-MM-ASSET-ID
     */
    const VERSION = 'V1'
    const PREFIX = 'MM-'
    const deterministicId = `${VERSION}${PREFIX}${assetLink.sys.id}`

    let entry = await environment
        .getEntry(deterministicId)
        .then((entry) => {
            console.log('MultiMedia already exists')
            return entry
        })
        .catch((err) => {})

    if (!entry) {
        console.log(
            'MultiMedia does not exist. Creating with id: ',
            deterministicId
        )
        const MULTI_MEDIA_CONTENT_TYPE_ID = 'multiMedia'
        const fields: MultiMediaEntry['fields'] = {
            internalTitle: `Article Media: ${truncate(title, 40)}`,
            image: assetLink,
        }
        entry = await environment
            .createEntryWithId(MULTI_MEDIA_CONTENT_TYPE_ID, deterministicId, {
                fields: transformToLocale(fields, 'en-US'),
                metadata: metadataTags,
            })
            .then((entry) => entry.publish())
            .catch((err) => {
                console.log(err)
                // asset exists
            })
    }
    console.log('Done handling MultiMedia')
    console.log(' ')
    return entry
}

const getOrCreatePerson = async (
    environment: contentful.Environment,
    {
        scrapeData,
    }: { scrapeData: Awaited<ReturnType<typeof scrapeThoughtData>> }
) => {
    const { author } = scrapeData
    if (!author) {
        console.log('No author found')
        return null
    }

    // author...

    const results = await environment.getEntries({
        content_type: 'person',
        'fields.name': author.name,
    })

    let person = get(results, 'items[0]')
    if (!person) {
        console.log("Person doesn't exist matching name. Creating...")
        const fields: PersonEntry['fields'] = {
            internalName: `Person/${author.name}`,
            name: author.name,
            jobTitle: author.jobTitle,
        }
        person = await environment
            .createEntry('person', {
                fields: transformToLocale(fields, 'en-US'),
                metadata: metadataTags,
            })
            .then((entry) => entry.publish())
    }
    console.log('Done handling person')
    console.log(' ')
    return person
}

const migrateAllThoughtEntries = (urls) => {
    client
        .getSpace(SPACE_ID)
        .then((space) => space.getEnvironment(ENVIRONMENT_ID))
        .then(async (environment) => {
            for (const url of urls) {
                try {
                    await migrateOneThoughtEntry(environment, url)
                } catch (ex) {
                    console.error('Failed to migrate one entry', url, ex)
                }
            }
        })
        .then((entry) => console.log(entry))
        .catch(console.error)
}

async function migrateOneThoughtEntry(
    environment: contentful.Environment,
    url: string
) {
    const [richTextEntry, scrapeData] = await createLongRichTextEntry(
        environment,
        {
            url: url,
        }
    )
    /**
     * Create the main image asset
     */
    const asset = await createAsset(environment, {
        url: scrapeData.image,
        title: truncate(scrapeData.title, 40),
        description: '',
        domain: 'https://www.rightpoint.com',
    })
    /**
     * We have the asset, now we need to create a multi media entry
     */
    const multiMediaEntry = await createMultiMediaEntry(environment, {
        title: scrapeData.title,
        assetLink: createLink(asset, 'Asset'),
    })

    /**
     * Generate author
     */
    const personEntry = getOrCreatePerson(environment, {
        scrapeData,
    })

    const slug = url.split('/').slice(-1)[0].toLowerCase()
    console.log('Slug should be:', slug)
    /**
     * The deterministic ID is used to prevent duplicate entries;
     * V1-TA-SLUG-HASH
     */
    const VERSION = 'V1'
    const PREFIX = 'TA-'
    const md5 = crypto.createHash('md5')
    md5.update(slug)
    const hashedId = VERSION + md5.digest('hex')
    const deterministicId = `${VERSION}${PREFIX}${hashedId}`
    console.log('Deterministic id', deterministicId)
    const deleteEntryIfExists = async (deterministicId: string) => {
        const entry = await environment
            .getEntry(deterministicId)
            .then((entry) => {
                console.log('Entry already exists')
                return entry
            })
            .catch((err) => {
                console.log('Entry does not exist')
            })
        if (entry) {
            await entry.unpublish().then((entry) => entry.delete())
            console.log(
                'Deleting thought entry for re-upload. Assets/media are already de-duped'
            )
        }
    }

    await deleteEntryIfExists(deterministicId)

    const fields: Partial<ThoughtDetailEntry['fields']> = {
        name: `Article/${scrapeData.title}`,
        title: scrapeData.title,
        datePublished: scrapeData.dateISO,
        media: createLink(multiMediaEntry, 'Entry'),
        components: [createLink(richTextEntry, 'Entry') as any],
        // not reliable. i should parse the actual url fragment, because we are redirecting.
        slug: slug,
        originalUrl: url, // we should store the URL so that we can redirect to the new one, or look up entries when transforming old links.
        authors: [createLink(await personEntry, 'Entry')],
    }

    const thoughtEntry = await environment
        .createEntryWithId(THOUGHT_CONTENT_TYPE_ID, deterministicId, {
            fields: transformToLocale(fields, 'en-US'),
            metadata: metadataTags,
        })
        .then((entry) => entry.publish())
}

const transformToLocale = (fields, locale) => {
    return Object.entries(fields).reduce((acc, [key, value]) => {
        acc[key] = {
            [locale]: value,
        }
        return acc
    }, {})
}
const urls = [
    'https://www.rightpoint.com/Thought/Articles/2022/09/19/Can-Digital-Solve-the-Medication-Non-Adherence-Problem',
    'https://www.rightpoint.com/Thought/Articles/2022/09/19/Adobe-Commerce-and-Adobe-Experience-Manager-More-Than-the-Sum-of-Their-Parts',
    'https://www.rightpoint.com/Thought/Articles/2022/09/13/High-Scale-Adobe-Commerce-in-the-Wild',
    'https://www.rightpoint.com/Thought/Articles/2022/08/25/Google-Analytics-4',
    'https://www.rightpoint.com/Thought/Articles/2022/07/29/The-Future-of-Sitecore-A-Modern-DXP',
    'https://www.rightpoint.com/Thought/Articles/2022/07/11/test-blog',
    'https://www.rightpoint.com/Thought/Articles/2022/07/08/New-Guards-and-Playbooks-for-the-Luxury-Digital-Experience',
    'https://www.rightpoint.com/Thought/Articles/2022/07/05/The-Time-of-Employee-Experience-is-Here',
    'https://www.rightpoint.com/Thought/Articles/2022/06/28/Rightpoint-Named-Microsofts-2022-US-Partner-of-the-Year-for-Employee-Experience',
    'https://www.rightpoint.com/Thought/Articles/2022/06/24/The-Personal-and-Personalized-Journey-through-LIFE-ITSELF',
    'https://www.rightpoint.com/Thought/Articles/2022/06/23/Payments-are-the-New-Marketplaces',
    'https://www.rightpoint.com/Thought/Articles/2022/06/21/The-Most-Ubiquitous-Mobile-Application-Platform-in-the-World',
    'https://www.rightpoint.com/Thought/Articles/2022/06/03/Designing-Voice-Experiences',
    'https://www.rightpoint.com/Thought/Articles/2022/05/23/Ambient-Computing-Google-Closes-the-Gap-at-Google-IO-2022',
    'https://www.rightpoint.com/Thought/Articles/2022/05/07/15-Years-of-Rightpoint',
    'https://www.rightpoint.com/Thought/Articles/2022/03/22/Three-Steps-That-Elevated-SeaWorlds-App-Reviews-From-Rough-to-Rave',
    'https://www.rightpoint.com/Thought/Articles/2022/03/22/Entertainment-Brands-Are-the-New-Commerce-Powerhouses',
    'https://www.rightpoint.com/Thought/Articles/2022/03/16/NFT-Community-Engagement-and-Crypto-Retail',
    'https://www.rightpoint.com/Thought/Articles/2022/03/10/5-Considerations-for-E-Commerce-Brands-as-Web3-Approaches',
    'https://www.rightpoint.com/Thought/Articles/2022/02/23/A-Reflection-on-My-First-Eight-Months-at-Rightpoint',
    'https://www.rightpoint.com/Thought/Articles/2022/02/14/Driving-Scale-and-Adoption',
    'https://www.rightpoint.com/Thought/Articles/2022/02/10/Crafting-the-Perfect-Gift-Guide',
    'https://www.rightpoint.com/Thought/Articles/2022/01/31/Data-Driven-Roadmaps-Enable-Brands-to-Go-the-Distance',
    'https://www.rightpoint.com/Thought/Articles/2022/01/24/Avoid-Confirmation-Bias-and-Level-Up-Your-Stats',
    'https://www.rightpoint.com/Thought/Articles/2022/01/04/NFTs-and-Cryptoart',
    'https://www.rightpoint.com/Thought/Articles/2021/12/09/Forecasting-Customer-Experience-Priorities-in-the-Post-Pandemic-Era',
    'https://www.rightpoint.com/Thought/Articles/2021/12/01/Customer-Experience-By-Any-Other-Name-is-as-Sweet-for-Your-Customers',
    'https://www.rightpoint.com/Thought/Articles/2021/11/03/The-Role-of-Mobile-Apps-in-the-Omnichannel-Experience',
    'https://www.rightpoint.com/Thought/Articles/2021/09/16/Consumers-Emerge-from-Lockdown-Set-to-Default-Mode',
    'https://www.rightpoint.com/Thought/Articles/2021/08/25/The-Impact-GitHub-Copilot-Will-Have-on-Software-Development',
    'https://www.rightpoint.com/Thought/Articles/2021/08/05/The-Modern-Guide-for-Headless-Commerce',
    'https://www.rightpoint.com/Thought/Articles/2021/07/28/Reflections-on-Shopify-Unite',
    'https://www.rightpoint.com/Thought/Articles/2021/07/26/Immersive-Experience-Benefits',
    'https://www.rightpoint.com/Thought/Articles/2021/07/22/The-Benefits-of-Software-Containerization',
    'https://www.rightpoint.com/Thought/Articles/2021/07/21/Improve-Your-Employee-Portal-Experience-with-Viva-Connections',
    'https://www.rightpoint.com/Thought/Articles/2021/07/14/Everything-Developers-and-Designers-Need-to-Know-About-Safari-15',
    'https://www.rightpoint.com/Thought/Articles/2021/05/27/We-Are-All-Digital-Corporations-Now',
    'https://www.rightpoint.com/Thought/Articles/2021/05/27/Gain-a-Superpower-Explore-the-Apple-HIG-and-Android-Material-io',
    'https://www.rightpoint.com/Thought/Articles/2021/05/25/Mobile-Wallets-Create-Fragmented-Liquidity-The-Opportunity-for-Payments-Evolution',
    'https://www.rightpoint.com/Thought/Articles/2021/05/24/Web3-and-Non-Fungible-Tokens-Signal-New-Era-of-Direct-to-Consumer',
    'https://www.rightpoint.com/Thought/Articles/2021/05/21/Sitecore-Bolsters-its-Offerings-With-Five-Exciting-Acquisitions',
    'https://www.rightpoint.com/Thought/Articles/2021/05/20/Change-Does-You-Good-Experience-Evolution-and-Always-On-Measurements-Enable-Quick-Strategic-Shifts',
    'https://www.rightpoint.com/Thought/Articles/2021/05/13/Aligning-Your-Employee-Experience-in-Merger-Situations',
    'https://www.rightpoint.com/Thought/Articles/2021/04/28/The-Rapid-Innovation-Sprint-as-an-Accelerator-for-Your-Big-Idea',
    'https://www.rightpoint.com/Thought/Articles/2021/04/19/Content-and-Commerce-Complement-Each-Other-Using-Adobes-Experience-Cloud',
    'https://www.rightpoint.com/Thought/Articles/2021/04/09/The-Magento-and-Facebook-Conversion-API-Conundrum',
    'https://www.rightpoint.com/Thought/Articles/2021/04/09/The-Havocs-of-War',
    'https://www.rightpoint.com/Thought/Articles/2021/04/05/Googles-May-Update-Explained-Core-Web-Vitals-and-Page-Experience',
    'https://www.rightpoint.com/Thought/Articles/2021/03/30/The-4-Key-Technical-Reasons-Why-Episerver-Optimizely-is-an-Obvious-DXP-Leader',
    'https://www.rightpoint.com/Thought/Articles/2021/03/29/Create-Meaningful-User-Experiences-by-Making-an-App-Part-of-Your-Digital-Eco-System',
    'https://www.rightpoint.com/Thought/Articles/2021/03/29/Balancing-your-Customer-Experience-and-Employee-Experience-Through-2021',
    'https://www.rightpoint.com/Thought/Articles/2021/03/11/Maintaining-Culture-During-a-Pandemic-How-We-Engage-With-Our-Team-Virtually',
    'https://www.rightpoint.com/Thought/Articles/2021/03/10/Rate-of-Return-The-ROI-on-Customer-Experiences-is-Hard-to-Measure-but-Present-Throughout',
    'https://www.rightpoint.com/Thought/Articles/2021/03/03/Point-of-No-Return-To-Reduce-Churn-Utilize-Data-at-Each-Step-of-the-Customer-Journey',
    'https://www.rightpoint.com/Thought/Articles/2021/03/01/Wave-Reviews-Rightpoint-Shines-in-Forresters-Customer-Experience-Strategy-Consulting-Report',
    'https://www.rightpoint.com/Thought/Articles/2021/03/01/5-Examples-of-How-Marketers-Can-Create-Relevant-Customer-Lifecycle-Messaging',
    'https://www.rightpoint.com/Thought/Articles/2021/02/09/Microsoft-Viva-Quick-Take-Manufacturing-and-the-Front-Line',
    'https://www.rightpoint.com/Thought/Articles/2021/02/08/EXP-is-our-DNA-Microsoft-Viva-and-Rightpoint',
    'https://www.rightpoint.com/Thought/Articles/2021/02/04/Perspective-on-Microsoft-Viva-Employee-Experience-Platform-EXP',
    'https://www.rightpoint.com/Thought/Articles/2021/02/02/5-Proven-Strategies-for-Delivering-a-Superior-Payments-Experience',
    'https://www.rightpoint.com/Thought/Articles/2021/02/01/Modernize-Your-Enterprise-With-an-eCommerce-Center-of-Excellence',
    'https://www.rightpoint.com/Thought/Articles/2021/02/01/Four-Trends-to-Consider-in-2021',
    'https://www.rightpoint.com/Thought/Articles/2021/01/20/Emotion-Carries-Forge-Meaningful-Customer-Relationships-By-Building-Emotional-Loyalty',
    'https://www.rightpoint.com/Thought/Articles/2021/01/20/Cultivating-Connection-Understanding-the-Evolving-Needs-of-Your-Customers-from-Afar',
    'https://www.rightpoint.com/Thought/Articles/2020/12/16/Connecting-the-Principles-of-Mindfulness-to-Leadership-and-Innovation',
    'https://www.rightpoint.com/Thought/Articles/2020/12/14/Power-the-Pivot-Creating-a-Strategic-Roadmap',
    'https://www.rightpoint.com/Thought/Articles/2020/12/09/Power-the-Pivot-How-to-Innovate-with-Research-and-Strategy',
    'https://www.rightpoint.com/Thought/Articles/2020/12/07/CX-Predictions-for-2021',
    'https://www.rightpoint.com/Thought/Articles/2020/12/02/Measuring-Change-Management-Success-Defining-and-Ensuring-a-Solid-ROI',
    'https://www.rightpoint.com/Thought/Articles/2020/11/16/Change-Management-The-Key-Questions-to-Set-Your-Technology-Investment-Up-for-Success',
    'https://www.rightpoint.com/Thought/Articles/2020/11/14/Becoming-an-Experience-led-Company-Part-4',
    'https://www.rightpoint.com/Thought/Articles/2020/11/12/Becoming-an-Experience-led-Company-Part-3',
    'https://www.rightpoint.com/Thought/Articles/2020/11/11/Watch-Hulus-Journey-to-Create-Brand-Love',
    'https://www.rightpoint.com/Thought/Articles/2020/11/10/Charities-Chance-to-Embrace-Digital',
    'https://www.rightpoint.com/Thought/Articles/2020/11/09/Becoming-an-Experience-led-Company-Part-2',
    'https://www.rightpoint.com/Thought/Articles/2020/10/29/Becoming-an-Experience-led-Company-Part-1',
    'https://www.rightpoint.com/Thought/Articles/2020/10/28/How-Todays-Leading-Organizations-Are-Securing-Their-Futures-by-Embracing-Change-Management',
    'https://www.rightpoint.com/Thought/Articles/2020/09/16/Episerver-Acquires-Optimizely-Taking-the-Guesswork-Out-of-Creating-Personalized-Customer-Experiences',
    'https://www.rightpoint.com/Thought/Articles/2020/08/31/Learning-for-the-Future-of-Work',
    'https://www.rightpoint.com/Thought/Articles/2020/08/20/Take-the-Lead-The-Attributes-of-an-Experience-Led-Business',
    'https://www.rightpoint.com/Thought/Articles/2020/08/19/Remote-Monitoring-and-Telehealth-is-the-Only-Path-Forward-for-Providers',
    'https://www.rightpoint.com/Thought/Articles/2020/08/12/7-Ways-Digital-Operations-Support-the-Modern-IT-Operations',
    'https://www.rightpoint.com/Thought/Articles/2020/08/11/The-Virtual-Onboarding-Experience',
    'https://www.rightpoint.com/Thought/Articles/2020/08/07/Act-on-Insight-Taking-a-Pit-Stop-to-Reach-a-New-Audience',
    'https://www.rightpoint.com/Thought/Articles/2020/07/24/The-History-State-and-Future-of-Telemedicine',
    'https://www.rightpoint.com/Thought/Articles/2020/07/23/Embracing-the-Employee-Experience-Part-2',
    'https://www.rightpoint.com/Thought/Articles/2020/07/21/Embracing-the-Employee-Experience-Part-1',
    'https://www.rightpoint.com/Thought/Articles/2020/07/16/Voice-Commerce-in-a-Contactless-Commerce-World',
    'https://www.rightpoint.com/Thought/Articles/2020/07/15/iOS14-Brings-Security-Without-Sacrifice',
    'https://www.rightpoint.com/Thought/Articles/2020/07/10/Google-Design-Sprints-Sprinting-in-a-Hackathon',
    'https://www.rightpoint.com/Thought/Articles/2020/07/07/The-Future-of-Apps-Marketing-and-Product',
    'https://www.rightpoint.com/Thought/Articles/2020/07/06/Your-App-is-a-Medical-Device',
    'https://www.rightpoint.com/Thought/Articles/2020/07/01/App-Clips-Onboarding-for-Your-Everywhere-App',
    'https://www.rightpoint.com/Thought/Articles/2020/06/29/How-5G-and-Edge-Computing-are-Changing-the-Personal-Transportation-Industry',
    'https://www.rightpoint.com/Thought/Articles/2020/06/26/Post-Pandemic-Why-Companies-Should-Shift-Real-Estate-Budget-to-Digital-and-the-Employee-Experience',
    'https://www.rightpoint.com/Thought/Articles/2020/06/15/Heres-the-Missing-Piece-to-the-Customer-Experience-Conversation',
    'https://www.rightpoint.com/Thought/Articles/2020/06/08/The-Virtual-Employee-Experience',
    'https://www.rightpoint.com/Thought/Articles/2020/06/04/A-Message-from-Our-CEO',
    'https://www.rightpoint.com/Thought/Articles/2020/05/26/A-Marketers-Guide-to-Customer-Data-Platforms-CDP',
    'https://www.rightpoint.com/Thought/Articles/2020/05/06/Experience-led-Transformation-in-Todays-Experience-Economy-Part-2',
    'https://www.rightpoint.com/Thought/Articles/2020/05/04/Experience-led-Transformation-in-Todays-Experience-Economy-Part-1',
    'https://www.rightpoint.com/Thought/Articles/2020/04/29/Increase-Conversions-with-AI-Powered-Product-Discoverability',
    'https://www.rightpoint.com/Thought/Articles/2020/04/27/Marketing-in-the-Experience-Economy-Level-Up-with-Digital-Operations',
    'https://www.rightpoint.com/Thought/Articles/2020/04/09/The-New-Competitive-Advantage-Is-Experiences-For-Customers-And-Employees-Alike',
    'https://www.rightpoint.com/Thought/Articles/2020/04/02/Learn-How-to-do-More-with-Teams-and-Microsoft-365',
    'https://www.rightpoint.com/Thought/Articles/2020/03/31/Nine-Ways-to-Earn-Executive-Support-for-Your-New-Intranet',
    'https://www.rightpoint.com/Thought/Articles/2020/03/27/Tips-Tools-and-Tactics-for-Working-from-Home',
    'https://www.rightpoint.com/Thought/Articles/2020/02/13/10-Ways-to-Drive-Adoption-for-Your-mHealth-App',
    'https://www.rightpoint.com/Thought/Articles/2020/01/30/Five-ways-to-thrive-in-the-experience-economy',
    'https://www.rightpoint.com/Thought/Articles/2020/01/23/The-Experience-Economy-at-CES',
    'https://www.rightpoint.com/Thought/Articles/2019/10/09/Product-Innovation----The-Power-of-Adjacency-to-Change-Your-World',
    'https://www.rightpoint.com/Thought/Articles/2019/09/18/Innovating-Innovation',
    'https://www.rightpoint.com/Thought/Articles/2019/08/27/Driving-Customer-Loyalty-Using-Conversational-UI',
    'https://www.rightpoint.com/Thought/Articles/2019/07/12/Your-Digital-Experience-Takes-Too-Long',
    'https://www.rightpoint.com/Thought/Articles/2019/03/22/Digital-Therapeutics-and-Software-as-Medical-Devices',
    'https://www.rightpoint.com/Thought/Articles/2019/02/22/CXM-The-Driver-for-True-Digital-Transformation',
    'https://www.rightpoint.com/Thought/Articles/2019/02/07/Tech-Talk-Episerver-vs-Magento',
    'https://www.rightpoint.com/Thought/Articles/2019/01/23/Lessons-from-Digital-Health-Summit-at-CES-2019',
    'https://www.rightpoint.com/Thought/Articles/2019/01/15/2019-Customer-Experience-Technology-Trends-Report',
    'https://www.rightpoint.com/Thought/Articles/2019/01/02/4-Signs-its-Time-to-Improve-Your-Digital-Workplace',
    'https://www.rightpoint.com/Thought/Articles/2018/11/16/beacon-technology',
    'https://www.rightpoint.com/Thought/Articles/2018/10/22/Using-Sitecore-to-Drive-Your-Customer-Experience',
    'https://www.rightpoint.com/Thought/Articles/2018/10/01/Digital-Operations-Services-Unlock-Competitive-Advantages-in-Digital-Transformation',
    'https://www.rightpoint.com/Thought/Articles/2018/09/25/Rightpoint-Earns-Partner-Specializations-for-Episerver-CMS-and-Digital-Experience-Cloud',
    'https://www.rightpoint.com/Thought/Articles/2018/08/08/Help-Bring-Rightpoint-to-SXSW-2019',
    'https://www.rightpoint.com/Thought/Articles/2018/07/26/Using-Meaningful-Content-to-Create-Transformative-Design',
    'https://www.rightpoint.com/Thought/Articles/2018/07/24/My-Experience-at-Visual-Studio-Live',
    'https://www.rightpoint.com/Thought/Articles/2018/07/12/Creating-World-Class-Digital-Workspaces-for-Todays-Workforce',
    'https://www.rightpoint.com/Thought/Articles/2018/06/15/WWDC-2018-Takeaways-and-New-Mobile-Technology',
    'https://www.rightpoint.com/Thought/Articles/2018/06/07/Improving-Customer-Loyalty-in-Healthcare-with-Digital-Empathy',
    'https://www.rightpoint.com/Thought/Articles/2018/05/31/How-a-Commerce-Accelerator-Meets-Your-Digital-Commerce-Needs',
    'https://www.rightpoint.com/Thought/Articles/2018/05/30/Considerations-for-Global-Website-Experiences',
    'https://www.rightpoint.com/Thought/Articles/2018/05/10/Are-You-Prepared-for-the-Experience-Economy',
    'https://www.rightpoint.com/Thought/Articles/2018/04/26/Digital-Transformation-with-Health-Records-App-by-Apple',
    'https://www.rightpoint.com/Thought/Articles/2018/04/24/A-Delicate-Balance-in-Digital-Transformations',
    'https://www.rightpoint.com/Thought/Articles/2018/03/14/Digital-Disruption-with-IoT',
    'https://www.rightpoint.com/Thought/Articles/2018/02/08/The-Profitability-of-Personalized-Commerce-Experience',
    'https://www.rightpoint.com/Thought/Articles/2018/01/11/Manufacturers-Embrace-Digital-Commerce-to-Become-Disruptors',
    'https://www.rightpoint.com/Thought/Articles/2017/12/21/Women-in-Technology-Transforming-Digital',
    'https://www.rightpoint.com/Thought/Articles/2017/12/19/Improving-your-Video-Meetings-on-Skype-with-Green-Screens',
    'https://www.rightpoint.com/Thought/Articles/2017/12/12/Managed-Services-Unlocking-Competitive-Advantages-in-Digital-Transformation',
    'https://www.rightpoint.com/Thought/Articles/2017/12/08/Digital-Workplace-Concepts-101-Collaboration',
    'https://www.rightpoint.com/Thought/Articles/2017/12/06/5-Ways-to-Effectively-Engage-Your-Employees',
    'https://www.rightpoint.com/Thought/Articles/2017/11/27/We-are-Committed-to-Delivery-Excellence-Are-you',
    'https://www.rightpoint.com/Thought/Articles/2017/11/21/The-Future-of-Digital-Experiences-A-Closer-Look-at-Augmented-Reality',
    'https://www.rightpoint.com/Thought/Articles/2017/11/15/Digital-Medicine-Could-Change-the-Way-You-Buy-Life-Insurance',
    'https://www.rightpoint.com/Thought/Articles/2017/11/03/Digital-Workplace-Concepts-101-Mobile',
    'https://www.rightpoint.com/Thought/Articles/2017/10/25/If-the-computer-is-a-bicycle-for-our-minds-Artificial-Intelligence-is-a-Harley-Davidson',
    'https://www.rightpoint.com/Thought/Articles/2017/10/17/Digital-Disruption-Surviving-and-Thriving-in-the-21st-Century-Economy',
    'https://www.rightpoint.com/Thought/Articles/2017/10/16/Beyond-The-Big-Shift-Five-Digital-Commerce-Investments-to-Increase-Sales',
    'https://www.rightpoint.com/Thought/Articles/2017/10/13/Digital-Workplace-Concepts-101-Search',
    'https://www.rightpoint.com/Thought/Articles/2017/10/06/Digital-Workplace-Concepts-101-Personalization',
    'https://www.rightpoint.com/Thought/Articles/2017/10/05/Digital-Empathy-How-It-Can-Make-a-Difference-in-Childrens-Healthcare',
    'https://www.rightpoint.com/Thought/Articles/2017/10/03/Technori-Anamika-Lasser-How-to-Keep-Your-Users-Engaged',
    'https://www.rightpoint.com/Thought/Articles/2017/09/28/Digital-Summit-Detroit-2017-Fragmentation-Confusion-and-Opportunity',
    'https://www.rightpoint.com/Thought/Articles/2017/09/27/Im-an-Experience-Director-and-This-is-How-I-Work-Part-Three',
    'https://www.rightpoint.com/Thought/Articles/2017/09/26/5-Steps-to-Successful-International-Transformation',
    'https://www.rightpoint.com/Thought/Articles/2017/09/25/Surfacing-Customer-Journey-Map-Analytics-Using-Power-BI',
    'https://www.rightpoint.com/Thought/Articles/2017/09/20/Im-an-Experience-Director-and-This-is-How-I-Work-Part-Two',
    'https://www.rightpoint.com/Thought/Articles/2017/09/18/Risky-Business-Reflections-on-Digital-Summit-Detroit-2017',
    'https://www.rightpoint.com/Thought/Articles/2017/09/15/Digital-Summit-Detroit-2017-Observations-and-Trends',
    'https://www.rightpoint.com/Thought/Articles/2017/09/13/Im-an-Experience-Director-and-This-is-How-I-Work-Part-One',
    'https://www.rightpoint.com/Thought/Articles/2017/09/12/Earning-Your-Digital-Customers',
    'https://www.rightpoint.com/Thought/Articles/2017/08/25/Buy-vs-Build-Is-Microsoft-Delve-your-next-Employee-Directory',
    'https://www.rightpoint.com/Thought/Articles/2017/08/24/Lego-and-Mattel-are-Transforming-Digitally-Are-You',
    'https://www.rightpoint.com/Thought/Articles/2017/08/14/My-Internship-Experience-at-Rightpoint',
    'https://www.rightpoint.com/Thought/Articles/2017/08/04/Only-Tech-Companies-Will-Survive-in-a-Digital-World',
    'https://www.rightpoint.com/Thought/Articles/2017/07/31/These-Governments-Are-Embracing-Digital-Transformation-Faster-Than-Your-Company',
    'https://www.rightpoint.com/Thought/Articles/2017/07/03/A-Comprehensive-Guide-to-Power-BI-Architecture',
    'https://www.rightpoint.com/Thought/Articles/2017/06/30/Your-Intranet-the-Front-Door-and-your-Digital-Workplace',
    'https://www.rightpoint.com/Thought/Articles/2017/06/05/iPhone-is-Turning-10-or-70-in-Digital-Transformation-Years',
    'https://www.rightpoint.com/Thought/Articles/2017/02/09/Design-as-a-Process',
    'https://www.rightpoint.com/Thought/Articles/2017/02/06/BI-and-Analytics-Data-Insight-Power',
    'https://www.rightpoint.com/Thought/Articles/2016/11/28/initial-thoughts-on-sitecore-experience-accelerator-sxa',
    'https://www.rightpoint.com/Thought/Articles/2016/11/17/install-guide-for-sitecore-experience-accelerator',
    'https://www.rightpoint.com/Thought/Articles/2016/11/09/the-salesforce-lightning-experience-is-here-to-stay',
    'https://www.rightpoint.com/Thought/Articles/2016/10/25/why-your-product-should-be-using-a-maker-approach',
    'https://www.rightpoint.com/Thought/Articles/2016/10/05/the-salesforce-lighting-experience-is-here-to-stay',
    'https://www.rightpoint.com/Thought/Articles/2016/10/05/enabling-change-for-your-digital-workspace-webinar-summary',
    'https://www.rightpoint.com/Thought/Articles/2016/09/28/top-4-trends-in-the-digital-healthcare-experience',
    'https://www.rightpoint.com/Thought/Articles/2016/09/19/power-bi-a-secure-way-to-share-data-dynamically-and-visually-part-1',
    'https://www.rightpoint.com/Thought/Articles/2016/09/05/digital-transformation-what-does-success-look-like',
    'https://www.rightpoint.com/Thought/Articles/2016/07/22/first-phase-digital-transformation-avoidable-adoption-missteps',
    'https://www.rightpoint.com/Thought/Articles/2016/07/06/experience-editor-language-flags-in-sitecore-8',
    'https://www.rightpoint.com/Thought/Articles/2016/05/17/design-thinking-meet-change-enablement-your-new-best-friend',
    'https://www.rightpoint.com/Thought/Articles/2016/04/11/the-three-secret-ingredients-to-successful-technology-changes',
    'https://www.rightpoint.com/Thought/Articles/2016/03/18/B2B-eCommerce-How-Digital-Maturity-Impacts-Success',
    'https://www.rightpoint.com/Thought/Articles/2016/02/02/Part-2-Investing-in-eCommerce-Implementing-Your-Digital-Strategy',
    'https://www.rightpoint.com/Thought/Articles/2016/01/19/Part-1-Investing-in-eCommerce-Why-Developing-a-Digital-Strategy-First-is-CriticalBlog-Post',
    'https://www.rightpoint.com/Thought/Articles/2015/12/28/best-wishes-this-season-from-rightpoint',
    'https://www.rightpoint.com/Thought/Articles/2015/12/20/event-recap-intranet-to-digital-workspace',
    'https://www.rightpoint.com/Thought/Articles/2015/11/03/the-digital-maker-movement',
    'https://www.rightpoint.com/Thought/Articles/2015/10/07/pedl-rightpoint-s-product-experience-amp-design-lead-program',
    'https://www.rightpoint.com/Thought/Articles/2015/09/24/go-digital-or-go-home-why-companies-need-digital-makers',
    'https://www.rightpoint.com/Thought/Articles/2015/08/23/the-world-of-digital-mobile-application',
    'https://www.rightpoint.com/Thought/Articles/2015/06/23/angularu-day-2',
    'https://www.rightpoint.com/Thought/Articles/2015/06/11/Managing-Digital-Personalization',
    'https://www.rightpoint.com/Thought/Articles/2015/04/29/Tool-Myopia-A-Content-Strategy-Risk',
    'https://www.rightpoint.com/Thought/Articles/2015/04/20/engaging-millennials-in-the-digital-workplace',
    'https://www.rightpoint.com/Thought/Articles/2015/04/15/episerver-the-complete-digital-experience',
    'https://www.rightpoint.com/Thought/Articles/2015/03/29/create-and-compare-a-source-and-target-site-inventory-using-powershell',
    'https://www.rightpoint.com/Thought/Articles/2015/03/05/two-way-data-binding-in-angular',
    'https://www.rightpoint.com/Thought/Articles/2015/02/12/employee-engagement-metrics-the-roi-of-the-intranet',
    'https://www.rightpoint.com/Thought/Articles/2015/01/06/rightpoint-s-most-popular-2014-blog-posts',
    'https://www.rightpoint.com/Thought/Articles/2014/12/16/to-infinite-scrolling-and-beyond',
    'https://www.rightpoint.com/Thought/Articles/2014/10/05/how-to-grow-user-centered-design-thinking-in-a-technology-driven-agency',
    'https://www.rightpoint.com/Thought/Articles/2014/09/23/customizing-and-improving-twitter-bootstrap-carousel',
    'https://www.rightpoint.com/Thought/Articles/2014/07/29/handle-with-care-10-tips-for-caring-amp-cultivating-company-culture',
    'https://www.rightpoint.com/Thought/Articles/2014/07/15/getting-creative-with-wireless',
    'https://www.rightpoint.com/Thought/Articles/2014/07/09/moving-forward-means-giving-back',
    'https://www.rightpoint.com/Thought/Articles/2014/07/01/it-takes-curiosity-an-unconventional-path-to-design',
    'https://www.rightpoint.com/Thought/Articles/2014/06/30/mobile-emulation-for-the-salesforce1-app',
    'https://www.rightpoint.com/Thought/Articles/2014/04/13/a-user-experience-designer-s-top-5-takeaways-from-a-week-the-pebble-smartwatch',
    'https://www.rightpoint.com/Thought/Articles/2014/02/26/top-5-things-i-learned-about-responsive-design-while-making-mistakes-and-being-mentored-by-developer',
    'https://www.rightpoint.com/Thought/Articles/2014/01/07/usefulness-or-usability-in-enterprise-social',
    'https://www.rightpoint.com/Thought/Articles/2013/12/19/the-importance-of-analysis',
    'https://www.rightpoint.com/Thought/Articles/2013/11/17/features-of-a-good-e-commerce-experience-part-one',
    'https://www.rightpoint.com/Thought/Articles/2013/11/11/underused-css3-styles',
    'https://www.rightpoint.com/Thought/Articles/2013/09/13/how-to-prepare-for-requirements-sessions-part-1-of-2',
    'https://www.rightpoint.com/Thought/Articles/2013/07/15/business-analysts-drive-business-benefits',
    'https://www.rightpoint.com/Thought/Articles/2013/06/26/lt-b-gt-the-case-for-insecurity-lt-b-gt-lt-i-gt-how-a-moderate-case-of-impostor-complex-can-actually',
    'https://www.rightpoint.com/Thought/Articles/2012/07/10/from-scratch',
    'https://www.rightpoint.com/Thought/Articles/2012/03/20/powerpoint-aspect-ratios-and-custom-masters',
    'https://www.rightpoint.com/Thought/Articles/2011/11/08/data-mining-in-banks-and-financial-institutions',
    'https://www.rightpoint.com/Thought/Articles/2011/10/17/bi-sql-pass-week-recap',
    'https://www.rightpoint.com/Thought/Articles/2011/10/07/is-your-business-intelligent-what-cfos-need-to-know-to-benefit-and-work-well-with-it',
    'https://www.rightpoint.com/Thought/Articles/2011/06/03/email-usage-drops-28-in-past-12-months',
    'https://www.rightpoint.com/Thought/Articles/2011/04/18/predictive-analytics-in-retail',
    'https://www.rightpoint.com/Thought/Articles/2011/04/18/is-your-business-intelligent-the-4-modes-of-intelligence',
    'https://www.rightpoint.com/Thought/Articles/2011/04/14/sharepoint-ratings-protests-too-much-methinks',
    'https://www.rightpoint.com/Thought/Articles/2011/04/12/is-your-business-intelligent',
    'https://www.rightpoint.com/Thought/Articles/2011/01/24/using-the-sql-server-2008-r2-merge-statement-to-merge-single-rows-in-tables',
    'https://www.rightpoint.com/Thought/Articles/2010/09/15/css-control-adapters-sharepoint-2007-menus',
    'https://www.rightpoint.com/Thought/Articles/2010/04/19/sharepoint-2010-is-out-well-really-it-s-in-but-i-mean-it-s-been-released',
    'https://www.rightpoint.com/Thought/Articles/2010/04/12/social-intranets',
    'https://www.rightpoint.com/Thought/Articles/2010/02/22/get-this-title-icon-in-web-part',
    'https://www.rightpoint.com/Thought/Articles/2010/02/03/2010-year-of-the-social-intranet',
    'https://www.rightpoint.com/Thought/Articles/2010/01/13/why-you-can-t-afford-to-ignore-your-users',
    'https://www.rightpoint.com/Thought/Articles/2010/01/10/5-steps-for-creating-an-effective-digital-marketing-plan',
    'https://www.rightpoint.com/Thought/Articles/2010/01/01/what-s-up-world',
    'https://www.rightpoint.com/Thought/Articles/2009/11/12/kpi-vs-kpa',
    'https://www.rightpoint.com/Thought/Articles/2009/11/03/top-6-reasons-you-should-invest-in-bi',
    'https://www.rightpoint.com/Thought/Articles/2009/05/27/does-this-actually-work',
    'https://www.rightpoint.com/Thought/Articles/2009/03/04/silverlight-events-and-certification',
    'https://www.rightpoint.com/Thought/Articles/2008/04/08/photoshop-word',
    'https://www.rightpoint.com/Thought/Articles/2008/04/04/excel-phone-number-hyperlink',
    'https://www.rightpoint.com/Thought/Articles/2007/10/10/interaction-5-5-sp3-what-s-new',
    'https://www.rightpoint.com/Thought/Articles/2005/06/07/ctrl-esc',
]

migrateAllThoughtEntries(urls)
