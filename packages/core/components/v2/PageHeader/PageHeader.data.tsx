import styled, { css } from 'styled-components'
import { PageHeaderProps } from './PageHeader.component'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'
import { multiMediaGenerators } from '../../general/MultiMedia/MultiMedia.data'
import { ContentColors } from '../../layout/RootComponent/background-color'
import { contentfulRichTextDummyGenerators } from '../../general/RichText/contentful-rich-text-dummy-generator'
import {
    MultiMediaProps,
    MultiMediaTypes,
} from '../../general/MultiMedia/MultiMedia.component'
import { imageGenerators } from '../../general/Image/Image.data'

export const pageHeaderGenerators = makeTypedGeneratorFn<PageHeaderProps>()({
    default: () => ({
        eyebrow: "Reimagining Cadillac's User Experience",
        title: 'Cadillac',
        // introductionEyebrow: 'Introduction',
        introductionDocument:
            contentfulRichTextDummyGenerators.generateDocument({
                contents: [
                    {
                        nodeType: 'paragraph',
                        text: 'Powered by technology new to the automotive industry, Rightpoint was asked to reimagine the user experience of the Cadillac brand and redefine what luxury is in a digitally enabled world.',
                    },
                    {
                        nodeType: 'paragraph',
                        text: 'Our canvas was the LRYIQ, Cadillac’s first all-electric vehicle and arguably the most important one that GM has ever created. It signals Cadillac’s transformation into an all-electric, digitally driven brand that will spearhead GM’s larger transformation. Put simply, this is the most important product from Cadillac in over a half of a century.',
                    },
                ],
            }),
        backgroundMultiMediaProps: {
            mediaType: MultiMediaTypes.IMAGE,
            mediaProps: imageGenerators.default({
                src: '/static/placeholder/v2/header/cadillac.jpg',
            }),
        } as MultiMediaProps,
        linksHeader: 'Services',
        linksProps: [
            'Product Experience',
            'Customer Experience',
            'Employee Experience',
        ].map((text) => ({
            text,
            href: '#',
        })),

        contentColor: ContentColors.Light,
    }),
    solutions: () => ({
        title: 'Solutions',
        introEyebrow: 'Building solutions for total experience.',
        subtitle:
            'We believe in experience-led transformation. From vision to delivery, we use empathy, data, and creativity to connect experience to operations — enabling organizations to transform, evolve, and stay relevant in an increasingly complex world.',
        backgroundMultiMediaProps: {
            mediaType: MultiMediaTypes.IMAGE,
            mediaProps: imageGenerators.default({
                src: '/static/placeholder/v2/header/solutions.jpg',
            }),
        } as MultiMediaProps,

        contentColor: ContentColors.Light,
    }),
    insideRightpoint: () => ({
        title: 'Inside Rightpoint',
        subtitle:
            'Realizing experience-led transformation in the experience economy.',
        backgroundMultiMediaProps: multiMediaGenerators.videoBackground(),
        introductionDocument:
            contentfulRichTextDummyGenerators.generateDocument({
                contents: [
                    {
                        nodeType: 'paragraph',
                        text: 'The experience economy is rewriting the rules of digital transformation. Amid rapid digital proliferation and rising end-user demands, delivering exceptional experiences for customers, employees, and partners is quickly becoming a top C-suite priority. Winning organizations increasingly leverage experience as the north star for large-scale digital transformations—and the connective tissue that unifies the front, middle and back offices.',
                    },
                ],
            }),
        linksHeader: 'Inside Rightpoint',
        linksProps: ['Our Values', 'Awards', 'Leadership'].map((text) => ({
            text,
            href: '#',
        })),

        contentColor: ContentColors.Light,
    }),
})
