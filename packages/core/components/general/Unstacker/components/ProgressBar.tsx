import { motion, useTransform } from 'framer-motion'

export const ProgressBar = ({
    progress,
    parentStyles = {},
    color = '#888',
}) => {
    const progressPercent = useTransform(
        progress,
        (value: any) => `${(value * 100).toFixed(4)}%`
    )

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '6px',
                left: 0,
                right: 0,
                height: 4,
                ...parentStyles,
            }}
        >
            <motion.div
                style={{
                    width: progressPercent,
                    height: '100%',
                    background: color,
                }}
            ></motion.div>
        </div>
    )
}
