import { Meta, Story } from '@storybook/react'
import styled from 'styled-components'
import { media } from '@rightpoint/core/styles'
import {
    SolutionsAnimation,
    SolutionsAnimationProps,
} from './SolutionsAnimation.component'

export default {
    component: SolutionsAnimation,
    title: 'v2/Dynamic Components/SolutionsAnimation',
    parameters: {
        chromatic: { disableSnapshot: true },
    },
} as Meta

const PrototypeWrapper = styled.div`
    box-sizing: border-box;
    width: 100vh;
    height: 100vh;
    max-width: 100%;

    padding: 0px;
    padding-top: 10vh;

    ${media('lg')} {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0vh;
        margin: auto;
    }
`

const Template: Story<SolutionsAnimationProps> = (args) => (
    <PrototypeWrapper>
        <SolutionsAnimation {...args} />
    </PrototypeWrapper>
)

export const Default = Template.bind({})

Default.args = {}
