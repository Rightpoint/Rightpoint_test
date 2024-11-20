import { richTextFromMarkdown } from '@contentful/rich-text-from-markdown'
import { createOrUpdateAsset } from './create-or-update-entry'
import { getClientEnvironment } from './get-client-environment'
import { truncate } from './utils'
import { BLOCKS } from '@contentful/rich-text-types'
import { entryToLink } from './entry-to-link'

const TurndownService = require('turndown')

export const createRichTextDocumentFromHtml = async (html: string) => {
    console.log('BEGIN RICH TEXT FROM HTML')

    const turndownService = new TurndownService()
    /**
     * Transform headings to H2s
     */
    turndownService.addRule('headings', {
        filter: ['h3', 'h4', 'h5', 'h6'],
        replacement: (content) => {
            console.log('REPLACING HEADING', content)
            return '## ' + content + '\n\n'
        },
    })

    const markdown = turndownService.turndown(html)
    // https://github.com/contentful/rich-text/tree/master/packages/rich-text-from-markdown
    const richTextDocument = await richTextFromMarkdown(
        markdown,
        async (node) => {
            console.log('-- RICH TEXT: Unsupported node found:', node)
            /**
             * If an image node is detected, create an asset and
             * convert to an embedded asset reference
             */
            if (node.type === 'image') {
                console.log('-- RICH TEXT: Found image node:', node)
                const asset = await createOrUpdateAsset({
                    environment: await getClientEnvironment(),
                    title: ``,
                    description: '',
                    // RP urls have spaces
                    url: encodeURI((node as any).url),
                    domain: 'https://www.rightpoint.com',
                } as any)
                return {
                    nodeType: BLOCKS.EMBEDDED_ASSET,
                    content: [
                        // remove the text content.
                    ],
                    data: {
                        target: entryToLink(asset, 'Asset'),
                    },
                }
            }
            return null
        }
    )
    return richTextDocument
}
