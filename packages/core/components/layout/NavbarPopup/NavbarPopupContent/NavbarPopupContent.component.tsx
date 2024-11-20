import { navbarActions, useAppDispatch } from '@rightpoint/core/redux'
import { colors, dataAttributes, TestIds } from '@rightpoint/core/variables'
import { Composition, useResponsiveQuery } from 'atomic-layout'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { FC, Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { isSameBasePath } from '../../../utils/url'
import { SocialLinks } from '../../SocialLinks/SocialLinks.component'
import { NavbarPopupFooter } from '../NavbarPopupFooter/NavbarPopupFooter.component'
import { NavbarPopupContentStyles as s } from './NavbarPopupContent.styles'
import { navbarPopupData } from './NavbarPopupContent.hard-coded-data'
import {
    Card,
    CardProps,
    CardVariants,
} from '../../../general/Card/Card.component'
import NextLink from 'next/link'
import { ContentColors } from '../../RootComponent/background-color'
import { MultiMediaTypes } from '../../../general/MultiMedia/MultiMedia.component'
import { NavbarPopupContentSocialLinks } from './NavbarPopupContentSocialLinks.component'

export interface NavbarPopupContentProps {}

export const NavbarPopupContent: FC<NavbarPopupContentProps> = () => {
    const isMobile = useResponsiveQuery({ from: 'xs', to: 'md' })
    const [hoverItem, setHoverItem] = useState(null)

    const router = useRouter()
    const isActiveLink = (href: string) => {
        return isSameBasePath(href, router.asPath)
    }

    const dispatch = useAppDispatch()

    const ref = useRef<HTMLDivElement>()

    const cardProps: CardProps = {
        variant: CardVariants.Card1,
        title: 'Cadillac',
        subtitle: "Reimagining Cadillac's User Experience",
        multiMediaProps: {
            aspectWrapperRatio: 16 / 9,
            mediaType: MultiMediaTypes.VIDEO,
            mediaProps: {
                videoUrl: 'https://vimeo.com/499634642',
            },
        },
        linkProps: {
            href: '/work/browse/by-solution',
            cursor: {
                text: 'View All Work',
            },
        },
    }

    return (
        <>
            <s.NavbarPopupContent
                {...{
                    [dataAttributes.content.attribute]: ContentColors.Light,
                }}
                ref={ref}
                as={motion.div}
                data-testid={TestIds.NavbarPopupContent}
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                    transition: {
                        delay: 0.5,
                    },
                }}
                exit={{
                    opacity: 0,
                }}
            >
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
                            {cardProps && (
                                <areas.Media as={s.MediaWrapper}>
                                    <Card {...cardProps} />
                                </areas.Media>
                            )}
                            <areas.Content
                                data-testid={
                                    TestIds.NavbarPopupContentMainLinks
                                }
                            >
                                {navbarPopupData.links.map((item, i) => {
                                    const Tier1Item = (
                                        item.links?.length > 0
                                            ? s.Tier1ItemWithChildren
                                            : s.Tier1Item
                                    ) as any
                                    return (
                                        <Fragment key={i}>
                                            <Tier1Item
                                                key={item.title}
                                                $active={
                                                    isMobile
                                                        ? isActiveLink(
                                                              item.linkProps
                                                                  .href
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
                                                {...{
                                                    [dataAttributes.cursorText
                                                        .attribute]: 'Explore',
                                                }}
                                            >
                                                <NextLink {...item.linkProps}>
                                                    {item.title}
                                                </NextLink>
                                            </Tier1Item>

                                            {item.links && (
                                                <s.Tier2Items>
                                                    {item.links?.map(
                                                        (item, i) => (
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
                                                                onMouseEnter={(
                                                                    ev
                                                                ) => {
                                                                    setHoverItem(
                                                                        item
                                                                    )
                                                                }}
                                                                onMouseLeave={(
                                                                    ev
                                                                ) => {
                                                                    setHoverItem(
                                                                        null
                                                                    )
                                                                }}
                                                                {...{
                                                                    [dataAttributes
                                                                        .cursorText
                                                                        .attribute]:
                                                                        'Explore',
                                                                }}
                                                            >
                                                                <NextLink
                                                                    {...item.linkProps}
                                                                >
                                                                    {item.title}
                                                                </NextLink>
                                                                <s.Tier2ItemArrow />
                                                            </s.Tier2Item>
                                                        )
                                                    )}
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

                {/* Close the modal accessibly, from within. Ghosts the real navbar */}
                <s.CloseProxy
                    as="button"
                    aria-label="Close Modal"
                    onClick={() => {
                        dispatch(navbarActions.close())
                    }}
                ></s.CloseProxy>
            </s.NavbarPopupContent>
            <NavbarPopupContentSocialLinks mobileOnly />
        </>
    )
}
