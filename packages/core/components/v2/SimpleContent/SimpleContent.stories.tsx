import { ComponentStory, ComponentMeta } from '@storybook/react'
import { AnimationsDisabled } from '../../general/Animation/Animation.context'
import { BackgroundColors } from '../../layout/RootComponent/background-color'
import { RootComponent } from '../../layout/RootComponent/RootComponent.component'
import { SimpleContent, SimpleContentProps } from './SimpleContent.component'
import { SimpleContentGenerators } from './SimpleContent.data'
export default {
    component: SimpleContent,
    title: 'V2/Content/SimpleContent',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        // chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof SimpleContent>

const Template: ComponentStory<typeof SimpleContent> = (args) => (
    <SimpleContent {...args} />
)

export const Default = Template.bind({})
Default.args = {
    ...SimpleContentGenerators.default(),
}

export const StressTest = () => {
    return (
        <>
            <AnimationsDisabled>
                <RootComponent>
                    <SimpleContent
                        {...SimpleContentGenerators.default({
                            title: 'Basic Heading',
                        })}
                    />
                </RootComponent>

                <RootComponent container>
                    <SimpleContent
                        {...SimpleContentGenerators.default({
                            title: 'Contained',
                        })}
                    />
                </RootComponent>

                <RootComponent
                    background={{
                        backgroundColor: BackgroundColors.Black,
                    }}
                    container
                >
                    <SimpleContent
                        {...SimpleContentGenerators.default({
                            title: 'Contained, Black Background, Centered',
                        })}
                        textAlign="center"
                    />
                </RootComponent>

                <RootComponent
                    background={{
                        backgroundColor: BackgroundColors.Sand,
                    }}
                    container
                >
                    <SimpleContent
                        {...SimpleContentGenerators.default({
                            title: 'Contained, Sand Background, Centered',
                        })}
                        textAlign="center"
                    />
                </RootComponent>

                <RootComponent>
                    <SimpleContent
                        {...SimpleContentGenerators.default({
                            title: 'Right align',
                        })}
                        textAlign="right"
                    />
                </RootComponent>
            </AnimationsDisabled>
        </>
    )
}
