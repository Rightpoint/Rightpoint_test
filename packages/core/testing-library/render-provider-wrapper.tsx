/**
 * This is the @testing-library recommended method to
 * wrap component tests with Providers.
 *
 * Simple import the same @testing-library/react API using this file instead.
 */
import { render, RenderOptions } from '@testing-library/react'
import { store } from '@rightpoint/core/redux'
import { theme } from '@rightpoint/core/styles'
import {
    GlobalContext,
    GlobalContextDefaultValue,
} from '@rightpoint/core/context'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { ReactElement } from 'react'

const AllTheProviders = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <GlobalContext.Provider value={GlobalContextDefaultValue}>
                <Provider store={store}>{children}</Provider>
            </GlobalContext.Provider>
        </ThemeProvider>
    )
}

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }

/**
 * Prevent window accessors from failing tests
 */
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
})
