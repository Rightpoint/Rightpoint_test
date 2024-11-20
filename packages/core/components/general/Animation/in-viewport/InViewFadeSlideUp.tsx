import { FC } from 'react'
import { motion } from 'framer-motion'

export const InViewFadeSlideUp: FC<any> = ({ children, transition }) => {
    return (
        <motion.div
            transition={
                transition || {
                    duration: 0.5,
                    ease: [0.07, 0.61, 0.44, 0.87],
                }
            }
            initial={{
                opacity: 0,
                translateY: 10,
            }}
            whileInView={{
                opacity: 1,
                translateY: 0,
            }}
            viewport={
                {
                    // once: true,
                }
            }
        >
            {children}
        </motion.div>
    )
}
