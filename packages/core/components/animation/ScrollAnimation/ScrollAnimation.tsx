import { useState } from 'react'
import styled from 'styled-components'
import {
    AnimationContext,
    AnimationContextCustomProvider,
} from '../AnimationContext'
import { ScrollOffset } from '../Surface/Surface'

type ScrollHeight = string | number

type ScrollAnimationProps = {
    style?: any
    children?: React.ReactNode
    scrollOffset?: ScrollOffset
    scrollHeight?: ScrollHeight
}

const ScrollContainer = styled.div<{ $scrollHeight?: ScrollHeight }>`
    position: relative;
    min-height: ${({ $scrollHeight = '150vh' }) => $scrollHeight};
`

const ScrollContent = styled.div`
    position: sticky;
    top: 0;
    min-height: 100vh;
`

export const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
    children,
    scrollOffset,
    scrollHeight,
    style,
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
            $scrollHeight={scrollHeight}
            style={style}
        >
            <AnimationContextCustomProvider
                value={{ scrollSource, scrollOffset }}
            >
                <ScrollContent>{children}</ScrollContent>
            </AnimationContextCustomProvider>
        </ScrollContainer>
    )
}
