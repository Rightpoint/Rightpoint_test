import { ComponentStory, ComponentMeta } from '@storybook/react'
import { LayoutWithNavbar } from '../../layout/Layout/Layout.component'
import { RootComponent } from '../../layout/RootComponent/RootComponent.component'
import { Header } from '../Header/Header.component'
import { headerGenerators } from '../Header/Header.data'
import { Hero } from '../Hero/Hero.component'
import { heroGenerators } from '../Hero/Hero.data'
import { NavigationBar, NavigationBarProps } from './NavigationBar.component'
import { navigationBarGenerators } from './NavigationBar.data'
export default {
    component: NavigationBar,
    title: 'Components/NavigationBar',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        // chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof NavigationBar>

const Template: ComponentStory<typeof NavigationBar> = (args) => (
    <>
        <LayoutWithNavbar>
            <Header
                {...headerGenerators.default()}
                headerTextProps={{
                    title: 'Scroll down to see the navigation bar stick, and scroll-spy.',
                }}
            />
            <NavigationBar {...args} />
            {args.items.map((item) => {
                return (
                    <>
                        <RootComponent>
                            <Hero
                                {...heroGenerators.default()}
                                title={item.text}
                            />
                        </RootComponent>
                    </>
                )
            })}
        </LayoutWithNavbar>
    </>
)

export const Default = Template.bind({})
Default.args = {
    ...navigationBarGenerators.default(),
}
