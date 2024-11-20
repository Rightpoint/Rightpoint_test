import styled, { css } from 'styled-components'
import { ScrollingTextProps } from './ScrollingText.component'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'

export const scrollingTextGenerators =
    makeTypedGeneratorFn<ScrollingTextProps>()({
        default: () => ({
            text: 'Total Experience',
        }),
    })
