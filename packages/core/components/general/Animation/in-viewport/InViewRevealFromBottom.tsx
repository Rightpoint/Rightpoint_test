import { motion } from 'framer-motion'

export const InViewRevealFromBottom = ({ children, transition }) => {
    return (
        <motion.div
            style={{
                position: 'relative',
                overflow: 'hidden',
            }}
            transition={
                transition || {
                    duration: 0.5,
                    ease: 'easeInOut',
                }
            }
            initial={{
                clipPath: `polygon(0% 99%,100% 99%,100% 100%,0% 100%)`,
            }}
            whileInView={{
                clipPath: `polygon(0% 0%,100% 0%,100% 100%,0% 100%)`,
            }}
        >
            {children}
        </motion.div>
    )
}
