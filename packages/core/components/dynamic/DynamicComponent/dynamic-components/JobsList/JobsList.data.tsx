import styled, { css } from 'styled-components'
import { JobsListProps } from './JobsList.component'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'

export const jobsListGenerators = makeTypedGeneratorFn<JobsListProps>()({
    default: () => {
        return {}
    },
})
