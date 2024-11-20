import styled, { css } from 'styled-components'
import { InPageLinkListProps } from './InPageLinkList.component'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'
import { linksListGenerators } from '../../links/LinksList/LinksList.data'
import { contentfulRichTextDummyGenerators } from '../../general/RichText/contentful-rich-text-dummy-generator'
import { multiMediaGenerators } from '../../general/MultiMedia/MultiMedia.data'
import { linkGenerators } from '../../links/Link/Link.data'
import { BackgroundColors } from '../../layout/RootComponent/background-color'

export const inPageLinkListGenerators =
    makeTypedGeneratorFn<InPageLinkListProps>()({
        default: () => ({
            items: [
                {
                    title: 'Customer Experience',
                    body: contentfulRichTextDummyGenerators.generateDocument({
                        contents: [
                            {
                                nodeType: 'paragraph',
                                text: 'The accelerated shift of commerce to digital gives greater opportunity — and more responsibility — to create lasting impressions with a customer in every context — B2B, B2C, or D2C. We partner with retailers, manufacturers, and distributors craft sound Commerce strategies that cooperate with wholesale and marketplace.',
                            },
                        ],
                    }),
                    linksListProps: linksListGenerators.default(),
                    multiMediaProps: multiMediaGenerators.default(),
                    ctaLinkProps: linkGenerators.default(),
                },
                {
                    title: 'Employee Experience',
                    body: contentfulRichTextDummyGenerators.generateDocument({
                        contents: [
                            {
                                nodeType: 'paragraph',
                                text: 'The accelerated shift of commerce to digital gives greater opportunity — and more responsibility — to create lasting impressions with a customer in every context — B2B, B2C, or D2C. We partner with retailers, manufacturers, and distributors craft sound Commerce strategies that cooperate with wholesale and marketplace.',
                            },
                        ],
                    }),
                    linksListProps: linksListGenerators.default(),
                    multiMediaProps: multiMediaGenerators.default(),
                    ctaLinkProps: linkGenerators.default(),
                },
                {
                    title: 'Product Experience',
                    body: contentfulRichTextDummyGenerators.generateDocument({
                        contents: [
                            {
                                nodeType: 'paragraph',
                                text: 'The accelerated shift of commerce to digital gives greater opportunity — and more responsibility — to create lasting impressions with a customer in every context — B2B, B2C, or D2C. We partner with retailers, manufacturers, and distributors craft sound Commerce strategies that cooperate with wholesale and marketplace.',
                            },
                        ],
                    }),
                    linksListProps: linksListGenerators.default(),
                    multiMediaProps: multiMediaGenerators.default(),
                    ctaLinkProps: linkGenerators.default(),
                },
            ],

            rootProps: {
                container: true,
                background: {
                    backgroundColor: BackgroundColors.Sand,
                },
            },
        }),
    })
