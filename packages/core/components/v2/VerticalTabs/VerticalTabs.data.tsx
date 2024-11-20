import { multiMediaGenerators } from '../../general/MultiMedia/MultiMedia.data'
import { contentfulRichTextDummyGenerators } from '../../general/RichText/contentful-rich-text-dummy-generator'
import { VerticalTabsProps } from './VerticalTabs.component'

export const verticalTabsGenerators = {
    default: (): VerticalTabsProps => ({
        items: [
            {
                title: 'Insights',
                bodyDocument:
                    contentfulRichTextDummyGenerators.generateDocument({
                        contents: [
                            {
                                nodeType: 'paragraph',
                                text: `Ongoing transformation of IKEA's omnichannel commerce, in-store, and employee-facing products, including launching its first e-commerce app.`,
                            },
                        ],
                    }),
                multiMediaProps: multiMediaGenerators.threeDimensional({
                    filename: '1',
                }),
            },
            {
                title: 'Strategy',
                body: `Ongoing transformation of IKEA's omnichannel commerce, in-store, and employee-facing products, including launching its first e-commerce app.`,
                multiMediaProps: multiMediaGenerators.threeDimensional({
                    filename: '2',
                }),
            },
            {
                title: 'Design',
                body: `Ongoing transformation of IKEA's omnichannel commerce, in-store, and employee-facing products, including launching its first e-commerce app.`,
                multiMediaProps: multiMediaGenerators.threeDimensional({
                    filename: '3',
                }),
            },
            {
                title: 'Content',
                body: `Ongoing transformation of IKEA's omnichannel commerce, in-store, and employee-facing products, including launching its first e-commerce app.`,
                multiMediaProps: multiMediaGenerators.threeDimensional({
                    filename: '4',
                }),
            },

            {
                title: 'Engineering',
                body: `Ongoing transformation of IKEA's omnichannel commerce, in-store, and employee-facing products, including launching its first e-commerce app.`,
                multiMediaProps: multiMediaGenerators.threeDimensional({
                    filename: '5',
                }),
            },
        ],
    }),
}
