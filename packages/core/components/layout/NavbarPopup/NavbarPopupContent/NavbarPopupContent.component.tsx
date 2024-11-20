import { Composition } from 'atomic-layout'
import { FC, useEffect } from 'react'
import {
    NavbarPopupFooter,
    NavbarPopupFooterProps,
} from '../NavbarPopupFooter/NavbarPopupFooter.component'
import { NavbarPopupContentStyles as s } from './NavbarPopupContent.styles'
import { motion } from 'framer-motion'
import { get, merge } from 'lodash'
import { Link, LinkProps } from '../../../general/Link/Link.component'
import { useDispatch } from 'react-redux'
import { navbarActions } from '@rightpoint/core/redux'
import { TestIds } from '@rightpoint/core/variables'
import { linkData } from './temporary-navbar-data'

export interface NavbarPopupContentProps {}

export const NavbarPopupContent: FC<NavbarPopupContentProps> = ({}) => {
    const dispatch = useDispatch()
    return (
        <Composition
            areas={`solutions links footer`}
            areasXs={`
              solutions
              links
              footer
            `}
            templateRows={`1fr 1fr 0`}
            templateRowsXs={`auto auto 100px`}
            heightSm={`100%`}
            as={s.NavbarPopupContent}
        >
            {(areas) => (
                <>
                    <areas.Solutions
                        align="flex-end"
                        marginBottomXs={40}
                        marginBottomMd={60}
                        marginTopXs={140}
                        marginTopMd={0}
                        data-testid={TestIds.NavbarPopupContentMainLinks}
                    >
                        <Solutions />
                    </areas.Solutions>
                    <areas.Links
                        data-testid={TestIds.NavbarPopupContentMainLinks}
                    >
                        <s.Divider
                            as={motion.div}
                            {...merge(animationParams(delays.divider), {
                                initial: {
                                    opacity: 0,
                                    // width: '0%',
                                },
                                animate: {
                                    opacity: 1,
                                    width: '100%',
                                },
                                exit: {
                                    opacity: 0,
                                    // width: '0%',
                                },
                            })}
                        />
                        <motion.div {...animationParams(delays.links)}>
                            {linkData.links.map((item, i) => (
                                <s.Tier1Item
                                    key={item.title}
                                    onMouseEnter={(ev) => {
                                        dispatch(
                                            navbarActions.setPreviewUrl(
                                                item.linkProps.href
                                            )
                                        )
                                    }}
                                >
                                    <Link
                                        {...item.linkProps}
                                        anchorProps={{
                                            onClick: (ev) => {
                                                dispatch(
                                                    navbarActions.triggerPreviewAnimation()
                                                )
                                            },
                                        }}
                                    >
                                        {item.title}
                                    </Link>
                                </s.Tier1Item>
                            ))}
                        </motion.div>
                    </areas.Links>
                    <areas.Footer
                        align="flex-end"
                        as={motion.div}
                        {...animationParams(delays.footer)}
                    >
                        <NavbarPopupFooter />
                    </areas.Footer>
                </>
            )}
        </Composition>
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

type Group = {
    title: string
    items: Item[]
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

const ColumnItem = ({ item, as }: { item: Partial<Item>; as?: any }) => {
    const dispatch = useDispatch()
    return (
        <s.SolutionItem
            onMouseEnter={(ev) => {
                dispatch(
                    navbarActions.setPreviewUrl(get(item, 'linkProps.href'))
                )
            }}
            as={as}
        >
            <Link
                {...item.linkProps}
                anchorProps={{
                    onClick: (ev) => {
                        dispatch(navbarActions.triggerPreviewAnimation())
                    },
                }}
            >
                {item.title}
            </Link>
        </s.SolutionItem>
    )
}
const Column = ({
    title,
    items = [],
}: {
    title: string
    items: Partial<Item>[]
}) => {
    return (
        <s.SolutionColumn>
            {title && (
                <ColumnItem
                    item={{ title, linkProps: items?.[0].linkProps }}
                    as={s.SolutionTitle}
                />
            )}
            {items.map((item, i) => (
                <ColumnItem key={i} item={item} />
            ))}
        </s.SolutionColumn>
    )
}

export interface SolutionsProps {
    title?: string
    groups?: Group[]
}
const Solutions: FC<SolutionsProps> = ({ title = 'Solutions' }) => {
    const dispatch = useDispatch()
    return (
        <>
            <Composition
                areas={`
                    header
                    column1
                    column2
                    column3
                `}
                gapRowXsOnly={20}
                areasSm={`
                    header header header
                    column1 column2 column3
                `}
            >
                {(areas) => (
                    <>
                        <areas.Header
                            marginBottom={10}
                            marginBottomMd={35}
                            as={motion.div}
                            {...animationParams(delays.header)}
                        >
                            <Link
                                href="/solutions"
                                anchorProps={{
                                    onClick: (ev) => {
                                        dispatch(
                                            navbarActions.triggerPreviewAnimation()
                                        )
                                    },
                                }}
                            >
                                <s.SolutionsHeader
                                    as="div"
                                    onMouseEnter={(ev) => {
                                        dispatch(
                                            navbarActions.setPreviewUrl(
                                                '/solutions'
                                            )
                                        )
                                    }}
                                >
                                    {title}
                                </s.SolutionsHeader>
                            </Link>
                        </areas.Header>
                        <areas.Column1
                            as={motion.div}
                            {...animationParams(delays.columns)}
                        >
                            <Column {...linkData.column1} />
                        </areas.Column1>
                        <areas.Column2
                            as={motion.div}
                            {...animationParams(delays.columns)}
                        >
                            <Column {...linkData.column2} />
                        </areas.Column2>
                        <areas.Column3
                            as={motion.div}
                            {...animationParams(delays.columns)}
                        >
                            <Column {...linkData.column3} />
                        </areas.Column3>
                    </>
                )}
            </Composition>
        </>
    )
}
