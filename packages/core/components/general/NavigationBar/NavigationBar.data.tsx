import styled, { css } from 'styled-components'
import { NavigationBarProps } from './NavigationBar.component'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'

export const navigationBarGenerators =
    makeTypedGeneratorFn<NavigationBarProps>()({
        default: () => ({
            items: [
                {
                    text: 'Solutions',
                },
                {
                    text: 'Industries',
                },
                {
                    text: 'Capabilities',
                },
                {
                    text: 'Technology',
                },
            ],
        }),
    })
