import { PersonProps } from './Person.component'

export interface CreditProps {
    beforeNamesText?: string
    name?: string
    jobTitle?: string
    linkProps?: any
}

/**
 * Returns names separated by "and" or commas if more than 2 authors.
 *
 * There are Storybook stories to test its behavior.
 */
export const personsPropsToCreditString = ({ personsProps }) => {
    const hasAuthors = personsProps && personsProps.length > 0
    const isMultiAuthor = hasAuthors && personsProps.length > 1
    const creditProps: CreditProps = hasAuthors
        ? {
              beforeNamesText: isMultiAuthor ? 'Co-authored by' : 'By',
              name: commaSeparateNames(personsProps),
              // show job title if not multi-author
              jobTitle: !isMultiAuthor ? personsProps[0].jobTitle : null,
          }
        : null

    if (!creditProps) {
        return undefined
    }

    return `${creditProps.beforeNamesText} ${creditProps.name} ${
        creditProps.jobTitle ? ` — ${creditProps.jobTitle}` : ``
    }`
}

function commaSeparateNames(authorsProps: PersonProps[]): string {
    if (!authorsProps) {
        return ''
    }
    const useCommas = authorsProps.length > 2
    return authorsProps
        .map((p, i) => {
            // if it's two authors, use "and"
            // if it's 3 or more, use a comma and trailing "and"
            const isLast = i === authorsProps.length - 1
            if (useCommas) {
                if (isLast) {
                    return `and ${p.name}`
                }
                return `${p.name}, `
            }
            // if it's less than 2 authors, separate with and.
            return `${p.name}${isLast ? '' : ' and '}`
        })
        .join('')
}
