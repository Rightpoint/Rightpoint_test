import { FC } from 'react'
import {
    CardProps,
    CreditProps,
    MultiMediaProps,
    PersonProps,
    ThoughtHeader,
} from '@rightpoint/core/components'
import { Header, HeaderVariants } from '@rightpoint/core/components'

export interface ThoughtDetailHeaderProps {
    title: string
    authorsProps?: PersonProps[]
    multiMediaProps?: MultiMediaProps
    cardProps?: CardProps
}
export const ThoughtDetailHeader: FC<ThoughtDetailHeaderProps> = ({
    title,
    authorsProps,
    cardProps,
}) => {
    const hasAuthors = authorsProps && authorsProps.length > 0
    const isMultiAuthor = hasAuthors && authorsProps.length > 1

    const creditProps: CreditProps = hasAuthors
        ? {
              beforeNamesText: isMultiAuthor ? 'Co-authored by' : 'By',
              name: getFormattedNames(authorsProps),
              // show job title if not multi-author
              title: !isMultiAuthor ? authorsProps[0].jobTitle : null,
          }
        : null
    return (
        <ThoughtHeader title={title} cardProps={cardProps} />
        // <Header
        //     headerTextProps={{
        //         title,
        //         variant: HeaderVariants.Thought,
        //         creditProps,
        //     }}
        // />
    )
}

/**
 * Returns names separated by "and" or commas if more than 2 authors.
 */
function getFormattedNames(authorsProps: PersonProps[]): string {
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
