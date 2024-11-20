import styled, { css } from 'styled-components'
import { SimpleContentProps } from './SimpleContent.component'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'
import { contentfulRichTextDummyGenerators } from '../../general/RichText/contentful-rich-text-dummy-generator'
import { multiMediaGenerators } from '../../general/MultiMedia/MultiMedia.data'
import { HeaderVariants } from '../Header/Header.component'

export const SimpleContentGenerators =
    makeTypedGeneratorFn<SimpleContentProps>()({
        default: ({ title = '' }: { title?: string } = { title: '' }) => ({
            headerProps: {
                title,
                variant: HeaderVariants[3],
            },
            content: contentfulRichTextDummyGenerators.generateDocument({
                contents: [
                    {
                        nodeType: 'heading-2',
                        text: 'Hello there, this is a heading.',
                    },
                    {
                        nodeType: 'paragraph',
                        text: 'Lorem iosum dolor sit amet, consectetur adipiscing elit.',
                    },
                ],
            }),
            multiMediaProps: multiMediaGenerators.gray(),
        }),
    })
