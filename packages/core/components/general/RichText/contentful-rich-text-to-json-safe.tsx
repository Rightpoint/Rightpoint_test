import { get } from 'lodash'
import { ConfigManagerType } from '@rightpoint/core/next-contentful'
import { Document, BLOCKS, INLINES } from '@contentful/rich-text-types'
import {
    RPRichTextEmbeddedEntryNode,
    RPRichTextHyperLinkNode,
    RPRichTextNodes,
} from './contentful-rich-text-custom-nodes'

type Options = {
    //
}

type RPDocument = Document

/**
 * Convert a Contentful Rich Text Document to a JSON safe, smaller object, with
 * support for custom project specific node handlers (e.g. embedded entries, URL resolvers)
 */
export const contentfulRichTextDocumentToJsonSafe = async (
    document: Document,
    manager: ConfigManagerType,
    options?: Options
): Promise<RPDocument> => {
    if (!document) {
        return null
    }
    const recurse = async (node) => {
        if (node.nodeType === INLINES.ASSET_HYPERLINK) {
            // NOTE: return asset hyperlinks as is; otherwise
            // the final target object nesting stripper will remove the file object
            return node
        } else if (node.nodeType === INLINES.ENTRY_HYPERLINK) {
            // the target is supposed to be a page, but isn't guaranteed to be due to CMS error
            // could use a isPage() or pages registry and component registry.
            let url
            try {
                // rich text fields are relatively risky for containing invalid references
                url = await manager.getUrl(node.data.target)
            } catch (ex) {
                // common cause is a reference to a non-page, e.g. a mistaken link to a Component
                console.error(
                    'Error generating URL in rich text',
                    ex,
                    node.data
                )
                url = '#error-getting-url'
            }
            node = {
                ...node,
                nodeType: RPRichTextNodes.ENTRY_HYPERLINK,
                data: {
                    // by removing target, we remove megabytes of data
                    url,
                },
            } as RPRichTextHyperLinkNode
        } else if (
            /**
             * Embedded entries, assets
             */
            [BLOCKS.EMBEDDED_ENTRY, BLOCKS.EMBEDDED_ASSET].includes(
                node.nodeType
            )
        ) {
            /**
             * For embedded entries (or assets), we can take the entry and pass it through entryToProps
             * to reduce payload to exactly what the embedded component needs.
             */
            const entry = get(node, 'data.target')
            if (typeof entry === 'object') {
                // convert entry to props, reducing payload
                const props = await manager
                    .getComponentMapper(entry)
                    .getComponentPropsWithMeta()
                node = {
                    ...node,
                    data: props,
                    nodeType: RPRichTextNodes.EMBEDDED_ENTRY,
                } as RPRichTextEmbeddedEntryNode
            }
        } else if (INLINES.EMBEDDED_ENTRY) {
            /**
             * Inline entries are treated just like embedded entries for now, but
             * due to its inline-ness may be treated differently in the JSON>React rendering stage
             */
            const entry = get(node, 'data.target')
            if (typeof entry === 'object') {
                // convert entry to props, reducing payload
                const props = await manager
                    .getComponentMapper(entry)
                    .getComponentPropsWithMeta()
                node = {
                    ...node,
                    data: props,
                    nodeType: RPRichTextNodes.EMBEDDED_INLINE_ENTRY,
                } as RPRichTextEmbeddedEntryNode
            }
        } else {
            /**
             * If there is a node type that hasn't been explicitly caught, and it has an entry,
             * ensure we strip everything but the first level of fields to prevent 10mb+ payloads.
             */
            const fields = get(node, 'data.target.fields')
            if (typeof fields === 'object') {
                for (const property in fields) {
                    // strip objects
                    if (typeof fields[property] === 'object') {
                        fields[property] = null
                    }
                }
                node.data.target.fields = fields
            }
        }
        // recurse
        if (node.content && node.content.length) {
            node.content = await Promise.all(node.content.map(recurse))
        }
        return node
    }
    return await recurse(document)
}
