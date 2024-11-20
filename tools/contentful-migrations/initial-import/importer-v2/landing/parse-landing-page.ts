import { parse } from 'node-html-parser'
import axios from 'axios'
import { richTextFromMarkdown } from '@contentful/rich-text-from-markdown'
import fs from 'fs'

const getOrFetch = async (url, skipCache) => {
    const finalPath = url.split('/').slice(-1)[0]
    const localPath = __dirname + '/cache/' + finalPath
    let responseData
    console.log('FETCH: ', finalPath)
    if (skipCache) {
        return (await axios.get(url).catch((error) => null)).data
    }
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

export const scrapeLandingData = async (url) => {
    const data = await getOrFetch(url, true)
    if (!data) {
        console.log('Scrape failed. Skipping')
        return null
    }

    const root = parse(data)

    const TurndownService = require('turndown')
    const turndownService = new TurndownService()

    const parseRoot = {
        // get dateISO() {
        //     const dateString = root
        //         .querySelector('.thought-header-date')
        //         ?.text.trim()
        //     try {
        //         return new Date(dateString).toISOString()
        //     } catch (ex) {
        //         console.log('Failed to convert date', dateString)
        //     }
        // },
        get headerData() {
            const header = root.querySelector('.content-landing-banner')
            const title = header.querySelector('h1')?.text ?? ''
            const description = header
                .querySelectorAll('p')
                .map((el) => el.text)
                .join('\n\n')
            return {
                title,
                description,
                image: header
                    .querySelector('.highResImageSource')
                    ?.getAttribute('src'),
            }
        },

        get content() {
            const content = root.querySelector('.content-landing-page-content')

            return content.innerHTML
        },

        getMarkdownFromHtml(html) {
            return turndownService.turndown(html)
        },

        async getDocumentFromMarkdown(markdown) {
            // https://github.com/contentful/rich-text/tree/master/packages/rich-text-from-markdown
            return richTextFromMarkdown(markdown, (node) => {
                /**
                 * This is not triggering for [] images for some reason.
                 */
                console.log('unsupported node: ', node)
                return null
            })
        },

        async getDocumentFromHtml(html) {
            const markdown = this.getMarkdownFromHtml(html)
            return this.getDocumentFromMarkdown(markdown)
        },
    }
    return {
        ...parseRoot,
        document: await parseRoot.getDocumentFromHtml(parseRoot.content),
    }
}

export type LandingScraperResult = Awaited<ReturnType<typeof scrapeLandingData>>
