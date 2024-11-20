import { parse } from 'node-html-parser'
import axios from 'axios'
import { richTextFromMarkdown } from '@contentful/rich-text-from-markdown'
import fs from 'fs'
import { SectionParserReturns, sectionParsers } from './work-section-parsers'
import { getOrFetchRemoteUrlHtml } from '../utils/get-or-fetch-remote-url-html'

export const scrapeWorkData = async (url) => {
    const data = await getOrFetchRemoteUrlHtml(url, true)
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
            const titleWithSubtitle =
                root.querySelector('.page-header-work__title')?.text ?? ''

            const titleSplits = titleWithSubtitle.split('\n\n')
            const title = titleSplits[0].replace('\n', '').trim()
            const subtitle =
                titleSplits.length > 1
                    ? titleSplits[1].replace('\n', '').trim()
                    : null

            return {
                title,
                subtitle,
                image: root
                    .querySelector(
                        '.page-header-work__banner source:first-child'
                    )
                    ?.getAttribute('srcset'),
                introHtml:
                    root.querySelector('.page-header-work__intro')?.innerHTML ??
                    '',
            }
        },
        // possibly used to populate categories automatically
        get categories() {
            return root
                .querySelector('.page-header-work__category')
                ?.text.trim()
        },

        get sections() {
            const sections = root.querySelectorAll('main section')

            /**
             * Determine what internal scraper type a particular section uses
             * Usually a classname identifies it on the RP.com side
             * @param section
             */
            const getSectionType = (section) => {
                const classList = section.classList
                if (classList.contains('images-row--3-columns')) {
                    return 'images3'
                }
                if (classList.contains('images-row')) {
                    return 'image'
                }
                if (classList.contains('text-manual-columns')) {
                    return 'text'
                }

                // is a stat outcomes
                if (section.querySelector('.outcomes__outcome__stat')) {
                    return 'outcomesStats'
                }

                // could just be a text outcomes then
                if (classList.contains('outcomes')) {
                    return 'outcomes'
                }
                if (classList.contains('contributions')) {
                    return 'contributions'
                }
                if (classList.contains('quotetestimonial')) {
                    return 'quote'
                }
                if (classList.contains('full-width-video')) {
                    return 'video'
                }
            }
            return sections.map((section) => {
                const type = getSectionType(section)
                const data = sectionParsers[type]?.(section)
                console.log('PARSE: TYPE: ', type)
                return data
            })
        },

        get relatedWork() {
            return {
                relatedHrefs: root
                    .querySelectorAll('.featured-page h3 a')
                    .map((anchor) => anchor.getAttribute('href')),
            }
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
            return this.getDocumentFromMarkdown(this.getMarkdownFromHtml(html))
        },
    }
    return {
        // document: await parseRoot.richTextAsync,
        ...parseRoot,
    }
}

export type WorkScraperResult = Awaited<ReturnType<typeof scrapeWorkData>>
