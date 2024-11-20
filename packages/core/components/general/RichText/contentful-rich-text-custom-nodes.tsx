import { Node, Block, Inline, INLINES } from '@contentful/rich-text-types'
import { ComponentPropsWithMeta } from '@rightpoint/core/next-contentful'

/**
 * RP Custom Rich Text Nodes.
 *
 * These are used to override the default rendering of Contentful Rich Text nodes with RP-specific behavior.
 */
export enum RPRichTextNodes {
    ENTRY_HYPERLINK = 'RP_ENTRY_HYPERLINK',
    EMBEDDED_ENTRY = 'RP_EMBEDDED_ENTRY',
    EMBEDDED_INLINE_ENTRY = 'RP_EMBEDDED_INLINE_ENTRY',
}

interface RPRichTextEmbeddedEntryNode_ extends Node {
    nodeType: RPRichTextNodes.EMBEDDED_ENTRY
    data: ComponentPropsWithMeta
}

interface RPRichTextHyperLinkNode_ extends Node {
    nodeType: RPRichTextNodes.ENTRY_HYPERLINK
    data: {
        url: string
    }
}

/**
 * Overriding nodes requires block/inline compatibility
 */
type NodeCompat<T> = T | Block | Inline

export type RPRichTextEmbeddedEntryNode =
    NodeCompat<RPRichTextEmbeddedEntryNode_>

export type RPRichTextHyperLinkNode = NodeCompat<RPRichTextHyperLinkNode_>
