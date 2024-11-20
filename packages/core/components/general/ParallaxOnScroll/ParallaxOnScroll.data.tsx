import styled, { css } from 'styled-components'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'
import { ParallaxOnScrollProps } from './ParallaxOnScroll.component'

export const parallaxOnScrollGenerators =
    makeTypedGeneratorFn<ParallaxOnScrollProps>()({
        default: () => ({
            Wrapper: ({ children }) => <>{children}</>,
        }),
    })
