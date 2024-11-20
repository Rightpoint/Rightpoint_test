import React from 'react'

import { RootComponent } from '@rightpoint/core/components'

export const DecoratorRootComponent = (Story, options) => {
    const rootDecoratorArgs = options.args.rootDecoratorArgs || {}

    return (
        <RootComponent
            styles={{ marginTop: 0, marginBottom: 0 }}
            {...rootDecoratorArgs}
        >
            <Story />
        </RootComponent>
    )
}
