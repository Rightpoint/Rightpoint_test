import { FC } from 'react'
import { LinksListStyles as s } from './LinksList.styles'
import NextLink from 'next/link'
import { Link, LinkProps } from '../Link/Link.component'

export interface LinksListProps {
    title?: string
    linksProps?: LinkProps[]
}

export const LinksList: FC<LinksListProps> = ({ title, linksProps }) => {
    return (
        <s.Links>
            <s.LinksHeader>{title}</s.LinksHeader>
            {linksProps?.map((linkProps) => (
                <s.Link>
                    <Link {...linkProps}>
                        {linkProps.text} <s.Arrow />
                    </Link>
                </s.Link>
            ))}
        </s.Links>
    )
}
