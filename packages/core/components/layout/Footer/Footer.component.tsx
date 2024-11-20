import React, { FC, ReactNode, useEffect, useState } from 'react'
import { Box, Composition } from 'atomic-layout'
import { useScrollAnimation } from '../../general/Animation/Animation.component'
import {
    ContainerWidths,
    getContainerStyledComponent,
} from '../RootComponent/container'
import { SocialLinks } from '../SocialLinks/SocialLinks.component'
import {
    BackgroundColors,
    getBackgroundColorAttributesAndStyles,
} from '../RootComponent/background-color'
import { FooterStyles as s } from './Footer.styles'
import { Link, LinkProps } from '../../links/Link/Link.component'
import { getHardCodedFooterProps } from './Footer.hard-coded-data'
import { getNavbarProps } from './Footer.contentful'

type OfficeProps = {
    title?: string
    text?: string
    email?: string
    href?: string
    ctaText?: string
    children?: ReactNode
}

const Office: FC<OfficeProps> = ({
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
        <s.Office>
            {title && (
                <s.OfficeTitle>
                    <Animation>{title}</Animation>
                </s.OfficeTitle>
            )}
            <s.Text>{children ? children : text}</s.Text>
            {/*             
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
            )} */}
        </s.Office>
    )
}

const Policies = ({ policies }) => {
    return (
        <s.Policies>
            {policies.map((linkProps, i) => (
                <s.Policy key={i}>
                    <Link {...linkProps} />
                </s.Policy>
            ))}
        </s.Policies>
    )
}

export interface FooterProps {
    mainLinks?: any
    offices?: OfficeProps[]
    contactContent?: any
    policies?: LinkProps[]
}

export const Footer: FC<FooterProps> = () => {
    const [navbarData, setNavbarData] = useState<FooterProps>({
        offices: [],
        contactContent: [],
        policies: [],
        mainLinks: [],
    })

    // Fetch the navbar data on component mount
    useEffect(() => {
        const fetchNavbarData = async () => {
            const fetchedNavbarProps = await getNavbarProps()
            if (fetchedNavbarProps) {
                setNavbarData(fetchedNavbarProps)
            }
        }

        fetchNavbarData()
    }, [])

    const {
        offices = [],
        contactContent,
        policies = [],
        mainLinks = [],
        ...props
    } = navbarData

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
            {...getBackgroundColorAttributesAndStyles({
                backgroundColor: BackgroundColors.Black,
            })}
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
                                    {mainLinks.map((linkProps, i) => (
                                        <s.MainLink key={i}>
                                            <s.Tier1ItemWithChildren>
                                                <Link
                                                    {...linkProps}
                                                    noDecoration
                                                />
                                                {linkProps.links && (
                                                    <s.Tier2Items>
                                                        {linkProps.links.map(
                                                            (subLink, j) => (
                                                                <s.Tier2Item
                                                                    key={j}
                                                                >
                                                                    <Link
                                                                        {...subLink}
                                                                        noDecoration
                                                                    />
                                                                    <s.Tier2ItemArrow />
                                                                </s.Tier2Item>
                                                            )
                                                        )}
                                                    </s.Tier2Items>
                                                )}
                                            </s.Tier1ItemWithChildren>
                                        </s.MainLink>
                                    ))}
                                </s.MainLinks>

                                <div>
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
                                </div>
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
                                        <Office {...office} key={i} />
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
                                <Office>
                                    <Policies policies={policies} />
                                </Office>
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
