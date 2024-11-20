import { HeaderProps } from './Header.component'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'

export const headerGenerators = makeTypedGeneratorFn<HeaderProps>()({
    default: () => ({}),
})
