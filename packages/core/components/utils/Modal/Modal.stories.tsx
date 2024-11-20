import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useState } from 'react'
import { Modal, ModalProps } from './Modal.component'
import { modalGenerators } from './Modal.data'
export default {
    component: Modal,
    title: 'Modal',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        // chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof Modal>

export const Default = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <button
                onClick={() => {
                    setIsOpen(true)
                }}
            >
                Open Modal
            </button>
        </>
    )
}
