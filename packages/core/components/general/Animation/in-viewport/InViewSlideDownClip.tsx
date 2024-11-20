import { motion } from 'framer-motion'

export const InViewSlideDownClip = ({ children, transition }) => {
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
                translateY: '0%',
            }}
            whileInView={{
                translateY: '0%',
            }}
        >
            {/* 
                this technique is revealing content from bottom to top.
                multi dimensional effects are more pleasing:
                    reveal from bottom to top, while also translating the content.
            
            */}
            <motion.div
                transition={
                    transition || {
                        duration: 0.5,
                        ease: 'easeInOut',
                    }
                }
                initial={{
                    translateY: '-100%',
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
