import { ComponentStory, ComponentMeta } from '@storybook/react'
import { BackgroundColor } from '../BackgroundColor/BackgroundColor.component'
import { BackgroundColors } from '../BackgroundColor/BackgroundColor.styles'
import { Navigation, NavigationProps } from './Navigation.component'
import { navigationGenerators } from './Navigation.data'
import { typography } from '@rightpoint/core/styles'
import { fakerWithSeed } from '@rightpoint/data-generators'

import { cssVarsTypographyWrappers } from '@rightpoint/core/styles'

export default {
    component: Navigation,
    title: 'Components/Navigation',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },

        // chromatic: { disableSnapshot: true },
        nextRouter: {
            pathname: '/2',
        },
    },
} as ComponentMeta<typeof Navigation>

const Template: ComponentStory<typeof Navigation> = (args) => (
    <Navigation {...args} />
)

export const Default = Template.bind({})
Default.args = navigationGenerators.default()

const TextPlaceholder = () => (
    <div style={{ height: '50vh' }}>
        <typography.BodyL>
            <cssVarsTypographyWrappers.textColor>
                <div
                    style={{
                        textAlign: 'center',
                        maxWidth: '800px',
                        margin: '5em auto',
                    }}
                >
                    {fakerWithSeed.lorem.paragraph(3)}
                </div>
            </cssVarsTypographyWrappers.textColor>
        </typography.BodyL>
    </div>
)

export const InBackground = () => (
    <>
        <div style={{ height: '50vh' }}></div>
        <BackgroundColor color={BackgroundColors.Black}>
            <div style={{ height: '30vh' }}>
                <Navigation {...navigationGenerators.default()} />
                <TextPlaceholder />
            </div>
        </BackgroundColor>
        <div style={{ height: '100vh' }}></div>
        <BackgroundColor color={BackgroundColors.Coral}>
            <div style={{ height: '30vh' }}>
                <Navigation {...navigationGenerators.default()} />
                <TextPlaceholder />
            </div>
        </BackgroundColor>
        <div style={{ height: '50vh' }}></div>
    </>
)
