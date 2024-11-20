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
    text: 'Learn More (default - inherits font size)',
}

export const StyledLink = Template.bind({})
StyledLink.args = {
    ...linkGenerators.styledLink(),
}

const buttonSizes = ['small' as const, 'normal' as const]

export const Button = () => {
    return (
        <>
            <div
                style={{
                    marginBottom: 10,
                }}
            >
                Default asButton:
            </div>
            <div
                style={{
                    marginBottom: 20,
                }}
            >
                <Link {...linkGenerators.button()} asButton />
            </div>
            {buttonSizes.map((size) => (
                <div
                    style={{
                        marginBottom: 20,
                    }}
                >
                    <div
                        style={{
                            marginBottom: 10,
                        }}
                    >
                        Size: {size}
                    </div>
                    <Link
                        {...linkGenerators.button()}
                        asButton={{
                            size,
                        }}
                    />
                    <div
                        style={{
                            marginBottom: 10,
                        }}
                    >
                        Size: {size} + outlined
                    </div>
                    <Link
                        {...linkGenerators.button()}
                        asButton={{
                            size,
                            outlined: true,
                        }}
                    />
                </div>
            ))}
        </>
    )
}

export const LinkPardot = Template.bind({})
LinkPardot.args = {
    ...linkGenerators.pardot(),
}

/**
 * Scroll to: doesn't work in Storybook due to
 * iframe and hash
 */
