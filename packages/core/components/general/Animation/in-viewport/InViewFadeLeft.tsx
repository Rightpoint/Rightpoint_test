import { FC } from 'react'
import { motion } from 'framer-motion'

export const InViewFadeInLeft: FC<any> = ({ children, transition }) => {
    return (
        <motion.div
            transition={
                transition || {
                    duration: 1,
                    ease: [0.07, 0.61, 0.44, 0.87],
                }
            }
            initial={{
                opacity: 0,
                translateX: 20,
            }}
            whileInView={{
                opacity: 1,
                translateX: 0,
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
