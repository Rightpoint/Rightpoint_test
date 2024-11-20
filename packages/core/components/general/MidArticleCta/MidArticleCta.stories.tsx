import { ComponentStory, ComponentMeta } from '@storybook/react'
import { BackgroundColors } from '../../layout/RootComponent/background-color'
import { RootComponentWrapperProps } from '../../layout/RootComponent/RootComponent.component'
import { MidArticleCta, MidArticleCtaProps } from './MidArticleCta.component'
import { midArticleCtaGenerators } from './MidArticleCta.data'
export default {
    component: MidArticleCta,
    title: 'Components/MidArticleCta',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        // chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof MidArticleCta>

const Template: ComponentStory<typeof MidArticleCta> = (args) => (
    <MidArticleCta {...args} />
)

export const Default = Template.bind({})
Default.args = {
    ...midArticleCtaGenerators.default(),
    rootDecoratorArgs: {
        background: {
            backgroundColor: BackgroundColors.Coral,
        },
    } as RootComponentWrapperProps,
}

export const WithLink = Template.bind({})
WithLink.args = midArticleCtaGenerators.withLink()
