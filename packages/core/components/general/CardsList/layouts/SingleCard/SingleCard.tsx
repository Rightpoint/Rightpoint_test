import { SingleCardStyles as s } from './SingleCard.styles'

/**
 * Note: V1 requirement was to show a different component
 * if there was only one related reference to look less empty.
 */
export const SingleCard = ({ children }) => {
    return <s.SingleCard>{children}</s.SingleCard>
}
