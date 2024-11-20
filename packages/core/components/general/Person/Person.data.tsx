import styled, { css } from 'styled-components'
import { PersonProps } from './Person.component'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'
import { multiMediaGenerators } from '../MultiMedia/MultiMedia.data'
import { fakerWithSeed } from '@rightpoint/data-generators'

export const personGenerators = makeTypedGeneratorFn<PersonProps>()({
    default: () => ({
        name: [
            fakerWithSeed.name.findName(),
            fakerWithSeed.name.lastName(),
        ].join(' '),
        jobTitle: fakerWithSeed.name.jobTitle(),
        multiMediaProps: multiMediaGenerators.default(),
    }),
})
