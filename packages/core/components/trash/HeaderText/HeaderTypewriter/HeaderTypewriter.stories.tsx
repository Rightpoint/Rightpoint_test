import { ComponentStory, ComponentMeta } from '@storybook/react'
import {
    HeaderTypewriter,
    HeaderTypewriterProps,
} from './HeaderTypewriter.component'
import { headerTypewriterGenerators } from './HeaderTypewriter.data'

export default {
    component: HeaderTypewriter,
    title: 'Components/Header/TypewriterSubComponent',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof HeaderTypewriter>

const Template: ComponentStory<typeof HeaderTypewriter> = (args) => (
    <HeaderTypewriter {...args} />
)

export const Default = Template.bind({})
Default.args = headerTypewriterGenerators.default()

// export const UsingRetainer = Template.bind({})
// UsingRetainer.args = headerTypewriterGenerators.usingRetainer()

// export const UsingRetainerAndLeftAlign = Template.bind({})
// UsingRetainerAndLeftAlign.args =
//     headerTypewriterGenerators.usingRetainerAndLeftAlign()

// export const MultilineAndRetainer = () => (
//     <div style={{ backgroundColor: colors.accent, padding: 20 }}>
//         <div
//             style={{
//                 backgroundColor: colors.white,
//                 maxWidth: '60%',
//                 margin: '20px auto',
//                 padding: 20,
//             }}
//         >
//             <HeaderTypewriter
//                 {...headerTypewriterGenerators.longText()}
//                 retainer
//                 style={{ textAlign: 'left' }}
//             />
//         </div>
//     </div>
// )
