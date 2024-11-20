import { useState, useEffect, Key } from 'react'

interface UseKeyPress {
    key: Key
    callback(event: KeyboardEvent): void
}

export const useKeyPress = ({ key, callback }: UseKeyPress): boolean => {
    const [keyPressed, setKeyPressed] = useState(false)

    useEffect(() => {
        const downHandler = (event: KeyboardEvent) => {
            const { key: pressedKey } = event
            if (pressedKey === key) {
                setKeyPressed(true)
                callback && callback(event)
            }
        }

        const upHandler = ({ key: key_ }) => {
            if (key_ === key) {
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
