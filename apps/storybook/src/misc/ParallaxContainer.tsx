import { useEffect, useRef, useState } from 'react'
import {
    motion,
    useTransform,
    useScroll,
    useIsomorphicLayoutEffect,
} from 'framer-motion'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ParallaxContainer = ({ children, ...props }: any) => {
    const { scrollYProgress } = useScroll()

    const parallaxContainerRef = useRef<HTMLDivElement>(null)

    const [{ from, to, height }, setParallaxState] = useState({
        from: 0,
        to: 0,
        height: 1000,
    })

    const parallaxProgress = useTransform(scrollYProgress, [from, to], [0, 1])

    const y = useTransform(
        scrollYProgress,
        [from, to],
        [0, height - window.innerHeight]
    )

    console.log({
        height,
        windowHeight: window.innerHeight,
        y: y.get(),
        parallaxProgress: parallaxProgress.get(),
    })

    useIsomorphicLayoutEffect(() => {
        const onResize = () => {
            console.log('resize')

            const height = parallaxContainerRef.current?.clientHeight || 0
            const from = parallaxContainerRef.current?.offsetTop || 0
            const to = from + height

            setParallaxState({ from, to, height })
        }
        onResize()
        window.addEventListener('resize', onResize)
        return () => {
            window.removeEventListener('resize', onResize)
        }
    }, [])

    return (
        <div
            ref={parallaxContainerRef}
            {...props}
            style={{
                position: 'relative',
                overflow: 'hidden',
                width: '100%',
                height: '100%',
                ...props.style,
            }}
        >
            <motion.div
                style={{
                    paddingBottom: parallaxProgress,
                    y,
                    background: 'red',
                    height: '100vh',
                }}
            >
                {typeof children == 'function'
                    ? children({ progress: parallaxProgress })
                    : children}
            </motion.div>
        </div>
    )
}
