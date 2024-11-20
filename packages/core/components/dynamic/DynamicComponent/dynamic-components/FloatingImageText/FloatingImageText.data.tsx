import styled, { css } from 'styled-components'
import {
    FloatingImageTextComposedProps,
    FloatingImageTextProps,
} from './FloatingImageText.component'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'
import { Document } from '@contentful/rich-text-types'
import { multiMediaGenerators } from '../../../../general/MultiMedia/MultiMedia.data'

const body = {
    nodeType: 'document',
    data: {},
    content: [
        {
            nodeType: 'paragraph',
            data: {},
            content: [
                {
                    nodeType: 'text',
                    value: 'The experience economy is rewriting the rules of digital transformation. Amid rapid digital proliferation and rising end-user demands, delivering exceptional experiences for customers, employees, and partners is quickly becoming a top C-suite priority. Winning organizations increasingly leverage experience as the north star for large-scale digital transformations and the connective tissue that unifies the front, middle and back offices.',
                    marks: [],
                    data: {},
                },
            ],
        },
    ],
}

export const floatingImageTextGenerators =
    makeTypedGeneratorFn<FloatingImageTextComposedProps>()({
        default: () => ({
            title: 'Realizing experience-led transformation <b> in the experience economy</b>',
            heroTitle: 'Hero title',
            variant: 'left',
            bodyDocument: body as Document,
            stats: [
                {
                    number: '53',
                    superscript: '%',
                    label: 'Female Leadership',
                },
                {
                    number: '52',
                    superscript: '',
                    label: 'Average Age',
                },
            ],
            multiMediasProps: [
                multiMediaGenerators.default(),
                multiMediaGenerators.default(),
            ],
            // imageVariant: 'rounded',
            backgroundProps: {},
            // heroVariant: 'withImage',
        }),
    })
