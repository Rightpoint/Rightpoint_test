import styled, { css } from 'styled-components'
import { JobsListProps } from './JobsList.component'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'
import mockApiJsonResponse from './JobsList.mock-api-response.json'

export const jobsListGenerators = makeTypedGeneratorFn<JobsListProps>()({
    default: () => {
        return {
            mockData: mockApiJsonResponse,
        }
    },
})
