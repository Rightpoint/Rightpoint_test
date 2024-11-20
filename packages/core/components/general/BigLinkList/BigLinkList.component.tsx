import { icons } from '@rightpoint/core/styles'
import { FC } from 'react'
import { ConditionalWrapper } from '@rightpoint/core/utils'
import { BigLinkListStyles as s } from './BigLinkList.styles'
import { Hero, HeroProps } from '../Hero/Hero.component'
import { BackgroundColorProps } from '../BackgroundColor/BackgroundColor.component'
import { Box } from 'atomic-layout'
import { useScrollAnimation } from '../Animation/Animation.component'
import { Link, LinkProps } from '../../links/Link/Link.component'
import { isEmpty } from 'lodash'

export interface BigLinkListItemProps {
    title: string
    linkProps: LinkProps
    arrow?: boolean
}

const BigLinkListItem = ({ title, linkProps, arrow = false }) => {
    const { Animation } = useScrollAnimation({
        lessMovement: true,
    })
    return (
        <s.Item>
            <Animation>
                <ConditionalWrapper
                    condition={linkProps.href}
                    wrapper={(children) => (
                        <>
                            <Link {...linkProps}>{children}</Link>
                        </>
                    )}
                >
                    <s.Link>
                        {title}

                        {arrow && (
                            <s.Icon>
                                <icons.Arrow aria-label="Arrow icon" />
                            </s.Icon>
                        )}
                    </s.Link>
                </ConditionalWrapper>
            </Animation>
        </s.Item>
    )
}

export interface BigLinkListProps {
    items: BigLinkListItemProps[]
    arrow?: boolean
}
export const BigLinkList: FC<BigLinkListProps> = ({ items, arrow = true }) => {
    return (
        <s.BigLinkList>
            {/* data from CMS unreliable -- where to sanitize? can't dynamically check. */}
            {items?.map((item) => (
                <BigLinkListItem
                    title={item.title}
                    linkProps={item.linkProps}
                    key={item.title + item.linkProps.href}
                    arrow={arrow}
                />
            ))}
        </s.BigLinkList>
    )
}

export interface BigLinkListComposedProps extends BigLinkListProps {
    backgroundColorProps?: Partial<BackgroundColorProps>
    heroProps?: Partial<HeroProps>
}

export const BigLinkListComposed: FC<BigLinkListComposedProps> = ({
    heroProps,
    backgroundColorProps,
    ...props
}) => {
    return (
        <>
            {!isEmpty(heroProps) && <Hero {...heroProps} />}

            <ConditionalWrapper
                condition={!!(heroProps && heroProps.title)}
                wrapper={(children) => (
                    <Box marginTop={120} marginTopLg={160}>
                        {children}
                    </Box>
                )}
            >
                <BigLinkList {...props} />
            </ConditionalWrapper>
        </>
    )
}
