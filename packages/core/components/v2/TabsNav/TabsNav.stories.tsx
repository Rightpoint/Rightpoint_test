import { ComponentStory, ComponentMeta } from '@storybook/react'
import { TabsNav, TabsNavProps } from './TabsNav.component'
import { tabsNavGenerators } from './TabsNav.data'
export default {
    component: TabsNav,
    title: 'V2/Components/TabsNav',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        // chromatic: { disableSnapshot: true },
        nextRouter: {
            pathname: '/solutions',
            asPath: '/solutions',
        },
    },
} as ComponentMeta<typeof TabsNav>

const Template: ComponentStory<typeof TabsNav> = (args) => <TabsNav {...args} />

export const Default = Template.bind({})
Default.args = {
    ...tabsNavGenerators.default(),
}

export const OnClick = Template.bind({})
OnClick.args = tabsNavGenerators.onClick()
