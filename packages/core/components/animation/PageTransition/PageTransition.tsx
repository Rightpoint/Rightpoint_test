import { motion } from 'framer-motion'
import { get, includes } from 'lodash'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

type PageTransitionProps = {
    style?: any
    children?: React.ReactNode
    visible?: boolean
    transition?: 'FadeOut' | 'SlideUp' | 'FancySlideUp'
}

const Root = styled(motion.div)`
    background: black;
    position: fixed;
    inset: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const transitions = {
    FadeOut: ({ visible, ...props }: PageTransitionProps) => (
        <Root
            {...props}
            initial={{ opacity: 0 }}
            animate={{ opacity: visible ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        />
    ),
    SlideUp: ({ visible, ...props }: PageTransitionProps) => (
        <Root
            {...props}
            initial={{ y: '-100%' }}
            animate={{ y: visible ? '0%' : '-100%' }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.5 }}
        />
    ),
    FancySlideUp: ({ visible, children, ...props }: PageTransitionProps) => {
        const [animationState, setAnimationState] = useState<
            'hidden' | 'showing' | 'visible' | 'hiding'
        >('hidden')

        useEffect(() => {
            if (visible && animationState === 'hidden') {
                setAnimationState('showing')
            } else if (!visible && animationState === 'visible') {
                setAnimationState('hiding')
            }
        }, [visible])

        useEffect(() => {
            console.log('Animation changed to', animationState)
        }, [animationState])

        return (
            <Root
                {...props}
                initial={{ y: '-100%' }}
                animate={{ y: visible ? '0%' : '-100%' }}
                exit={{ y: '-100%' }}
                transition={{
                    mass: 0.2,
                    stiffness: 20,
                    damping: 0,
                }}
                onAnimationComplete={() => {
                    if (animationState === 'showing') {
                        setAnimationState('visible')
                    } else if (animationState === 'hiding') {
                        setAnimationState('hidden')
                    }
                }}
            >
                {children}
                <motion.div
                    initial={{
                        rotateZ: includes(['hiding', 'visible'], animationState)
                            ? 4
                            : 0,
                    }}
                    animate={{
                        rotateZ: includes(['hiding', 'visible'], animationState)
                            ? 4
                            : 0,
                    }}
                    exit={{
                        rotateZ: includes(['hiding', 'visible'], animationState)
                            ? 0
                            : 4,
                    }}
                    transition={{
                        type: 'spring',
                        mass: 0.2,
                        stiffness: 500,
                        damping: 20,
                    }}
                    style={{
                        transformOrigin: 'bottom left',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '30vh',
                        background: 'inherit',
                    }}
                />
            </Root>
        )
    },
}

export const PageTransition: React.FC<PageTransitionProps> = ({
    transition = 'FadeOut',
    ...props
}) => {
    const Transition = get(transitions, transition)

    return <Transition {...props} />
}
