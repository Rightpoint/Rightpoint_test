import { BLOCKS, Document } from '@contentful/rich-text-types'
import { Box, Composition } from 'atomic-layout'
import { FC } from 'react'
import { useScrollAnimation } from '../Animation/Animation.component'
import { contentfulRichTextToReact } from '../RichText/contentful-rich-text-to-react'
import { WhatWeDeliverStyles as s } from './WhatWeDeliver.styles'

type ItemProps = {}
const Item: FC<ItemProps> = ({ children }) => {
    return <s.Item>{children}</s.Item>
}

export interface WhatWeDeliverProps {
    title: string
    content: Document
}

export const WhatWeDeliver: FC<WhatWeDeliverProps> = ({ title, content }) => {
    const { Animation } = useScrollAnimation()
    return (
        <s.WhatWeDeliver>
            <Animation>
                <s.Title>{title}</s.Title>
            </Animation>
            <s.Grid
                as={Composition}
                templateColsXs="1fr"
                templateColsSm="1fr 1fr"
                templateColsMd="1fr 1fr 1fr"
                gapRow={30}
                gapCol={60}
                paddingHorizontal={40}
            >
                {contentfulRichTextToReact(content, undefined, {
                    renderNode: {
                        [BLOCKS.PARAGRAPH]: (node, children) => {
                            return (
                                <Animation>
                                    <Item>{children}</Item>
                                </Animation>
                            )
                        },
                    },
                })}
            </s.Grid>
        </s.WhatWeDeliver>
    )
}
