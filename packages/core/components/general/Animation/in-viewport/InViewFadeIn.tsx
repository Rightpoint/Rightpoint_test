import { Children, FC } from 'react'
import { motion } from 'framer-motion'
import { get } from 'lodash'

export const InViewFadeIn: FC<any> = ({ children, transition }) => {
    return (
        <motion.div
            transition={
                transition || {
                    delay: 0.05,
                    duration: 0.6,
                    ease: [0.07, 0.61, 0.44, 0.87],
                }
            }
            initial={{
                opacity: 0,
            }}
            whileInView={{
                opacity: 1,
            }}
            viewport={{
                once: true,
            }}
        >
            {children}
        </motion.div>
    )
}

/**
 * Example of attempt to remove nesting and apply motion directly to child tag.
 *
 * Currently, this causes nested <p> output.
 */
const RemoveNestedChildren = ({ children }) => {
    return Children.map(children, (child, index) => {
        const inferredTag = get(child, 'type')
        const isString = typeof inferredTag === 'string'
        const MotionTag = isString ? motion[inferredTag] : null
        const Tag = MotionTag || motion.div
        return (
            <Tag
                key={index}
                transition={{
                    duration: 0.5,
                    ease: [0.07, 0.61, 0.44, 0.87],
                }}
                initial={{
                    opacity: 0,
                }}
                whileInView={{
                    opacity: 1,
                }}
                viewport={
                    {
                        // once: true,
                    }
                }
            >
                {child}
            </Tag>
        )
    })
}
