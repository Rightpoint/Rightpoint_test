export const transformToLocale = <T>(
    fields: T,
    locale = 'en-US'
): {
    [K in keyof T]: {
        [locale: string]: T[K]
    }
} => {
    return Object.entries(fields).reduce((acc, [key, value]) => {
        acc[key] = {
            [locale]: value,
        }
        return acc
    }, {}) as {
        [K in keyof T]: {
            [locale: string]: T[K]
        }
    }
}
