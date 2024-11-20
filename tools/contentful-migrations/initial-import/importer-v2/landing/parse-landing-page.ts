import { parse } from 'node-html-parser'
import axios from 'axios'
import { richTextFromMarkdown } from '@contentful/rich-text-from-markdown'
import fs from 'fs'
import { getOrFetchRemoteUrlHtml } from '../utils/get-or-fetch-remote-url-html'
import { createRichTextDocumentFromHtml } from '../utils/create-rich-text-document'

export const scrapeLandingData = async (url) => {
    const data = await getOrFetchRemoteUrlHtml(url, true)
    if (!data) {
        console.log('Scrape failed. Skipping')
        return null
    }

    const root = parse(data)

    const parseRoot = {
        get headerData() {
            const header = root.querySelector(
                '.content-landing-banner, .video-landing-banner'
            )
            if (!header) {
                return {
                    title: 'No header scraped',
                    description: 'No description scraped',
                    image: null,
                }
            }
            const title = header.querySelector('h1, h2')?.text ?? ''
            const description = header
                .querySelectorAll('p')
                .map((el) => el.text)
                .join('\n\n')
            return {
                title,
                description,
                image:
                    header
                        .querySelector('.highResImageSource')
                        ?.getAttribute('src') ?? header.getAttribute('data-bg'),
            }
        },

        get content() {
            /**
             * These landing pages are all over the place.
             */
            const potentialContentQueries = [
                // '.video-landing-content',
                // '.content-landing-page-content',
                '.content-landing',
                '.video-landing',
            ]
            const content = root.querySelector(
                potentialContentQueries.join(',')
            )
            return content?.innerHTML ?? ''
        },

        async getDocumentFromHtml(html) {
            const markdown = this.getMarkdownFromHtml(html)
            return this.getDocumentFromMarkdown(markdown)
        },
    }
    return {
        ...parseRoot,
        contentDocument: await createRichTextDocumentFromHtml(
            parseRoot.content
        ),
    }
}

export type LandingScraperResult = Awaited<ReturnType<typeof scrapeLandingData>>
