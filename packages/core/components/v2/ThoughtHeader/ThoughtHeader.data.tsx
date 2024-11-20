import styled, { css } from 'styled-components'
import { ThoughtHeaderProps } from './ThoughtHeader.component'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'
import { cardGenerators } from '../../general/Card/Card.data'

export const thoughtHeaderGenerators =
    makeTypedGeneratorFn<ThoughtHeaderProps>()({
        default: () => ({
            date: 'Thursday, November 10, 2022',
            title: 'The Future of Sitecore: Content Is at the Core of the DXP',
            body: 'Many agencies come up with great ideas for strong solutions—but are then fine having them built elsewhere, where things often fall flat. Nope, not us. We think even the wildest, most creative ideas are only as valuable as how flawlessly they’re executed.',
            cardProps: cardGenerators.portrait(),
        }),
    })
