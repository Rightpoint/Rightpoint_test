import { FC } from 'react'
import { LinksListStyles as s } from './LinksList.styles'
import { Link, LinkProps } from '../Link/Link.component'

export interface LinksListProps {
    title?: string
    linksProps?: LinkProps[]
}

export const LinksList: FC<LinksListProps> = ({ title, linksProps }) => {
    return (
        <s.LinksList>
            <s.LinksHeader>{title}</s.LinksHeader>
            <s.Links>
                {linksProps?.map((linkProps, index) => (
                    <s.Link key={index}>
                        <Link {...linkProps} noDecoration>
                            {linkProps?.text} <s.Arrow />
                        </Link>
                    </s.Link>
                ))}
            </s.Links>
        </s.LinksList>
    )
}
