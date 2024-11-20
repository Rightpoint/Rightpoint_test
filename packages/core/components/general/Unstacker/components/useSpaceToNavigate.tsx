import { useIsomorphicLayoutEffect } from '@rightpoint/core/utils'

const useSpaceToNavigate = ({ enabled = false, isCurrent = false }) => {
    useIsomorphicLayoutEffect(() => {
        const handler = (ev: KeyboardEvent) => {
            const pressed = ev.code === 'Space'
            if (pressed) {
                ev.preventDefault()
                ev.stopPropagation()
                console.log('Yeah')
            }
        }
        if (enabled && isCurrent) {
            console.log('Initialized space to nav')
            document.addEventListener('keyup', handler)
        }
        return () => {
            document.removeEventListener('keyup', handler)
        }
    }, [enabled, isCurrent])
}
