import { FC, ReactNode, useRef, useState } from 'react'
import { ModalStyles as s } from './Modal.styles'
import ReactModal from 'react-modal'

export interface ModalProps extends ReactModal {
    title: string
    children?: ReactNode
}

export const Modal: FC<ModalProps> = ({ title, ...reactModalProps }) => {
    const [isOpen, setIsOpen] = useState(false)
    const ref = useRef()

    return (
        <div>
            <s.GlobalStyleInject />
            {/* 
              This uses a portal, cannot style directly see GlobalStyleInject
            */}
            <ReactModal
                isOpen={isOpen}
                // onAfterOpen={() => {
                //     console.log('after open')
                // }}
                // onRequestClose={() => {
                //     setIsOpen(false)
                // }}
                shouldCloseOnOverlayClick
                contentLabel="Example Modal"
                {...reactModalProps}
            >
                <s.Modal>
                    <s.Close>Close</s.Close>
                    <s.Title as="h2">{title}</s.Title>
                </s.Modal>
            </ReactModal>
        </div>
    )
}
