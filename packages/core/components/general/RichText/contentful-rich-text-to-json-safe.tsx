import { get } from 'lodash'
import { ConfigManagerType } from '@rightpoint/core/next-contentful'
import { Document, BLOCKS, INLINES } from '@contentful/rich-text-types'
import {
    RPRichTextEmbeddedEntryNode,
    RPRichTextHyperLinkNode,
    RPRichTextNodes,
} from './contentful-rich-text-custom-nodes'
import { isConstructorDeclaration } from 'typescript'

type Options = {
    //
}

type RPDocument = Document

export const contentfulRichTextDocumentToJsonSafe = async (
    document: Document,
    manager: ConfigManagerType,
    options?: Options
): Promise<RPDocument> => {
    if (!document) {
        return null
    }
    const recurse = async (node) => {
        if (node.nodeType === INLINES.ENTRY_HYPERLINK) {
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
                /**
                 * Convert the data into our custom node type to be rendered on the client
                 * using the contentful rich text to React library.
                 */
                node = {
                    ...node,
                    data: props,
                    nodeType: RPRichTextNodes.EMBEDDED_ENTRY,
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
