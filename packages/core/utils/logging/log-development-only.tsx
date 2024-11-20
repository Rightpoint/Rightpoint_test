export const logDevelopmentOnly = (...args) => {
    if (process.env.NODE_ENV === 'development') {
        console.log('[dev-mode-only]', ...args)
    }
}
