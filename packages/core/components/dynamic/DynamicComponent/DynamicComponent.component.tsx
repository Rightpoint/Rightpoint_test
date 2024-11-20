import type { FC } from 'react'
import { ErrorBoundary } from '@rightpoint/core/utils'
import { DynamicComponentType, dynamicComponents } from './DynamicComponentType'

export interface DynamicComponentProps {
    type: DynamicComponentType
}
/**
 * Content authors need the ability to place components that do not fit into the existing system
 * because they require custom code/logic, are one offs, etc.
 *
 * This pattern can be used to implement new features, and features can be upgraded to first class components if usage is high.
 *
 * Requirements:
 * - Arbitrary props transform. Contentful fields TBD, and must support all components, so maybe even a JSON field.
 * - This might be a component that is _never_ edited by content authors, and either set up by developers or synced from migrations.
 *
 * Use cases:
 * - Content author needs to place the Careers component in an arbitrary Page
 * - Site requires one-off components such as playful "Inside Rightpoint" components
 * - Future requirement requires custom code, and a fully custom/manual page is undesirable
 *
 */
export const DynamicComponent: FC<DynamicComponentProps> = ({
    type,
    ...props
}) => {
    const Component = dynamicComponents[type]?.Component
    return (
        // expect failure: these props are not reliable due to manual JSON field
        <ErrorBoundary>{Component && <Component {...props} />}</ErrorBoundary>
    )
}
