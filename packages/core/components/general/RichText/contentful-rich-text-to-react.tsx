import { get, isEmpty } from 'lodash'
import {
    documentToReactComponents,
    RenderNode,
} from '@contentful/rich-text-react-renderer'
import {
    Document,
    INLINES,
    BLOCKS,
    Node,
    Inline,
    Text,
} from '@contentful/rich-text-types'
import { contentfulLoggedWarning } from '@rightpoint/core/utils'
import type {
    ComponentPropsWithMeta,
    ConfigManagerType,
} from '@rightpoint/core/next-contentful'
import {
    RPRichTextEmbeddedEntryNode,
    RPRichTextHyperLinkNode,
    RPRichTextNodes,
} from './contentful-rich-text-custom-nodes'
import { getConfigsManager } from '@rightpoint/core/next-contentful/mappers/registry/all-configs'
import { Link } from '../../links/Link/Link.component'

type Options = {
    renderNode?: RenderNode
}

type ContentfulRichTextToReact = (
    arg: Document,
    manager?: ConfigManagerType,
    options?: Options
) => ReturnType<typeof documentToReactComponents>
export const contentfulRichTextToReact: ContentfulRichTextToReact = (
    document,
    manager = getConfigsManager(),
    options = {}
) => {
    if (!document || isEmpty(document)) {
        return null
    }

    /**
     * Prior to this step, the Document was converted into a smaller JSON object
     * - Convert to JSON, strip non essential data by running through mappers
     * - Convert JSON to React components here
     */
    return documentToReactComponents(document, {
        renderText: (text) => {
            return text.split('\n').reduce((children, textSegment, index) => {
                return [
                    ...children,
                    index > 0 && <br key={index} />,
                    textSegment,
                ]
            }, [])
        },
        renderNode: {
            [RPRichTextNodes.EMBEDDED_ENTRY]: (
                node: RPRichTextEmbeddedEntryNode
            ) => {
                const componentPropsWithMeta =
                    node.data as ComponentPropsWithMeta
                const contentTypeId =
                    componentPropsWithMeta.mapperProps.__contentTypeId
                const mapper = manager.getComponentMapper(contentTypeId)
                return <mapper.Component {...node.data.componentProps} />
            },
            /**
             * Customize the rendering of hyperlinks.
             * Not to be confused with entry-hyperlinks or asset-hyperlinks.
             */
            [INLINES.HYPERLINK]: (node) => {
                const url = node.data.uri
                /**
                 * TODO: This is a good candidate to move into a utility function + colocated test suite + hardening.
                 * There is a naive implementation below whose only consequence of failure is that the link will open in a new tab when it shouldn't.
                 */
                const localLinkPatterns = [
                    'rightpoint',
                    'vercel.app',
                    'localhost:8000',
                    'localhost:3000',
                ]
                const isLocalLink =
                    url &&
                    localLinkPatterns.some(
                        (pattern) => url.indexOf(pattern) > -1
                    )

                // get text
                const isTextNode = (node): node is Text =>
                    node?.nodeType === 'text'
                const textNodes = node.content.filter(isTextNode) as Text[]
                const text = textNodes
                    .map((textNode) => textNode.value)
                    .join('')

                if (!isLocalLink) {
                    return (
                        <a href={url} target="_blank" rel="noreferrer">
                            {text}
                        </a>
                    )
                }
                return <Link href={url}>{text}</Link>
            },
            /**
             * Handle standard asset hyperlinks i.e. download links.
             */
            [INLINES.ASSET_HYPERLINK]: (node: Inline) => {
                if (!node.data.target) {
                    return 'no link target'
                }
                if (!node.data.target.fields.file) {
                    return 'no link target file'
                }
                const url = node.data.target.fields.file.url
                /**
                 * We expect an asset hyperlink node content to be a single text node.
                 *
                 * Otherwise, it can get messy to render. e.g. wrapping an Entry block with its own link.
                 *
                 * The more restricted the better for file downloads.
                 */
                const firstContentNode = node.content?.[0]
                const isTextNode = (node): node is Text =>
                    node?.nodeType === 'text'
                if (!isTextNode(firstContentNode)) {
                    return 'link content must be text'
                }
                return (
                    <a href={url} target="_blank" rel="noreferrer">
                        {firstContentNode.value}
                    </a>
                )
            },
            /**
             * Handle custom entry hyperlink node type which resolves Contentful entry URLs
             * in the entry to JSON step.
             */
            [RPRichTextNodes.ENTRY_HYPERLINK]: (
                node: RPRichTextHyperLinkNode,
                children
            ) => {
                const url = node.data.url
                /**
                 * Note: we may need support for additional content inside links in the future.
                 * For example, bolding or italics are handled by `marks`, but are not transformed here.
                 */
                if (url) {
                    const { nodeType, value, marks, data } = get(
                        node,
                        'content[0]',
                        {} as any
                    )
                    return (
                        <Link href={url} enableLinkStyle={true}>
                            {value}
                        </Link>
                    )
                }
                /**
                 * If we can't resolve a link, log it persistently
                 * for future review.
                 */
                contentfulLoggedWarning(
                    `Entry ID: ${get(
                        node,
                        'data.target.sys.id'
                    )} link can't be resolved.`
                )
                return <>No link resolved.</>
            },
            ...(options?.renderNode || {}),
        },
    })
}
