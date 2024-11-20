import { ComponentStory, ComponentMeta } from '@storybook/react'
import {
    cssVarNames,
    cssVarsTypography,
    typography,
} from '@rightpoint/core/styles'
import { RootComponent } from './RootComponent.component'
import { rootComponentGenerators } from './RootComponent.data'
import styled, { css } from 'styled-components'
import { RichText } from '../../general/RichText/RichText.component'
import { BackgroundColors } from './background-color'
import { Header, HeaderVariants } from '../../v2/Header/Header.component'
import { Button } from '../../general/Button/Button.component'
import { Link } from '../../links/Link/Link.component'
import { isString } from 'lodash'
export default {
    component: RootComponent,
    title: 'V2/Layout/RootComponent',
    parameters: {
        docs: {
            description: {
                // component: ''
            },
        },
        // chromatic: { disableSnapshot: true },
    },
} as ComponentMeta<typeof RootComponent>

const BackgroundAwareText = styled(typography.FoundersB100)`
    ${cssVarsTypography.textColor}
`

const BackgroundAwareTextAlt = styled(typography.FoundersB100)`
    ${cssVarsTypography.textAltColor}
`

const Template: ComponentStory<typeof RootComponent> = (args) => (
    <RootComponent {...args}>
        <BackgroundAwareText>Content</BackgroundAwareText>
        <BackgroundAwareTextAlt>Alt text</BackgroundAwareTextAlt>
        {(args as any).storyContent}
    </RootComponent>
)

const Spacer = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
`

export const AllBackgrounds = () => {
    const backgrounds = Object.values(BackgroundColors).filter(isString)
    return (
        <>
            <RichText>
                <h2>Background colors</h2>
                <p>
                    Not all colors are used; some are from initial design and
                    must be removed over time.
                </p>
            </RichText>

            {backgrounds.map((color) => (
                <RootComponent
                    {...rootComponentGenerators.background({
                        backgroundColor: color,
                    })}
                >
                    <Header
                        variant="Header2"
                        title={color}
                        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua."
                    />
                    <BackgroundAwareTextAlt>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                    </BackgroundAwareTextAlt>
                    <Spacer>
                        <Button>Button</Button>
                    </Spacer>
                    <Spacer>
                        <Link href="#">Link</Link>
                    </Spacer>
                </RootComponent>
            ))}
        </>
    )
}

/**
 * This one should test a Root component with a background media.
 */
export const BackgroundMedia = () => {
    return (
        <RootComponent {...rootComponentGenerators.backgroundMedia()}>
            <Header
                variant="Header1"
                title="Background media"
                body={
                    <>
                        The background media component can blur, and has various
                        background treatment modes to help make text-on-image
                        more legible.
                    </>
                }
            />
        </RootComponent>
    )
}

/**
 * Margin test
 */
export const SpacingMargins = () => {
    return (
        <>
            <RootComponent {...rootComponentGenerators.background()}>
                <Header
                    variant="HeaderText"
                    body={<>Root Component spacing</>}
                />
            </RootComponent>
            <RootComponent
                {...rootComponentGenerators.background({
                    backgroundColor: null,
                })}
            >
                <Header
                    variant="HeaderText"
                    body={
                        <>
                            Margin should not collapse against another
                            no-background element.
                        </>
                    }
                />
            </RootComponent>
            <RootComponent
                {...rootComponentGenerators.background({
                    backgroundColor: null,
                })}
            >
                <Header
                    variant="HeaderText"
                    body={<>Should stack margins.</>}
                />
            </RootComponent>

            <RootComponent {...rootComponentGenerators.backgroundMedia()}>
                <Header
                    variant="HeaderText"
                    body={<>Should not have margins</>}
                />
            </RootComponent>
        </>
    )
}
