import { ComponentStory, ComponentMeta } from '@storybook/react'
import {
    Animation,
    AnimationProps,
    useScrollAnimation,
} from './Animation.component'
export default {
    component: Animation,
    title: 'Animation/Animation System',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        // chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof Animation>

export const Default = () => {
    const { Animation } = useScrollAnimation()
    return (
        <div>
            <h2>In viewport fade in hook</h2>
            <div
                style={{
                    height: '50vh',
                }}
            />
            <Animation>This is the content</Animation>
            <div
                style={{
                    height: '150vh',
                }}
            />
        </div>
    )
}
