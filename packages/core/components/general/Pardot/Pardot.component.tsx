import { FC, useContext, useEffect, useId, useRef, useState } from 'react'
import ReactModal from 'react-modal'
import { createGlobalStyle } from 'styled-components'
import { zIndexes } from '@rightpoint/core/styles'
import { Button } from '../Button/Button.component'
import { PardotStyles as s } from './Pardot.styles'
import { isServer } from '@rightpoint/core/utils'
import { analytics, pardotUrls } from '@rightpoint/core/variables'

export interface PardotProps {
    embedUrl: string
    appearOnHash?: string // for direct linking
    align?: 'left' | 'right' | 'center' | string
    displayStyle?: 'Button' | 'Visible' | string
    cta?: string
}

/**
 * Pardot form.
 */
export const Pardot: FC<PardotProps> = ({ embedUrl, align = 'center' }) => {
    const ref = useRef<HTMLIFrameElement>()
    /**
     * The resizer library uses ":" to delineate data sent across frames. Replace the : with something else.
     */
    const resizerFriendlySeparator = 'ResizerPardot'
    const id = useId().replaceAll(':', resizerFriendlySeparator)

    const iframeId = id
    const [isIframeLoaded, setIsIframeLoaded] = useState(false)

    useEffect(() => {
        /**
         * Iframe takes time to load, fake a load time to prevent ugly flashes of content.
         *
         * Note that iframe resizer requires specific scripts in the Pardot "Layout Template" to
         * trigger cross frame communication.
         */
        if (!isIframeLoaded) {
            setTimeout(() => {
                setIsIframeLoaded(true)
            }, 500)

            /**
             * Size the iframe to the content, so that it doesn't look like one,
             * even if content changes due to validation.
             */
            if (ref.current) {
                const iframe = ref.current.querySelector('iframe')
                console.log(ref.current)
                const matchIframeContentSize = async () => {
                    const { iframeResize } = await import('iframe-resizer')
                    iframeResize({ log: true }, ref.current)
                }
                matchIframeContentSize()
            }
        }
    }, [isIframeLoaded])

    /**
     * Pass parent window query params to child, so that UTM params can be extracted
     * in iFrame scripts.
     */
    const queryParamsToPass = isServer ? '' : window.location.search
    return (
        <s.Pardot>
            <s.Iframe
                id={iframeId}
                src={embedUrl + queryParamsToPass}
                ref={ref}
                $isLoaded={isIframeLoaded}
            />
        </s.Pardot>
    )
}

export type PardotModalProps = PardotProps & {
    handleRequestClose: () => void
    isModalOpen: boolean
}
export const PardotModal: FC<PardotModalProps> = ({
    handleRequestClose,
    isModalOpen,
    ...props
}) => {
    return (
        <ReactModal
            portalClassName="PardotModalPortal"
            contentLabel="Form Modal"
            closeTimeoutMS={300}
            isOpen={isModalOpen}
            onRequestClose={handleRequestClose}
            shouldCloseOnEsc
            shouldCloseOnOverlayClick
            shouldReturnFocusAfterClose={true}
            onAfterOpen={() => {
                // if it's the pardot contact form, fire the event
                if (props.embedUrl === pardotUrls.CONTACT_FORM) {
                    analytics.fireDataLayer({
                        event: 'Contact Form Modal Opened',
                    })
                }
            }}
            style={{
                overlay: {
                    padding: 0,
                    margin: 0,
                    background: 'rgba(0, 0, 0, .80)',
                },
                content: {
                    padding: 0,
                },
            }}
        >
            <s.Modal.Background>
                <s.Modal.Content>
                    <s.Modal.Close onClick={handleRequestClose}>
                        Close
                    </s.Modal.Close>
                    <s.Modal.Title>{props.cta || 'Get in Touch'}</s.Modal.Title>
                    <Pardot {...props} />
                </s.Modal.Content>
            </s.Modal.Background>
        </ReactModal>
    )
}

/**
 * Pardot form iframe represented as a button.
 */
export const PardotButton: FC<PardotProps> = ({
    cta,
    displayStyle,
    ...props
}) => {
    // support for externally controlled / triggered modal
    const [isExpanded, setIsExpanded] = useState(displayStyle === 'Visible')
    return (
        <>
            <Button onClick={() => setIsExpanded(true)}>
                {cta || 'Get in Touch'}
            </Button>
            <PardotModal
                isModalOpen={isExpanded}
                handleRequestClose={() => setIsExpanded(false)}
                cta={cta}
                {...props}
            />
        </>
    )
}
