import { FC, useContext, useEffect, useRef, useState } from 'react'
import { CSSProperties } from 'styled-components'
import { RootComponentContext } from '../../layout/RootComponent/RootComponent.context'
import { Button } from '../Button/Button.component'
import { PardotStyles as s } from './Pardot.styles'

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
    const { id } = useContext(RootComponentContext)
    const iframeId = id + 'pardot'
    const [isIframeLoaded, setIsIframeLoaded] = useState(false)

    useEffect(() => {
        /**
         * Iframe takes time to load, fake a load time to prevent ugly flashes of content.
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
                const matchIframeContentSize = async () => {
                    const { iframeResize } = await import('iframe-resizer')
                    iframeResize({ log: true }, '#' + iframeId)
                }
                matchIframeContentSize()
            }
        }
    }, [ref, iframeId, isIframeLoaded])

    return (
        <s.Pardot
            style={{
                textAlign: align as CSSProperties['textAlign'],
            }}
        >
            <s.Iframe
                id={iframeId}
                src={embedUrl}
                ref={ref}
                $isLoaded={isIframeLoaded}
            />
        </s.Pardot>
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
    const [isExpanded, setIsExpanded] = useState(displayStyle === 'Visible')
    return (
        <>
            {!isExpanded && (
                <Button onClick={() => setIsExpanded(true)}>
                    {cta || 'Get in Touch'}
                </Button>
            )}
            {isExpanded && <Pardot {...props} />}
        </>
    )
}
