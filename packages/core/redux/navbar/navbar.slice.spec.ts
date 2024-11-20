import { navbarReducer } from './navbar.slice'

describe('navbar reducer', () => {
    test('should return the initial state', () => {
        expect(navbarReducer(undefined, { type: '' }).isOpen).toBe(false)
    })
    test('should open, close, and toggle', () => {
        // open
        const navbarOpenState = navbarReducer(undefined, {
            type: 'navbar/open',
        })
        expect(navbarOpenState.isOpen).toBe(true)

        // toggle should close if previously open
        expect(
            navbarReducer(navbarOpenState, { type: 'navbar/toggle' }).isOpen
        ).toBe(false)

        // close
        expect(
            navbarReducer(navbarOpenState, { type: 'navbar/close' }).isOpen
        ).toBe(false)
    })
})
