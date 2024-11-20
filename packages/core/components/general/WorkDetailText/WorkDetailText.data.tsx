import styled, { css } from 'styled-components'
import { WorkDetailTextProps } from './WorkDetailText.component'

import { makeTypedGeneratorFn } from '@rightpoint/core/utils'
import { contentfulRichTextDummyGenerators } from '../RichText/contentful-rich-text-dummy-generator'
import { contentfulRichTextToReact } from '../RichText/contentful-rich-text-to-react'

export const workDetailTextGenerators =
    makeTypedGeneratorFn<WorkDetailTextProps>()({
        default: () => ({
            title: 'Starting with a Strategy',
            subtitle:
                'Reimagining An Iconic Real-world Event As An Innovative Customer Experience',
            body: (
                <>
                    <p>
                        Cadillac & Rightpoint have reimagined the user
                        experience of the brand starting with the 2022 Cadillac
                        LYRIQ. By asking why can’t things just work better, we
                        crafted an experience that feels intuitive, fresh &
                        above all else like the future of Cadillac.
                    </p>
                    <p>
                        And this is just the beginning. As we get closer to the
                        LYRIQ’s full debut we’ll be sharing more about the work,
                        process and how Rightpoint is designing the future of
                        the brand.
                    </p>
                </>
            ),
        }),
    })
