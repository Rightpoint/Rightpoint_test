import { ImageWithAspect } from '../../general/Image/Image.component'
import { Parallax } from './Parallax'
import { ParallaxLayer } from './ParallaxLayer'

export const ParallaxImage = ({ src, alt, ...props }) => {
    return (
        <Parallax>
            <ParallaxLayer {...props}>
                <ImageWithAspect {...{ src, alt }} />
            </ParallaxLayer>
        </Parallax>
    )
}
