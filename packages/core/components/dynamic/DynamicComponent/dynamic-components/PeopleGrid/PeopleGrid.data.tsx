import styled, { css } from 'styled-components'
import { PeopleGridProps } from './PeopleGrid.component'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'
import { personGenerators } from '../../../../general/Person/Person.data'
import { times } from 'lodash'

export const peopleGridGenerators = makeTypedGeneratorFn<PeopleGridProps>()({
    default: () => ({
        personsProps: times(10, () => personGenerators.default()),
    }),
})
