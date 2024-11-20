import styled, { css } from 'styled-components'
import { LongRichTextProps } from './LongRichText.component'

import { makeTypedGeneratorFn } from '@rightpoint/core/utils'

export const longRichTextGenerators = makeTypedGeneratorFn<LongRichTextProps>()(
    {
        default: () => ({
            text: <>Text Node. Not intended to be used w/o Contentful</>,
        }),
    }
)
