import { Story, Meta } from '@storybook/react'
import { useDispatch } from 'react-redux'
import { NavbarPopup, NavbarPopupProps } from './NavbarPopup.component'
import { resets } from '@rightpoint/core/styles'
import styled from 'styled-components'
import { navbarActions } from '@rightpoint/core/redux'
import { navbarPopupGenerators } from './NavbarPopup.data'
import { useState } from 'react'
import { withBezierEditor } from '../../utils/BezierEditor/BezierEditor.component'

export default {
    component: NavbarPopup,
    title: 'Layout/NavbarPopup',
    decorators: [],
} as Meta

const Button = styled.button`
    ${resets.button}
    margin-top: 20px;
    padding-top: 1px;
    margin-left: auto;
    margin-right: 20px;
    display: block;
    width: 100px;
`

const buildStory = ({ Component = NavbarPopup }) => {
    const TemplateStory = (args) => {
        const dispatch = useDispatch()
        const [img, setImg] = useState(
            `https://source.unsplash.com/3ZUsNJhi_Ik/900`
        )
        return (
            <div
                style={{
                    background: `url(${img})`,
                    backgroundSize: 'cover',
                    height: '100vh',
                }}
            >
                <div style={{ paddingTop: 1 }}></div>
                {/* prevent margin collapse */}
                <Button
                    type="button"
                    onClick={() =>
                        setImg(
                            `https://source.unsplash.com/random/${(
                                900 +
                                Math.random() * 100
                            ).toFixed(0)}`
                        )
                    }
                >
                    <pre>CHANGE IMAGE</pre>
                </Button>
                <Button
                    type="button"
                    onClick={() => dispatch(navbarActions.open())}
                >
                    <pre>MENU</pre>
                </Button>
                <Component {...args} />
            </div>
        )
    }
    return TemplateStory
}

const Template: Story<NavbarPopupProps> = buildStory({ Component: NavbarPopup })

export const Default = Template.bind({})
Default.args = {
    ...navbarPopupGenerators.default(),
}

const WithBezierEditorTemplate = buildStory({
    Component: withBezierEditor(NavbarPopup, {
        contexts: {
            previewExitAnimation: {
                defaultValue: [0.95, 0.23, 0.17, 1],
                title: 'Preview exit',
            },
            blurEasing: {
                defaultValue: [0.17, 0.67, 0.83, 0.67],
                title: 'Blur ease',
            },
        },
    }),
})

export const WithBezierEditor = WithBezierEditorTemplate.bind({})
WithBezierEditor.args = {
    ...navbarPopupGenerators.default(),
}
