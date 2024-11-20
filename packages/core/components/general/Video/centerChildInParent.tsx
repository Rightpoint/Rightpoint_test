const DEBUG_LOG = false
/**
 * This function centers the video iframe inside of its parent container.
 */
export const centerIframeInParentIfExists = (root: HTMLDivElement) => {
    const iframe: HTMLIFrameElement = root && root.querySelector('iframe')

    if (!iframe) {
        console.log('no video iframe found')
        return
    }

    /**
     * The target aspect ratio is based on the parent actual width and height
     * which in most cases is set by the parent AspectWrapper sizer.
     *
     * <div>
     *    <sizer> sets bottom padding aspect
     *    <content> // this element is the parent
     *        <video> // this is the video component root
     */
    const container = root.parentElement

    const targetAspectRatio = container.clientWidth / container.clientHeight
    const actualVideoAspect = parseInt(iframe.width) / parseInt(iframe.height)

    const isContentTallerThanParent = actualVideoAspect >= targetAspectRatio

    // set the position to absolute, as video will need to overflow
    iframe.style.position = 'absolute'

    if (isContentTallerThanParent) {
        DEBUG_LOG && console.log('Video leaves space above and below parent')
        /**
         * container container container container container
         * [                  video                        ]
         * container container container container container
         *
         * If the video is shorter than the parent, then the width needs to expand until the height is the same as the parent.
         *
         * The video needs to become like this:
         *
         * [                           video     /container]              ]
         * [                           video     /container]              ]
         * [                           video     /container]              ]
         *
         * The video height is the same as the parent height.
         *
         * The iframe video needs to preserve its aspect ratio and explicitly set width/height
         * to avoid automatic white-space inside the frame.
         *
         * To calculate the new width, multiply the new video height by the video aspect
         */
        const newVideoHeight = container.clientHeight
        const newVideoWidth = newVideoHeight * actualVideoAspect
        iframe.style.width = newVideoWidth + 'px'
        iframe.style.height = newVideoHeight + 'px'
        /**
         * Now the video is overflowing to the right.
         *
         * To center it, we need to move it left by half the overflow.
         */
        const widthOverflow = newVideoWidth - container.clientWidth
        const halfWidthOverflow = widthOverflow / 2
        iframe.style.left = halfWidthOverflow * -1 + 'px'
    } else {
        DEBUG_LOG &&
            console.log('Video leaves space to the left and right parent')
        /**
         * container [        video       ] container
         * container [        video       ] container
         * container [        video       ] container
         *
         * In this scenario, the video should match the container width.
         *
         * It should look like this:
         * [                  video                        ]
         * [                  video                        ]
         * [ -------------- container edge ----------------]
         * [                  video                        ]
         */
        iframe.style.width = container.clientWidth + 'px'

        /**
         * Now we need to calculate the height of the video
         *
         * The iframe video needs to preserve its aspect ratio and explicitly set width/height
         * to avoid automatic white-space inside the frame.
         */
        const newVideoWidth = container.clientWidth
        const newVideoHeight = container.clientWidth / actualVideoAspect
        iframe.style.width = newVideoWidth + 'px'
        iframe.style.height = newVideoHeight + 'px'

        /**
         * Now the iframe is correctly sized, but needs to be vertically centered.
         *
         * It needs to be half the overflow between the height of the video, and the height of the container.
         */
        const overflow = newVideoHeight - container.clientHeight
        const halfOverflow = overflow / 2
        iframe.style.top = halfOverflow * -1 + 'px'
    }
}
