import { camelCase } from 'lodash'

const makeAttribute = <T extends string>(
    name: T
): {
    attribute: T
    selector: `[${T}]`
    datasetName: string
} => {
    return {
        attribute: name,
        selector: `[${name}]`,
        datasetName: camelCase(name.replace('data-', '')) as any,
    }
}

export const dataAttributes = {
    background: makeAttribute('data-background'),
    content: makeAttribute('data-content'),
    root: makeAttribute('data-root'),
    scrollParent: makeAttribute('data-scroll-parent'),
    cursorText: makeAttribute('data-cursor-text'),
}
