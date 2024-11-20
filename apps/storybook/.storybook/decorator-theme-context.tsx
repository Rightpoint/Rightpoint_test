import { theme } from '@rightpoint/core/styles'
import { ThemeProvider } from 'styled-components'

export const DecoratorThemeProvider = (Story) => (
    <ThemeProvider theme={theme}>
        <Story />
    </ThemeProvider>
)
