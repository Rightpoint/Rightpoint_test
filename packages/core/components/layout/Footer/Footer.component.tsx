import { FC, useContext } from 'react'
import { icons } from '@rightpoint/core/styles'
import { FooterStyles as s } from './Footer.styles'
import { Box, Composition } from 'atomic-layout'
import { useScrollAnimation } from '../../general/Animation/Animation.component'
import { RootComponent } from '../RootComponent/RootComponent.component'
import { getContainerBoxProps } from '../RootComponent/container'

type ItemProps = {
    title?: string
    text?: string
    email?: string
}
const Item: FC<ItemProps> = ({ title, text, children, email }) => {
    const { Animation } = useScrollAnimation({
        lessMovement: true,
        isText: true,
    })

    return (
        <s.Item>
            {title && (
                <s.ItemTitle>
                    <Animation>{title}</Animation>
                </s.ItemTitle>
            )}
            <s.Text>{children ? children : text}</s.Text>
            {email && (
                <s.Text>
                    <Animation>
                        <a href={`mailto:${email}`}>Contact Us</a>
                    </Animation>
                </s.Text>
            )}
        </s.Item>
    )
}

const Policies = () => {
    return (
        <s.Policies>
            <s.Policy>Terms</s.Policy>
            <s.Policy>Cookies</s.Policy>
            <s.Policy>Privacy Policy</s.Policy>
            <s.Policy>CCPA Privacy Notice</s.Policy>
        </s.Policies>
    )
}
const cities: ItemProps[] = [
    {
        title: 'Atlanta',
        email: 'contact@rightpoint.com',
    },
    {
        title: 'Dallas',
        email: 'contact@rightpoint.com',
    },

    {
        title: 'Jaipur',
        email: 'contact@rightpoint.com',
    },

    {
        title: 'New York',
        email: 'contact@rightpoint.com',
    },

    {
        title: 'Boston',
        email: 'contact@rightpoint.com',
    },

    {
        title: 'Denver',
        email: 'contact@rightpoint.com',
    },

    {
        title: 'London',
        email: 'contact@rightpoint.com',
    },

    {
        title: 'Oakland',
        email: 'contact@rightpoint.com',
    },

    {
        title: 'Chicago HQ',
        email: 'contact@rightpoint.com',
    },
    {
        title: 'Detroit',
        email: 'contact@rightpoint.com',
    },
    {
        title: 'Los Angeles',
        email: 'contact@rightpoint.com',
    },
    {
        title: 'Sydney',
        email: 'contact@rightpoint.com',
    },
]
export interface FooterProps {
    cities?: ItemProps[]
    contactContent?: null
    policies?: null
}
export const Footer: FC<FooterProps> = (
    {
        // tbd
    }
) => {
    const areasMobile = `
        main
        cities
        policies
        copyright
    `
    const areasDesktop = `
        main       cities
        space      space
        copyright  policies
    `
    const { Animation } = useScrollAnimation({
        lessMovement: true,
    })

    return (
        <s.Footer as="footer" aria-label="Footer">
            <Box
                padding={20}
                paddingTop={60}
                paddingBottom={100}
                paddingBottomMd={300}
                {...getContainerBoxProps('Default')}
            >
                <Composition
                    areas={areasMobile}
                    areasMd={areasDesktop}
                    columnGapMd={60}
                >
                    {(areas) => (
                        <>
                            <areas.Copyright>
                                <s.Copyright>
                                    © Copyright Rightpoint 2013-
                                    {new Date().getFullYear()}
                                </s.Copyright>
                            </areas.Copyright>
                            <areas.Main>
                                <s.MainLinks>
                                    <div>Industries</div>
                                    <div>Solutions</div>
                                    <div>Work</div>
                                    <div>Thinking</div>
                                    <div>Careers</div>
                                </s.MainLinks>

                                <Item title="Contact">
                                    <Animation>
                                        <p>
                                            For CX initiatives
                                            business@rightpoint.com
                                        </p>
                                    </Animation>
                                    <Animation>
                                        <p>
                                            For press inquiries
                                            marketing@rightpoint.com
                                        </p>
                                    </Animation>
                                    <Animation>
                                        <p>Social Links</p>
                                    </Animation>
                                </Item>
                            </areas.Main>
                            <areas.Cities paddingRight={20}>
                                <Composition
                                    templateCols="repeat(2, 1fr)"
                                    gap={20}
                                    gapRow={60}
                                    gapRowMd={40}
                                    marginVertical={100}
                                    marginVerticalMd={0}
                                    maxWidth={400}
                                >
                                    {cities.map((city, i) => (
                                        <Item {...city} key={i} />
                                    ))}
                                </Composition>
                            </areas.Cities>
                            <areas.Space height={110} />
                            <areas.Policies align="flex-end">
                                <Item>
                                    <Policies />
                                </Item>
                            </areas.Policies>
                        </>
                    )}
                </Composition>
            </Box>
        </s.Footer>
    )
}
