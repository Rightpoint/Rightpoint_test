import { parse } from 'node-html-parser'

export const sectionParsers = {
    text: (section) => {
        return {
            type: 'text' as const,
            title: section
                .querySelector('.text-manual-columns__title')
                ?.text.trim(),
            subtitle: section
                .querySelector('.text-manual-columns__subtitle')
                ?.text.trim(),
            bodyHtml: section
                .querySelectorAll(
                    // sometimes there is an intro element, sometimes just columns
                    '.text-manual-columns__intro, .text-manual-columns__column'
                )
                ?.map((column) => column.innerHTML)
                .join('\n'),
        }
    },
    image: (section) => {
        /**
         * Note: images can have a parallax wrapper, but the real image is the last image.
         */
        const images = section.querySelectorAll('img')
        const image = images?.slice(-1)[0]
        return {
            type: 'image' as const,
            image: image?.getAttribute('data-src'),
        }
    },
    images3: (section) => {
        const imagesColumns = section.querySelectorAll('.images-row__image')

        const lastImagesInEachColumn = imagesColumns?.map((imageColumn) => {
            const images = imageColumn.querySelectorAll('img')
            const image = images?.slice(-1)[0]
            return image?.getAttribute('data-src')
        })
        return {
            type: 'images3' as const,
            images: lastImagesInEachColumn ?? [],
        }
    },
    quote: (section) => {
        return {
            type: 'quote' as const,
            quote: section.querySelector('.quote__quote')?.text,
            person: {
                name: section.querySelector('.quote__name')?.text.trim(),
                jobTitle: section.querySelector('.quote__author')?.text.trim(),
            },
        }
    },
    video: (section) => {
        let videoUrl = ''
        try {
            videoUrl = parse(
                section.querySelector('[data-video-template]').innerHTML
            )
                .querySelector('iframe')
                .getAttribute('src')
                ?.split('?')[0]
        } catch (ex) {
            console.error('Error parsing video section', ex)
        }
        return {
            type: 'video' as const,
            title: section.querySelector('.html5-outline')?.text.trim(),
            videoUrl,
        }
    },
    contributions: (section) => {
        return {
            type: 'contributions' as const,
            title: section.querySelector('.contributions__title')?.text.trim(),
            groups: section
                .querySelectorAll('.contributions__column')
                .map((column) => {
                    return {
                        title: column
                            .querySelector('.contributions__subheadline')
                            ?.text.trim(),
                        bodyHtml: column.innerHTML,
                        // items: column
                        //     .querySelectorAll('.contributions__item')
                        //     .map((item) => item?.text.trim()),
                    }
                }) as {
                title: string
                bodyHtml: string
                // items: string[]
            }[],
        }
    },
    outcomes: (section) => {
        return {
            type: 'outcomes' as const,
            title: section.querySelector('.outcomes__title')?.text.trim(),
            bodyHtml: section.querySelector('.outcomes__text')?.innerHTML,
        }
    },
    outcomesStats: (section) => {
        return {
            type: 'outcomesStats' as const,
            title: section.querySelector('.outcomes__title')?.text.trim(),
            bodyHtml: section.querySelector('.outcomes__text')?.innerHTML,
            stats: section
                .querySelectorAll('.outcomes__outcome')
                .map((stat) => {
                    return {
                        number: stat
                            .querySelector('.outcomes__outcome__stat')
                            ?.text.trim(),
                        label: stat
                            .querySelector('.outcomes__outcome__text')
                            ?.text.trim(),
                    }
                }) as {
                number: string
                label: string
            }[],
        }
    },
}

export type SectionParserReturns = {
    [K in keyof typeof sectionParsers]: ReturnType<typeof sectionParsers[K]>
}[keyof typeof sectionParsers]
