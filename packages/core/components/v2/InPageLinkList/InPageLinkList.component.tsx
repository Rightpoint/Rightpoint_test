import { Document } from '@contentful/rich-text-types'
import { FC, useState } from 'react'
import { ConditionalWrapper } from '@rightpoint/core/utils'
import {
    MultiMedia,
    MultiMediaProps,
} from '../../general/MultiMedia/MultiMedia.component'
import { contentfulRichTextToReact } from '../../general/RichText/contentful-rich-text-to-react'
import { Link, LinkProps } from '../../links/Link/Link.component'
import {
    LinksList,
    LinksListProps,
} from '../../links/LinksList/LinksList.component'
import { InPageLinkListStyles as s } from './InPageLinkList.styles'

export interface InPageLinkListItemProps {
    title: string
    body?: Document
    linksListProps?: LinksListProps
    multiMediaProps?: MultiMediaProps
    ctaLinkProps?: LinkProps
}

const Content: FC<InPageLinkListItemProps> = ({
    body,
    linksListProps,
    ctaLinkProps,
}) => {
    return (
        <s.Content>
            {body && <s.Body>{contentfulRichTextToReact(body)}</s.Body>}

            <s.LinksList>
                {linksListProps && <LinksList {...linksListProps} />}
            </s.LinksList>

            {ctaLinkProps && (
                <s.Cta>
                    <Link
                        {...{
                            // cursor: {
                            //     text: 'Explore',
                            // },
                            ...ctaLinkProps,
                        }}
                        asButton
                    />
                </s.Cta>
            )}
        </s.Content>
    )
}

export interface InPageLinkListProps {
    items: InPageLinkListItemProps[]
}

export const InPageLinkList: FC<InPageLinkListProps> = ({ items }) => {
    const [activeTab, setActiveTab] = useState(0)
    const activeItem = items[activeTab]
    return (
        <s.InPageLinkList>
            <s.Left>
                {items?.map((item, index) => {
                    const isActive = Boolean(
                        index === activeTab ? 'active' : ''
                    )
                    return (
                        <s.Title
                            key={index}
                            $active={isActive}
                            onClick={() => {
                                setActiveTab(index)
                            }}
                        >
                            {item.title}
                        </s.Title>
                    )
                })}
                {activeItem && <Content {...activeItem} />}
            </s.Left>
            <s.Right>
                <ConditionalWrapper
                    condition={Boolean(activeItem?.ctaLinkProps)}
                    wrapper={(children) => (
                        <Link {...activeItem.ctaLinkProps} noDecoration>
                            {children}
                        </Link>
                    )}
                >
                    <s.Image>
                        <MultiMedia {...activeItem?.multiMediaProps} />
                    </s.Image>
                </ConditionalWrapper>
            </s.Right>
        </s.InPageLinkList>
    )
}
