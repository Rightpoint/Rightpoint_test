import { get, isEmpty } from 'lodash'
import {
    documentToReactComponents,
    RenderNode,
} from '@contentful/rich-text-react-renderer'
import { BLOCKS, Document, Node } from '@contentful/rich-text-types'
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
import { Link } from '../Link/Link.component'

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
            [RPRichTextNodes.ENTRY_HYPERLINK]: (
                node: RPRichTextHyperLinkNode,
                children
            ) => {
                const url = node.data.url
                /**
                 * We may need support for additional content inside links
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
