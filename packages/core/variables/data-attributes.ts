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
    marginStrategy: makeAttribute('data-margin-strategy'), // for adjacent sibling selector to change margins
    background: makeAttribute('data-background'), // shows bg color
    content: makeAttribute('data-content'),
    root: makeAttribute('data-root'),
    scrollParent: makeAttribute('data-scroll-parent'), // scroll to parent override (usually closest root)
    cursorText: makeAttribute('data-cursor-text'), // hover text
}
