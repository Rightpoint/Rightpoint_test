import { media } from '@rightpoint/core/styles'
import { Box, Composition } from 'atomic-layout'
import React, { FC, ReactNode } from 'react'
import { css } from 'styled-components'
import { useScrollAnimation } from '../../general/Animation/Animation.component'
import { Link } from '../../general/Link/Link.component'
import { getContainerBoxProps } from '../RootComponent/container'
import { SocialLinks } from '../SocialLinks/SocialLinks.component'
import {
    BackgroundColors,
    getBackgroundColorStyles,
    getContentColorStyles,
} from '../RootComponent/background-color'
import { FooterStyles as s } from './Footer.styles'

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

export const Footer: FC<FooterProps> = ({
    offices = [],
    contactContent,
    policies = [],
    mainLinks = [],
    ...props
}) => {
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
                padding={20}
                paddingTop={60}
                paddingBottom={35}
                {...getContainerBoxProps('Default')}
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
