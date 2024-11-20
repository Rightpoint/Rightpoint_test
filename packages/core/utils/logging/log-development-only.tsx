export const logDevelopmentOnly = (...args) => {
    process.env.NODE_ENV === 'development' &&
        console.log('[dev-mode-only]', ...args)
}
