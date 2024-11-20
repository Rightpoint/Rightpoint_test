import { Story, Meta } from '@storybook/react'
import { useDispatch, useSelector } from 'react-redux'
import { NavbarPopup, NavbarPopupProps } from './NavbarPopup.component'
import { resets } from '@rightpoint/core/styles'
import styled from 'styled-components'
import { navbarSelectors, navbarActions } from '@rightpoint/core/redux'
import { navbarPopupGenerators } from './NavbarPopup.data'

export default {
    component: NavbarPopup,
    title: 'Layout/NavbarPopup',
    decorators: [],
    parameters: {
        chromatic: {
            delay: 500, // wait for popup to finish fading
        },
    },
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
        const isNavbarOpen = useSelector(navbarSelectors.isOpen)
        return (
            <div
                style={{
                    backgroundSize: 'cover',
                    height: '100vh',
                    position: 'absolute',
                    inset: 0,
                }}
            >
                <div style={{ paddingTop: 1 }}></div>
                {/* prevent margin collapse */}

                <Button
                    type="button"
                    onClick={() =>
                        dispatch(
                            isNavbarOpen
                                ? navbarActions.close()
                                : navbarActions.open()
                        )
                    }
                    style={{
                        zIndex: 99999,
                        color: isNavbarOpen ? 'white' : 'black',
                        cursor: 'pointer',
                    }}
                >
                    <pre>{isNavbarOpen ? '' : 'OPEN MENU'}</pre>
                </Button>
                <Component {...args} />
            </div>
        )
    }
    return TemplateStory
}

const Template: Story<NavbarPopupProps> = buildStory({ Component: NavbarPopup })

export const ClickToOpen = Template.bind({})
ClickToOpen.args = {
    ...navbarPopupGenerators.default(),
}

export const Opened = Template.bind({})
Opened.args = {
    ...navbarPopupGenerators.opened(),
}

// const WithBezierEditorTemplate = buildStory({
//     Component: withBezierEditor(NavbarPopup, {
//         contexts: {
//             previewExitAnimation: {
//                 defaultValue: [0.95, 0.23, 0.17, 1],
//                 title: 'Preview exit',
//             },
//             blurEasing: {
//                 defaultValue: [0.17, 0.67, 0.83, 0.67],
//                 title: 'Blur ease',
//             },
//         },
//     }),
// })

// export const WithBezierEditor = WithBezierEditorTemplate.bind({})
// WithBezierEditor.args = {
//     ...navbarPopupGenerators.default(),
// }
