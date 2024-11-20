import styled, { css } from 'styled-components'
import { ModalProps } from './Modal.component'
import { makeTypedGeneratorFn } from '@rightpoint/core/utils'

export const modalGenerators = makeTypedGeneratorFn<ModalProps>()({
    default: () => ({
        title: 'My Modal Title',
    }),
})
