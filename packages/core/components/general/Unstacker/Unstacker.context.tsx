import { motionValue } from 'framer-motion'
import { createContext } from 'react'

const defaultEasing = [0.5, 0.5, 0.5, 0.5]
export const unstackerContextDefault = {
    debug: false,
    heroTitle: '',
    easings: {
        vertical: [...defaultEasing],
        text1: [...defaultEasing],
        text2: [...defaultEasing],
        text3: [...defaultEasing],
        textOpacity: [...defaultEasing],
    },
}
export const UnstackerContext = createContext(unstackerContextDefault)

export const UnstackerItemContext = createContext({
    itemProgress: motionValue(0),
    itemProgressWithDeadzone: motionValue(0),
    itemCount: 0,
    index: 0,
})
