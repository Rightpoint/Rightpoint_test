import { FC, useState } from 'react'
import ImageLib from 'next/image'
import { ImageStyles as s } from './Image.styles'
import { withAspectWrapper } from '../../utils/AspectWrapper/AspectWrapper.component'

export interface ImageProps {
    src: string
    alt: string
    title?: string
    width?: number
    height?: number
    noDimensions?: boolean

    plaiceholder?: {
        cssProps?: any
        imageProps?: any
        base64?: any
    }
}

export const PureImage: FC<ImageProps> = (props) => {
    return (
        <>
            <s.PureImage
                {...props}
                data-hint={props.noDimensions ? 'no-dimensions' : ''}
            />
        </>
    )
}

interface ImageNextProps extends ImageProps {
    width?: number
    height?: number
    objectFit?: string
    parentAspectRatio?: number
}

/**
 * What are our various image scenarios?
 *
 * 1. Next/image requires width/height, unless it uses the layout=fill prop, which requires a relative/sized parent.
 *  Next is dead set on preventing you from allowing pixel shift.
 *
 * 2. Contentful always provides width/height.
 */
export const Image: FC<ImageNextProps> = ({
    src,
    alt = '',
    title,
    width,
    height,
    parentAspectRatio,
    plaiceholder,
}) => {
    const hasDimensions = width && height

    // animate in image after load
    const [isLoaded, setIsLoaded] = useState(false)

    if (!src) {
        return <>.</>
    }

    // next/image does not allow protocol relative urls
    const srcAbsolute = src.replace(/^\/\//, 'https://')

    // contentful assets will have pre-known width/height via API response.
    // should arbitrary images be loaded, use a standard image tag.
    if (!hasDimensions) {
        return <PureImage src={srcAbsolute} alt={alt} />
    }

    return (
        <s.Image $isLoaded={isLoaded}>
            {/* plaiceholder css gradient hard coded on load */}
            {plaiceholder?.cssProps && (
                <s.Placeholder
                    suppressHydrationWarning
                    style={{
                        ...plaiceholder.cssProps,
                    }}
                    aria-hidden="true"
                    $isLoaded={isLoaded}
                />
            )}
            <ImageLib
                suppressHydrationWarning
                src={srcAbsolute}
                alt={alt}
                title={title}
                // prioritize first image (i.e. not lazy)
                priority={isPriorityImage()}
                // If not, set width/height and "responsive" which causes Next.js to inject its own aspect handler, based on contentful asset size.
                {...(parentAspectRatio
                    ? { fill: true }
                    : {
                          width,
                          height,
                      })}
                // disable in storybook: it cannot support next/image processing
                unoptimized={Boolean(process.env.IS_STORYBOOK)}
                onLoadingComplete={(image) => {
                    setIsLoaded(true)
                }}
                style={{
                    objectFit: 'cover',
                    maxWidth: '100%',
                }}

                // sizes // by default is 100vw -- TODO: must set contextually
            />
        </s.Image>
    )
}

/**
 * Detect the first image on a page and set it to priority.
 * It's a naive, but simple way to prioritize the first image.
 */
const global = {
    firstImageMounted: false,
}
function isPriorityImage() {
    if (!global.firstImageMounted) {
        global.firstImageMounted = true
        return true
    }
    return false
}

export const ImageWithAspect = withAspectWrapper<ImageNextProps>(Image)
