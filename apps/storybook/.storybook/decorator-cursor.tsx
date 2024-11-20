import { Cursor } from '@rightpoint/core/components'
import { theme } from '@rightpoint/core/styles'
import { ThemeProvider } from 'styled-components'

export const DecoratorCursor = (Story) => (
    <>
        <Cursor />
        <Story />
    </>
)
