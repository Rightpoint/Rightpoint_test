import React from 'react'
import { store } from '@rightpoint/core/redux'
import { DecoratorFn, Story } from '@storybook/react'
import { Provider } from 'react-redux'

export interface CustomDecoratorArgs {
    background: string
}

export const DecoratorWithArgs: DecoratorFn = (Story, options) => {
    const decoratorArgs = (options.args.decoratorArgs ||
        {}) as CustomDecoratorArgs

    return (
        <Provider store={store}>
            <div
                style={{
                    background: decoratorArgs.background,
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    zIndex: -1,
                    pointerEvents: 'none',
                }}
            ></div>

            <Story {...options} />
        </Provider>
    )
}
