import { ReactElement, ReactNode } from 'react'
interface ConditionalWrapperProps {
    children?: ReactNode
    condition: boolean
    wrapper(children): ReactElement
    wrapperElse?(children): ReactElement
}

/**
 * Conditionally wrap children based on a condition.
 *
 * @param condition - Condition to wrap children.
 * @param wrapper - Function to wrap children, receives one argument: children
 * @param children - React children
 * @returns React element
 *
 * @example `<ConditionalWrapper condition={true} wrapper={(children) => <div>{children}</div>}></ConditionalWrapper>`
 */
export const ConditionalWrapper: React.FC<ConditionalWrapperProps> = ({
    condition,
    wrapper,
    wrapperElse,
    children,
}) => {
    if (condition) {
        return wrapper(children)
    } else if (wrapperElse) {
        return wrapperElse(children)
    }
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18051
    return children as React.ReactElement
}
