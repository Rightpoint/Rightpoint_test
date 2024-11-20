import { persistLog } from './persist-log'

export const contentfulWarning = (...args) => {
    console.warn('Contentful warning: ', ...args)
}

export const contentfulLoggedWarning = (...args) => {
    console.warn('Contentful warning: ', ...args)
    persistLog('Contentful warning', ...args)
}
