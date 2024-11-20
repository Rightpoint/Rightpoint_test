import { Surface, SurfaceAnimationProps } from '../Surface/Surface'

type ParallaxLayerProps = {
    style?: any
    children?: React.ReactNode
    color?: string
    animation?: SurfaceAnimationProps
    interval?: [number, number]
}

export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
    interval = [0, -1],
    children,
    ...props
}) => {
    return (
        <Surface
            {...props}
            animation={{
                target: 'content',
                initial: {
                    translateY: `${interval[0] * 100}%`,
                },
                final: {
                    translateY: `${interval[1] * 100}%`,
                },
                scrollOffset: ['start end', 'end start'],
            }}
        >
            {children}
        </Surface>
    )
}
