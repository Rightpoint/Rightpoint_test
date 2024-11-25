import { FC } from 'react'
import { Link, LinkProps } from '../../links/Link/Link.component'
import { SimpleListStyles as s } from './SimpleList.styles'

export default interface SimpleItemProps {
    linkProps?: LinkProps
}

const Item: FC<SimpleItemProps> = ({ linkProps }) => {
    const hasLink = !!linkProps?.href
    if (hasLink) {
        return (
            <s.Item>
                <Link {...linkProps} />
            </s.Item>
        )
    }
    return <s.Item>{linkProps.text}</s.Item>
}

export interface SimpleListProps {
    title?: string
    items: SimpleItemProps[]
}

export const SimpleList: FC<SimpleListProps> = ({ title, items }) => {
    return (
        <s.SimpleList>
            <s.Left>
                <s.Title>{title}</s.Title>
            </s.Left>
            <s.Right>
                <s.Items>
                    {items.map((item, index) => (
                        <Item key={index} {...item} />
                    ))}
                </s.Items>
            </s.Right>
        </s.SimpleList>
    )
}
