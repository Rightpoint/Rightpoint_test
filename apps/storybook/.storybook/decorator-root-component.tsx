import React from 'react'

import { RootComponent } from '@rightpoint/core/components'

export const DecoratorRootComponent = (Story, options) => {
    /**
     * @deprecated -- remove over time
     */
    const rootDecoratorArgs = options.args.rootDecoratorArgs || {}

    /**
     * rootProps is a valid prop for any component entryToProps now,
     * so moving forward we should use this one in our stories.
     */
    const rootProps = options.args.rootProps || {}

    return (
        <RootComponent
            styles={{ marginTop: 0, marginBottom: 0 }}
            {...rootDecoratorArgs}
            {...rootProps}
        >
            <Story />
        </RootComponent>
    )
}
