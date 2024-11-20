import bezier from 'bezier-easing'
import { useTransform, useScroll } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useBezierEditorContextDefaults } from '../../../utils/BezierEditor/BezierEditor.component'
import { useWindowDimensions } from '@rightpoint/core/utils'

import { motion } from 'framer-motion'
export const ScrollInSlideUp = ({ children, transition }) => {
    const ref = useRef<HTMLDivElement>()
    const { scrollY } = useScroll()
    const { height: windowHeight } = useWindowDimensions()
    const [range, setRange] = useState([0, 0])
    useEffect(() => {
        const ENTER_START_OFFSET = 150
        const ENTER_DISTANCE = 300
        // we have the ref
        if (ref.current && windowHeight) {
            const rect = ref.current.getBoundingClientRect()
            // Start position is when element top reaches viewport bottom
            const elAbsoluteOffsetTop = window.scrollY + rect.top
            const start =
                elAbsoluteOffsetTop - windowHeight + ENTER_START_OFFSET
            // End position is when element bottom reaches viewport top
            const end = start + ENTER_DISTANCE
            const isAboveFold = start < windowHeight

            if (isAboveFold) {
                setRange([start, start])
            } else {
                setRange([start, end])
            }
        } else {
        }
    }, [ref, windowHeight])

    const ease = (transition && transition.ease) || [0, 0.95, 0.3, 0.97]

    const progress = useTransform(scrollY, range, [0, 1], {
        clamp: false,
    })
    const progressW = useTransform(progress, [0, 1], ['0%', '100%'], {})

    const transform = useTransform(
        progress,
        [0, 1],
        ['translateY(200px)', 'translateY(0%)'],
        {
            ease: [bezier.apply(null, ease)],
        }
    )
    const stylesFirst = {
        transform,
        opacity: progress,
    }

    return (
        <motion.div style={stylesFirst} ref={ref}>
            {children}
        </motion.div>
    )
}
