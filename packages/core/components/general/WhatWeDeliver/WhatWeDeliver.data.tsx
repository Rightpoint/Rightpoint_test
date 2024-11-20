import { fakerWithSeed } from '@rightpoint/data-generators'
import { times } from 'lodash'
import styled, { css } from 'styled-components'
import { WhatWeDeliverProps } from './WhatWeDeliver.component'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'
import { richTextFromMarkdown } from '@contentful/rich-text-from-markdown'
import { contentfulRichTextDummyGenerators } from '../RichText/contentful-rich-text-dummy-generator'

const real = [
    'Employee Experience Transformation',
    'Intranet Design and Implementation',
    'Employee-Centered Content ',
    'Employee-Centered Communications',
    'Workplace Consulting',
    'Change Management',
]

const generateItem = ({ title = null } = {}) => {
    return {
        title: title || fakerWithSeed.commerce.department(),
    }
}

export const whatWeDeliverGenerators =
    makeTypedGeneratorFn<WhatWeDeliverProps>()({
        default: () => {
            return {
                title: 'What we deliver',
                content: contentfulRichTextDummyGenerators.generateDocument({
                    contents: [
                        {
                            nodeType: 'paragraph',
                            text: 'Experience Transformation',
                        },
                        {
                            nodeType: 'paragraph',
                            text: 'Digital Transformation',
                        },
                        {
                            nodeType: 'paragraph',
                            text: 'Product Transformation',
                        },
                    ],
                }),
            }
        },
    })
