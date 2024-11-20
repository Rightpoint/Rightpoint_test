import { ComponentStory, ComponentMeta } from '@storybook/react'
import { BackgroundColors } from '../../layout/RootComponent/background-color'
import { RootComponent } from '../../layout/RootComponent/RootComponent.component'
import { Card, CardVariants } from './Card.component'
import { cardGenerators } from './Card.data'

export default {
    component: Card,
    title: 'atoms/Cards/Card',
} as ComponentMeta<typeof Card>

const Template: ComponentStory<typeof Card> = (args) => (
    <div
        style={{
            display: 'flex',
            gap: 20,
        }}
    >
        <div style={{ maxWidth: 320 }}>
            <RootComponent
                styles={{
                    padding: 20,
                }}
                noMargins
                noPadding
                background={{ backgroundColor: BackgroundColors.None }}
            >
                <Card {...args} />
            </RootComponent>
        </div>

        <div style={{ maxWidth: 320 }}>
            <RootComponent
                styles={{
                    padding: 20,
                }}
                noMargins
                noPadding
                background={{ backgroundColor: BackgroundColors.Neutral2 }}
            >
                <Card {...args} />
            </RootComponent>
        </div>

        <div style={{ maxWidth: 320 }}>
            <RootComponent
                styles={{
                    padding: 20,
                }}
                noMargins
                noPadding
                background={{ backgroundColor: BackgroundColors.Black }}
            >
                <Card {...args} />
            </RootComponent>
        </div>
    </div>
)

export const Card1 = Template.bind({})
Card1.args = {
    ...cardGenerators.card1(),
}

export const Card2 = Template.bind({})
Card2.args = {
    ...cardGenerators.card2(),
}

const FullWidthTemplate: ComponentStory<typeof Card> = (args) => (
    <>
        <RootComponent
            container
            noMargins
            background={{ backgroundColor: BackgroundColors.None }}
        >
            <Card {...args} />
        </RootComponent>
        <RootComponent
            container
            noMargins
            background={{ backgroundColor: BackgroundColors.Neutral2 }}
        >
            <Card {...args} />
        </RootComponent>
        <RootComponent
            container
            noMargins
            background={{ backgroundColor: BackgroundColors.Black }}
        >
            <Card {...args} />
        </RootComponent>
    </>
)

export const CardFullWidth = FullWidthTemplate.bind({})
CardFullWidth.args = {
    ...cardGenerators.cardFullWidth(),
}
