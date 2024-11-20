import { useState } from 'react'
import styled from 'styled-components'
import {
    AnimationContext,
    AnimationContextCustomProvider,
} from '../AnimationContext'
import { ScrollOffset } from '../Surface/Surface'

type ScrollAnimationProps = {
    style?: any
    children?: React.ReactNode
    scrollOffset?: ScrollOffset
}

const ScrollContainer = styled.div`
    position: relative;
    min-height: 150vh;
`

const ScrollContent = styled.div`
    position: sticky;
    top: 0;
    min-height: 100vh;
`

export const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
    children,
    scrollOffset,
    ...props
}) => {
    const [scrollSource, setScrollSource] = useState<HTMLElement | null>(null)

    return (
        <ScrollContainer
            ref={(ref) => {
                if (ref !== scrollSource) {
                    setScrollSource(ref)
                }
            }}
        >
            <AnimationContextCustomProvider
                value={{ scrollSource, scrollOffset }}
            >
                <ScrollContent>{children}</ScrollContent>
            </AnimationContextCustomProvider>
        </ScrollContainer>
    )
}
