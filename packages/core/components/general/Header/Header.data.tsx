import styled, { css } from 'styled-components'
import { BackgroundColors } from '../BackgroundColor/BackgroundColor.styles'
import { headerTextGenerators } from '../HeaderText/HeaderText.data'
import { multiMediaGenerators } from '../MultiMedia/MultiMedia.data'
import { HeaderProps } from './Header.component'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'

const renderContentBelow = () => (
    <div>
        We believe in experience-led transformation. From vision to delivery, we
        use empathy, data, and creativity to connect experience to operations
        — enabling organizations to transform, evolve, and stay relevant in an
        increasingly complex world.
    </div>
)

const makeDefault = () => ({
    headerTextProps: {
        ...headerTextGenerators.default(),
    },
    multiMediaProps: {
        ...multiMediaGenerators.noAspectImage(),
    },
})

export const headerGenerators = makeTypedGeneratorFn<HeaderProps>()({
    default: makeDefault,
    solidBackground: () => ({
        ...makeDefault(),
        backgroundPosition: 'solid' as const,
        backgroundColor: BackgroundColors.Coral,
        renderContentBelow,
    }),
    halfBackground: () => ({
        ...makeDefault(),
        backgroundPosition: 'top' as const,
        backgroundColor: BackgroundColors.Black,
        renderContentBelow,
    }),
    halfBackgroundBottom: () => ({
        ...makeDefault(),
        backgroundPosition: 'bottom' as const,
        backgroundColor: BackgroundColors.Black,
        renderContentBelow,
    }),
    postWithAuthor: () => ({
        ...makeDefault(),
        headerTextProps: headerTextGenerators.postWithAuthor(),
        halfBackground: true,
    }),
})
