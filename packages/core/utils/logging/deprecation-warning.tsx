export const deprecationWarning = (...args) => {
    process.env.NODE_ENV !== 'production' &&
        console.warn('Deprecation warning: ', ...args)
}
