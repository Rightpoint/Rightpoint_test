import { makeTypedGeneratorFn } from '@rightpoint/core/utils'
import { HeaderTypewriterProps } from './HeaderTypewriter.component'

export const headerTypewriterGenerators =
    makeTypedGeneratorFn<HeaderTypewriterProps>()({
        default: () => ({
            texts: ['Work that captivates', 'Work that inspires'],
            font: 'sans',
        }),

        // usingRetainer: () => ({
        //     texts: ['Work that captivates', 'Work that inspires'],
        //     font: 'sans',
        //     retainer: true,
        // }),

        // usingRetainerAndLeftAlign: () => ({
        //     texts: ['Work that captivates', 'Work that inspires'],
        //     font: 'sans',
        //     retainer: true,
        //     style: { textAlign: 'left' },
        // }),

        // longText: () => ({
        //     texts: [
        //         'We help our clients unlock potential through the convergence of employee and customer experience.',
        //         'We help our clients unlock potential through Cras bibendum nisl vitae felis vulputate ullamcorper. Vivamus iaculis interdum ipsum sit amet tristique. Aliquam interdum libero nec viverra mollis.',
        //     ],
        //     font: 'sans',
        // }),
    })
