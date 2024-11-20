import { useState, useEffect, Key } from 'react'

interface UseKeyPress {
    key: Key
    callback(event: KeyboardEvent): void
}

/**
 * Fire a callback on key press
 */
export const useKeyPress = ({ key, callback }: UseKeyPress): boolean => {
    const [keyPressed, setKeyPressed] = useState(false)

    useEffect(() => {
        const downHandler = (event: KeyboardEvent) => {
            const { key: keyPressed } = event
            if (keyPressed === key) {
                setKeyPressed(true)
                callback && callback(event)
            }
        }

        const upHandler = (event: KeyboardEvent) => {
            const { key: keyPressed } = event
            if (keyPressed === key) {
                setKeyPressed(false)
            }
        }

        window.addEventListener('keydown', downHandler)
        window.addEventListener('keyup', upHandler)

        return () => {
            window.removeEventListener('keydown', downHandler)
            window.removeEventListener('keyup', upHandler)
        }
    }, [callback, key])

    return keyPressed
}
