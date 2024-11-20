import styled, { css } from 'styled-components'
import { LinksListProps } from './LinksList.component'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'
import { linkGenerators } from '../Link/Link.data'

export const linksListGenerators = makeTypedGeneratorFn<LinksListProps>()({
    default: () => ({
        title: 'Links List',
        linksProps: [
            linkGenerators.default(),
            linkGenerators.default(),
            linkGenerators.default(),
            linkGenerators.default(),
        ],
    }),
})
