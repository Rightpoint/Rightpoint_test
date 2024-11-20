import { navbarActions } from '@rightpoint/core/redux'
import { colors, TestIds } from '@rightpoint/core/variables'
import { Composition, useResponsiveQuery } from 'atomic-layout'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { FC, Fragment, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, LinkProps } from '../../../general/Link/Link.component'
import { isSameBasePath } from '../../../utils/url'
import { typography } from '@rightpoint/core/styles'
import { SocialLinks } from '../../SocialLinks/SocialLinks.component'
import { NavbarPopupFooter } from '../NavbarPopupFooter/NavbarPopupFooter.component'
import { NavbarPopupContentStyles as s } from './NavbarPopupContent.styles'
import { linkData } from './temporary-navbar-data'
import { Card, CardVariants } from '../../../general/Card/Card.component'
import { cardGenerators } from '../../../general/Card/Card.data'

export interface NavbarPopupContentProps {}

export const NavbarPopupContent: FC<NavbarPopupContentProps> = ({}) => {
    const isMobile = useResponsiveQuery({ from: 'xs', to: 'md' })
    const [hoverItem, setHoverItem] = useState(null)

    const router = useRouter()
    const isActiveLink = (href: string) => {
        return isSameBasePath(href, router.asPath)
    }

    // Temporary workaround for card flashing glitch
    const card = useMemo(
        () => (
            <Card {...cardGenerators.default()} variant={CardVariants.Card1} />
        ),
        []
    )

    return (
        <s.NavbarPopupContent>
            <Composition
                areas={`
                    content
                    footer
                `}
                areasMd={`
                    media content
                `}
                gapMd={`0 calc(122/1440*100vw)`}
                gapLg={`0 122px`}
                as={s.NavbarPopupContentInner}
                templateRows="1fr auto"
                templateColumnsMd={`3.87fr 2.85fr`}
            >
                {(areas) => (
                    <>
                        <areas.Content
                            as={motion.div}
                            {...animationParams(delays.links)}
                            data-testid={TestIds.NavbarPopupContentMainLinks}
                        >
                            {linkData.links.map((item, i) => {
                                const Tier1Item =
                                    item.links?.length > 0
                                        ? s.Tier1ItemWithChildren
                                        : s.Tier1Item
                                return (
                                    <Fragment key={i}>
                                        <Tier1Item
                                            key={item.title}
                                            $active={
                                                isMobile
                                                    ? isActiveLink(
                                                          item.linkProps.href
                                                      )
                                                    : hoverItem === null ||
                                                      hoverItem === item
                                            }
                                            onMouseEnter={(ev) => {
                                                setHoverItem(item)
                                            }}
                                            onMouseLeave={(ev) => {
                                                setHoverItem(null)
                                            }}
                                        >
                                            <Link {...item.linkProps}>
                                                {item.title}
                                            </Link>
                                        </Tier1Item>
                                        {item.links?.map((item, i) => (
                                            <s.Tier2Item
                                                key={item.title}
                                                $active={
                                                    isMobile
                                                        ? isActiveLink(
                                                              item.linkProps
                                                                  .href
                                                          )
                                                        : hoverItem === item
                                                }
                                                onMouseEnter={(ev) => {
                                                    setHoverItem(item)
                                                }}
                                                onMouseLeave={(ev) => {
                                                    setHoverItem(null)
                                                }}
                                            >
                                                <Link {...item.linkProps}>
                                                    {item.title}
                                                </Link>
                                                <s.Tier2ItemArrow />
                                            </s.Tier2Item>
                                        ))}
                                    </Fragment>
                                )
                            })}
                        </areas.Content>

                        <areas.Footer
                            as={motion.div}
                            {...animationParams(delays.footer)}
                        >
                            <NavbarPopupFooter />
                        </areas.Footer>
                        <areas.Media as={s.MediaWrapper}>
                            <motion.div {...animationParams(delays.card)}>
                                {card}
                            </motion.div>
                        </areas.Media>
                    </>
                )}
            </Composition>
            <s.SocialLinks as={motion.div} {...animationParams(delays.footer)}>
                <SocialLinks />
            </s.SocialLinks>
        </s.NavbarPopupContent>
    )
}

const delays = {
    header: {
        delay: 0.1,
        exitDelay: 0,
    },
    columns: {
        delay: 0.2,
        exitDelay: 0,
    },
    divider: { delay: 0.35, exitDelay: 0, duration: 0.5 },
    card: {
        delay: 0.3,
        exitDelay: 0,
    },
    links: {
        delay: 0.3,
        exitDelay: 0,
    },
    footer: { delay: 0.4, exitDelay: 0 },
}

type Item = {
    title: string
    linkProps: LinkProps
}

const animationParams = ({
    duration = 0.5,
    delay = 0,
    exitDelay = 0,
} = {}) => ({
    transition: {
        ease: 'linear',
        duration,
    },
    initial: {
        opacity: 0,
        // translateY: 10,
    },
    animate: {
        opacity: 1,
        translateY: 0,
        transition: {
            delay,
            duration: 1,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.5,
            delay: exitDelay,
        },
    },
})
