import { Node, Block, Inline, INLINES } from '@contentful/rich-text-types'
import { ComponentPropsWithMeta } from '@rightpoint/core/next-contentful'

// Contentful
// export declare enum INLINES {
//     HYPERLINK = "hyperlink",
//     ENTRY_HYPERLINK = "entry-hyperlink",
//     ASSET_HYPERLINK = "asset-hyperlink",
//     EMBEDDED_ENTRY = "embedded-entry-inline"
// }

export enum RPRichTextNodes {
    ENTRY_HYPERLINK = 'RP_ENTRY_HYPERLINK',
    EMBEDDED_ENTRY = 'RP_EMBEDDED_ENTRY',
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
