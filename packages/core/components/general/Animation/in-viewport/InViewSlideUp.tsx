import { motion } from 'framer-motion'

export const InViewSlideUp = ({ children, transition }) => {
    return (
        <motion.div
            transition={
                transition || {
                    duration: 0.5,
                    ease: [0, 0.5, 0.5, 1],
                }
            }
            initial={{
                opacity: 1,
                translateY: 20,
            }}
            whileInView={{
                opacity: 1,
                translateY: 0,
            }}
            exit={{
                opacity: 1,
                translateY: -20,
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
