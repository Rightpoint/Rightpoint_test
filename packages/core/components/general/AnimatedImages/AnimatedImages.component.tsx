import { motion, AnimatePresence } from 'framer-motion'
import { FC, useContext, useEffect, useState } from 'react'
import { withAspectWrapper } from '../../utils/AspectWrapper/AspectWrapper.component'
import {
    BezierEditorContext,
    useBezierEditorContextDefaults,
} from '../../utils/BezierEditor/BezierEditor.component'
import { Image, ImageProps } from '../Image/Image.component'
import { AnimatedImagesStyles as s } from './AnimatedImages.styles'

export interface AnimatedImagesProps {
    images: ImageProps[]
}

interface AnimatedImageProps {
    image: ImageProps
}
const AnimatedImage: FC<AnimatedImageProps> = ({ image }) => {
    const { bezier } = useBezierEditorContextDefaults({
        bezier: [0.95, 0.23, 0.17, 1],
    })
    return (
        <AnimatePresence initial={false}>
            <s.AnimatedImage
                as={motion.div}
                key={image.src}
                initial={{ bottom: '100%', y: 0 }}
                animate={{ bottom: '0%' }}
                exit={{ y: '30%' }}
                transition={{
                    duration: 3,
                    ease: bezier,
                }}
                style={{
                    zIndex: 2,
                }}
            >
                <Image {...image} />
            </s.AnimatedImage>
        </AnimatePresence>
    )
}

/**
 * This component is a multiple image field -- basically an autoplay gallery
 * but specifically intended to convey a particular motion language that matches
 * the brand.
 *
 * It is essentially a replacement for Video that is easier to author.
 */
export const AnimatedImages = withAspectWrapper<AnimatedImagesProps>(
    ({ images = [] }) => {
        const [activeIndex, setActiveIndex] = useState(0)
        useEffect(() => {
            const SPEED = 4000
            const timeoutId = setTimeout(() => {
                const isLast = activeIndex === images.length - 1
                setActiveIndex(isLast ? 0 : activeIndex + 1)
            }, SPEED)
            return () => clearTimeout(timeoutId)
        }, [activeIndex, images.length])
        return (
            <s.AnimatedImages>
                <AnimatedImage image={images[activeIndex]} />
            </s.AnimatedImages>
        )
    }
)
