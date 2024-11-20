import { HeaderProps } from './HeaderOld.component'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'

export const headerOldGenerators = makeTypedGeneratorFn<HeaderProps>()({
    default: () => ({}),
})
