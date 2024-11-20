import { ComponentStory, ComponentMeta } from '@storybook/react'
import { BackgroundColors } from '../../layout/RootComponent/background-color'
import { RootComponentWrapper } from '../../layout/RootComponent/RootComponent.component'
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
            <RootComponentWrapper>
                <SimpleContent
                    {...SimpleContentGenerators.default({
                        title: 'Basic Heading',
                    })}
                />
            </RootComponentWrapper>

            <RootComponentWrapper container>
                <SimpleContent
                    {...SimpleContentGenerators.default({
                        title: 'Contained',
                    })}
                />
            </RootComponentWrapper>

            <RootComponentWrapper
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
            </RootComponentWrapper>

            <RootComponentWrapper
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
            </RootComponentWrapper>

            <RootComponentWrapper>
                <SimpleContent
                    {...SimpleContentGenerators.default({
                        title: 'Right align',
                    })}
                    textAlign="right"
                />
            </RootComponentWrapper>
        </>
    )
}
