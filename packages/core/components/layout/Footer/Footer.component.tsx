import React, { FC, ReactNode } from 'react'
import { Box, Composition } from 'atomic-layout'
import { useScrollAnimation } from '../../general/Animation/Animation.component'
import {
    ContainerWidths,
    getContainerStyledComponent,
} from '../RootComponent/container'
import { SocialLinks } from '../SocialLinks/SocialLinks.component'
import {
    BackgroundColors,
    getBackgroundColorStyles,
    getContentColorStyles,
} from '../RootComponent/background-color'
import { FooterStyles as s } from './Footer.styles'
import { Link } from '../../links/Link/Link.component'

type ItemProps = {
    title?: string
    text?: string
    email?: string
    href?: string
    ctaText?: string
    children?: ReactNode
}

type FooterLinks = {
    text: string
    href: string
}

const Item: FC<ItemProps> = ({
    title,
    text,
    ctaText,
    href,
    children,
    email,
}) => {
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
            {(email || href) && (
                <s.Text>
                    <Animation>
                        {email ? (
                            <Link href={`mailto:${email}`}>Contact Us</Link>
                        ) : (
                            <Link href={href}>{ctaText}</Link>
                        )}
                    </Animation>
                </s.Text>
            )}
        </s.Item>
    )
}

const Policies = ({ policies }) => {
    return (
        <s.Policies>
            {policies.map((policy, i) => (
                <s.Policy key={i}>{policy.text}</s.Policy>
            ))}
        </s.Policies>
    )
}

export interface FooterProps {
    mainLinks?: FooterLinks[]
    offices?: ItemProps[]
    contactContent?: any
    policies?: FooterLinks[]
}

/**
 * @deprecated returns hard coded props without
 * going through data generator;
 *
 * In future replace with Contentful preview-able key/value store
 */
const getFooterProps = () => {
    return {
        mainLinks: [
            {
                text: 'Industries',
                href: '/industries',
            },
            {
                text: 'Solutions',
                href: '/solutions',
            },
            {
                text: 'Work',
                href: '/work',
            },
            {
                text: 'Thinking',
                href: '/thinking',
            },
            {
                text: 'Careers',
                href: '/careers',
            },
        ],
        contactContent: [
            <p>
                For CX initiatives{' '}
                <a href="mailto:business@rightpoint.com">
                    business@rightpoint.com
                </a>
            </p>,
            <p>
                For press inquiries{' '}
                <a href="mailto:marketing@rightpoint.com">
                    marketing@rightpoint.com
                </a>
            </p>,
        ],
        policies: [
            {
                text: 'Terms',
                href: '/terms',
            },
            {
                text: 'Cookies',
                href: '/cookies',
            },
            {
                text: 'Privacy Policy',
                href: '/privacy-policy',
            },
            {
                text: 'CCPA Privacy Notice',
                href: '/ccpa-privacy-notice',
            },
        ],
        offices: [
            {
                title: 'Atlanta',
                href: '#',
            },
            {
                title: 'Dallas',
                href: '#',
            },

            {
                title: 'Jaipur',
                href: '#',
            },

            {
                title: 'New York',
                href: '#',
            },

            {
                title: 'Boston',
                href: '#',
            },

            {
                title: 'Denver',
                href: '#',
            },

            {
                title: 'London',
                href: '#',
            },

            {
                title: 'Oakland',
                href: '#',
            },

            {
                title: 'Chicago HQ',
                href: '#',
            },
            {
                title: 'Detroit',
                href: '#',
            },
            {
                title: 'Los Angeles',
                href: '#',
            },
            {
                title: 'Sydney',
                href: '#',
            },
        ],
    }
}

export const Footer: FC<FooterProps> = () => {
    const {
        offices = [],
        contactContent,
        policies = [],
        mainLinks = [],
        ...props
    } = getFooterProps()

    const areasMobile = `
        main
        offices
        policies
        copyright
    `
    const areasDesktop = `
        main       offices
        space      space
        copyright  policies
    `
    const { Animation } = useScrollAnimation({
        lessMovement: true,
    })

    return (
        <s.Footer
            as="footer"
            aria-label="Footer"
            style={{
                ...getBackgroundColorStyles({
                    backgroundColor: BackgroundColors.Black,
                }),
                ...getContentColorStyles({
                    backgroundColor: BackgroundColors.Black,
                }),
            }}
        >
            <Box
                paddingTop={100}
                paddingBottom={30}
                as={getContainerStyledComponent(ContainerWidths.Default)}
            >
                <Composition
                    areas={areasMobile}
                    areasMd={areasDesktop}
                    columnGapMd={60}
                >
                    {(areas) => (
                        <>
                            <areas.Main paddingRight={40}>
                                <s.MainLinks>
                                    {mainLinks.map((link, i) => (
                                        <s.MainLink key={i} href={link.href}>
                                            {link.text}
                                        </s.MainLink>
                                    ))}
                                </s.MainLinks>

                                <Item title="Contact">
                                    {React.Children.map(
                                        contactContent,
                                        (child, index) => (
                                            <Animation key={index}>
                                                {child}
                                            </Animation>
                                        )
                                    )}

                                    <Animation>
                                        <s.SocialLinks>
                                            <SocialLinks />
                                        </s.SocialLinks>
                                    </Animation>
                                </Item>
                            </areas.Main>
                            <areas.Offices paddingRight={20}>
                                <Composition
                                    templateCols="repeat(2, 1fr)"
                                    gap={20}
                                    gapRow={60}
                                    gapRowXs={40}
                                    marginVertical={100}
                                    marginVerticalMd={0}
                                    maxWidth={400}
                                >
                                    {offices.map((office, i) => (
                                        <Item
                                            ctaText="Explore Office"
                                            {...office}
                                            key={i}
                                        />
                                    ))}
                                </Composition>
                            </areas.Offices>

                            <areas.Policies
                                align="flex-end"
                                marginBottom={0}
                                marginBottomXs={100}
                                marginBottomMd={0}
                                marginBottomLg={0}
                            >
                                <Item>
                                    <Policies policies={policies} />
                                </Item>
                            </areas.Policies>

                            <areas.Space marginTop={100} />
                            <areas.Copyright align="flex-end">
                                <s.Copyright>
                                    © Copyright Rightpoint 2013-
                                    {new Date().getFullYear()}
                                </s.Copyright>
                            </areas.Copyright>
                        </>
                    )}
                </Composition>
            </Box>
        </s.Footer>
    )
}
