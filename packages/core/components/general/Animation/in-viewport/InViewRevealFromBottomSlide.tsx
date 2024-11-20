import { motion } from 'framer-motion'

export const InViewRevealFromBottomSlide = ({ children, transition }) => {
    return (
        <motion.div
            style={{
                position: 'relative',
                overflow: 'hidden',
            }}
            transition={
                transition || {
                    duration: 0.5,
                    ease: [0.0, 0.0, 0.0, 0.87],
                }
            }
            initial={{
                clipPath: `polygon(0% 99%,100% 99%,100% 100%,0% 100%)`,
            }}
            whileInView={{
                clipPath: `polygon(0% 0%,100% 0%,100% 100%,0% 100%)`,
            }}
        >
            <motion.div
                transition={
                    transition || {
                        duration: 0.5,
                        ease: [0.0, 0.0, 0.0, 0.87],
                    }
                }
                initial={{
                    translateY: '-10%',
                }}
                whileInView={{
                    translateY: '0%',
                }}
            >
                {children}
            </motion.div>
        </motion.div>
    )
}
