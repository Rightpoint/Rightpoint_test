import { PageTransition } from './PageTransition'

export default {
    title: 'animation/PageTransition',
    component: PageTransition,
    parameters: {
        layout: 'fullscreen',
    },
    argTypes: {
        visible: {
            control: {
                type: 'boolean',
            },
        },
    },
}

const Template = (args) => (
    <>
        <PageTransition {...args} />
        <div
            style={{
                zIndex: -1,
                position: 'fixed',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            }}
        >
            <h1>PAGE CONTENT</h1>
        </div>
    </>
)

export const FadeOut = Template.bind({})

FadeOut.args = {
    transition: 'FadeOut',
    visible: true,
    children: <h1 style={{ color: 'white' }}>TRANSITION</h1>,
}

export const SlideUp = Template.bind({})

SlideUp.args = {
    transition: 'SlideUp',
    visible: true,
    children: <h1 style={{ color: 'white' }}>TRANSITION</h1>,
}

export const FancySlideUp = Template.bind({})

FancySlideUp.args = {
    transition: 'FancySlideUp',
    visible: true,
    children: <h1 style={{ color: 'white' }}>TRANSITION</h1>,
}
