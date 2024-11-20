import { navbarActions } from '@rightpoint/core/redux'
import { colors, TestIds } from '@rightpoint/core/variables'
import { Composition, useResponsiveQuery } from 'atomic-layout'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { FC, Fragment, useMemo, useState } from 'react'
import { isSameBasePath } from '../../../utils/url'
import { SocialLinks } from '../../SocialLinks/SocialLinks.component'
import { NavbarPopupFooter } from '../NavbarPopupFooter/NavbarPopupFooter.component'
import { NavbarPopupContentStyles as s } from './NavbarPopupContent.styles'
import { navbarPopupData } from './NavbarPopupContent.hard-coded-data'
import { Card, CardVariants } from '../../../general/Card/Card.component'
import { cardGenerators } from '../../../general/Card/Card.data'
import NextLink from 'next/link'

export interface NavbarPopupContentProps {}

export const NavbarPopupContent: FC<NavbarPopupContentProps> = ({}) => {
    const isMobile = useResponsiveQuery({ from: 'xs', to: 'md' })
    const [hoverItem, setHoverItem] = useState(null)

    const router = useRouter()
    const isActiveLink = (href: string) => {
        return isSameBasePath(href, router.asPath)
    }

    /**
     * @deprecated
     * remove faker
     */
    const card = useMemo(() => {
        console.log('Faker being introduced here @ NavbarPopupContent')
        return (
            <Card {...cardGenerators.default()} variant={CardVariants.Card1} />
        )
    }, [])

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
                        <areas.Media as={s.MediaWrapper}>{card}</areas.Media>
                        <areas.Content
                            data-testid={TestIds.NavbarPopupContentMainLinks}
                        >
                            {navbarPopupData.links.map((item, i) => {
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
                                            <NextLink {...item.linkProps}>
                                                {item.title}
                                            </NextLink>
                                        </Tier1Item>

                                        {item.links && (
                                            <s.Tier2Items>
                                                {item.links?.map((item, i) => (
                                                    <s.Tier2Item
                                                        key={item.title}
                                                        $active={
                                                            isMobile
                                                                ? isActiveLink(
                                                                      item
                                                                          .linkProps
                                                                          .href
                                                                  )
                                                                : hoverItem ===
                                                                  item
                                                        }
                                                        onMouseEnter={(ev) => {
                                                            setHoverItem(item)
                                                        }}
                                                        onMouseLeave={(ev) => {
                                                            setHoverItem(null)
                                                        }}
                                                    >
                                                        <NextLink
                                                            {...item.linkProps}
                                                        >
                                                            {item.title}
                                                        </NextLink>
                                                        <s.Tier2ItemArrow />
                                                    </s.Tier2Item>
                                                ))}
                                            </s.Tier2Items>
                                        )}
                                    </Fragment>
                                )
                            })}
                        </areas.Content>
                        <areas.Footer>
                            <NavbarPopupFooter />
                        </areas.Footer>
                    </>
                )}
            </Composition>
            <s.SocialLinks as={motion.div}>
                <SocialLinks />
            </s.SocialLinks>
        </s.NavbarPopupContent>
    )
}
