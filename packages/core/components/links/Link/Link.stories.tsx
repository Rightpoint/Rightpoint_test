import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useScrollToTextWithHash } from '@rightpoint/core/utils'
import { Link, LinkProps } from './Link.component'
import { linkGenerators } from './Link.data'
export default {
    component: Link,
    title: 'Atoms/Link',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        // chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof Link>

const Template: ComponentStory<typeof Link> = (args) => <Link {...args} />

export const Default = Template.bind({})
Default.args = {
    ...linkGenerators.default(),
}

export const Button = Template.bind({})
Button.args = {
    ...linkGenerators.button(),
}

export const ScrollTo = () => {
    const targetText = 'match me'
    return (
        <>
            <div
                style={{
                    height: '50vh',
                    marginBottom: '100vh',
                }}
            >
                <Link
                    {...linkGenerators.scrollToText()}
                    scrollTo={{
                        text: targetText,
                    }}
                    onClick={() => {
                        console.log(
                            'This should still fire too even though we scroll'
                        )
                    }}
                />
            </div>
            <div data-root>
                This is some text to scroll to target:
                <span>{targetText}</span>
            </div>
        </>
    )
}
