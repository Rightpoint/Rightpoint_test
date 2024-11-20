import styled, { css } from 'styled-components'
import { WorkDetailTextProps } from './WorkDetailText.component'

import { makeTypedGeneratorFn } from '@rightpoint/core/utils'

export const workDetailTextGenerators =
    makeTypedGeneratorFn<WorkDetailTextProps>()({
        default: () => ({
            title: 'Starting with a Strategy',
            subtitle:
                'Reimagining An Iconic Real-world Event As An Innovative Customer Experience',
            body: 'TBD: need to import, but need to resolve way to get rich text from contentful.',
        }),
    })
