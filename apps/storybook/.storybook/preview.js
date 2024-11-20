import React from 'react'
import { configureAtomicLayout, GlobalStyle } from '@rightpoint/core/styles'
import { DecoratorWithArgs } from './decorator-with-args'

import '@rightpoint/web/public/fonts/riforma/stylesheet.css'
import '@rightpoint/web/public/fonts/reckless/stylesheet.css'
import '@rightpoint/web/public/fonts/founders-grotesk/stylesheet.css'

import { DecoratorThemeProvider } from './decorator-theme-context'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { DecoratorRootComponent } from './decorator-root-component'
import { DecoratorCursor } from './decorator-cursor'

configureAtomicLayout()

/**
 * Global storybook decorators
 */
export const decorators = [
    (Story) => (
        <div>
            <GlobalStyle />
            <Story />
        </div>
    ),
    DecoratorThemeProvider,
    DecoratorWithArgs,
    DecoratorRootComponent,
    // DecoratorCursor, // this breaks
]

export const parameters = {
    options: {
        storySort: {
            method: '',
            order: ['Documentation', 'Components'],
            locales: '',
        },
    },
    nextRouter: {
        Provider: RouterContext.Provider,
    },
    a11y: {
        config: {
            // this doesn't seem to work
            // runOnly: {
            //     type: 'tag',
            //     values: ['wcag21a'],
            // },
            rules: [
                {
                    // This tells Axe to run the 'autocomplete-valid' rule on selectors
                    // that match '*:not([autocomplete="nope"])' (all elements except [autocomplete="nope"]).
                    // This is the safest way of ignoring a violation across all stories,
                    // as Axe will only ignore very specific elements and keep reporting
                    // violations on other elements of this rule.
                    id: 'autocomplete-valid',
                    selector: '*:not([autocomplete="nope"])',
                },
                {
                    // To disable a rule across all stories, set `enabled` to `false`.
                    // Use with caution: all violations of this rule will be ignored!
                    id: 'autocomplete-valid',
                    enabled: false,
                },
            ],
        },
    },
}
