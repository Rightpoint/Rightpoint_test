import styled, { css } from 'styled-components'
import { multiMediaGenerators } from '../MultiMedia/MultiMedia.data'
import { MidArticleCtaProps } from './MidArticleCta.component'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'
import { linkGenerators } from '../../links/Link/Link.data'

export const midArticleCtaGenerators =
    makeTypedGeneratorFn<MidArticleCtaProps>()({
        default: () => ({
            title: "Like what you're reading? Never miss out our latest post",
            subtitle: 'Never mess our latest post',
            multiMediaProps: multiMediaGenerators.default(),
        }),
        withLink: () => ({
            title: 'With a link button',
            subtitle: 'Populated via a `link` reference',
            linkProps: linkGenerators.default(),
        }),
    })
