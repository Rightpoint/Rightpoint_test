import { parse } from 'node-html-parser'
import { richTextFromMarkdown } from '@contentful/rich-text-from-markdown'
import { getOrFetchRemoteUrlHtml } from '../utils/get-or-fetch-remote-url-html'
import { createRichTextDocumentFromHtml } from '../utils/create-rich-text-document'

export const scrapeThoughtData = async (url) => {
    const data = await getOrFetchRemoteUrlHtml(url, true)
    if (!data) {
        console.log('Scrape failed. Skipping')
        return null
    }

    const root = parse(data)

    const TurndownService = require('turndown')
    const turndownService = new TurndownService()

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
        get html() {
            return [...root.querySelectorAll('.text-multiple-columns__content')]
                .map((e) => e.outerHTML)
                .join('')
        },

        // get htmlToMarkdown() {
        //     return root
        //         .querySelectorAll('.text-multiple-columns__content')
        //         ?.map((node) => turndownService.turndown(node.innerHTML))
        // },
        // get getDocumentAsync() {
        //     return (async () => {
        //         // https://github.com/contentful/rich-text/tree/master/packages/rich-text-from-markdown
        //         return richTextFromMarkdown(
        //             parseRoot.htmlToMarkdown?.join('') || '# no content',
        //             (node) => {
        //                 /**
        //                  * This is not triggering for [] images for some reason.
        //                  */
        //                 process.env.NODE_ENV !== 'production' &&
        //                     console.log('unsupported node: ', node)
        //                 return null
        //             }
        //         )
        //     })()
        // },

        // // from work import
        // getMarkdownFromHtml(html) {
        //     return turndownService.turndown(html)
        // },

        // async getDocumentFromMarkdown(markdown) {
        //     // https://github.com/contentful/rich-text/tree/master/packages/rich-text-from-markdown
        //     return richTextFromMarkdown(markdown, (node) => {
        //         /**
        //          * This is not triggering for [] images for some reason.
        //          */
        //         console.log('unsupported node: ', node)
        //         return null
        //     })
        // },

        // async getDocumentFromHtml(html) {
        //     return this.getDocumentFromMarkdown(this.getMarkdownFromHtml(html))
        // },
    }
    return {
        ...parseRoot,
        bodyDocument: await createRichTextDocumentFromHtml(parseRoot.html),
    }
}

export type ThoughtScraperResult = Awaited<ReturnType<typeof scrapeThoughtData>>
