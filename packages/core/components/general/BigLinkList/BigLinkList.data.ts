import { fakerWithSeed } from '@rightpoint/data-generators'
import { times } from 'lodash'
import {
    BigLinkListComposedProps,
    BigLinkListItemProps,
    BigLinkListProps,
} from './BigLinkList.component'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'

const generateBigLinkListItems = ({
    count = 4,
    titles = [] as string[],
    wordCount = 2,
}): BigLinkListItemProps[] => {
    return times(count, (i) => {
        return {
            title: titles[i] || fakerWithSeed.lorem.words(wordCount),
            linkProps: {
                href: fakerWithSeed.internet.url(),
                description: fakerWithSeed.lorem.sentence(),
            },
        }
    })
}

export const bigLinkListGenerators = makeTypedGeneratorFn<BigLinkListProps>()({
    default: () => ({
        items: generateBigLinkListItems({
            count: 4,
            titles: [
                'Work & Solutions',
                'Our Thinking',
                'Inside Rightpoint',
                'Careers',
            ],
        }),
    }),
    many: () => ({
        items: generateBigLinkListItems({ count: 10 }),
    }),
    manyLong: () => ({
        items: generateBigLinkListItems({ count: 10, wordCount: 4 }),
    }),
    industries: () => ({
        arrows: false,
        items: generateBigLinkListItems({
            count: 4,
            titles: [
                'Finance',
                'Healthcare',
                'Mobility',
                'Retail',
                'Manufacturing',
            ],
        }),
    }),
})

export const bigLinkListComposedGenerators =
    makeTypedGeneratorFn<BigLinkListComposedProps>()({
        default: () => ({
            heroProps: {
                title: 'Title',
                subtitle:
                    'This is a subtitle and helps describe what the big link list is all about.',
            },
            items: generateBigLinkListItems({
                count: 4,
                titles: [
                    'Work & Solutions',
                    'Our Thinking',
                    'Inside Rightpoint',
                    'Careers',
                ],
            }),
        }),
    })
