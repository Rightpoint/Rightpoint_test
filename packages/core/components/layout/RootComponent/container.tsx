/**
 * Manage container widths across the site for consistency
 */

import { Box } from 'atomic-layout'
import React from 'react'

export enum ContainerWidths {
    Default = 'Default',
    WorkText = 'WorkText',
}
const containerStyles = {
    [ContainerWidths.Default]: {
        paddingHorizontalXs: 20,
        paddingHorizontalSm: 75,
        paddingHorizontalMd: 100,
        maxWidth: 1600,
        marginHorizontal: 'auto',
    },
    [ContainerWidths.WorkText]: {
        // now that we have the root component/container system,
        // we don't need to "undo" widths, we only enable them
        // by wrapping with this component or by setting the context from a child
        // except it might be annoying to deal with when manually setting components.
        paddingHorizontalXs: 20,
        paddingHorizontalSm: 30,
        // paddingHorizontalMd: 40,
        paddingHorizontalLg: 100,
        maxWidth: 1300,
        marginHorizontal: 'auto',
    },
}
export const getContainerBoxProps = (containerName) => {
    if (!containerName) {
        return {}
    }
    return (
        containerStyles[containerName] ||
        containerStyles[ContainerWidths.Default]
    )
}

/**
 * Default container.
 * TODO: returned object doesn't have Box typing
 */
export const ContainerBox = ({ children }) => {
    return <Box {...getContainerBoxProps('Default')}>{children}</Box>
}
