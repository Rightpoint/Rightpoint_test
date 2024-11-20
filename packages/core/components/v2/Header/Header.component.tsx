import { Document } from '@contentful/rich-text-types'
import { ComponentType, FC, ReactNode } from 'react'
import { useScrollAnimation } from '../../general/Animation/Animation.component'
import { Link, LinkProps } from '../../links/Link/Link.component'
import { contentfulRichTextToReact } from '../../general/RichText/contentful-rich-text-to-react'
import { IconEyebrow } from '../IconEyebrow/IconEyebrow.component'
import { HeaderStyles as s } from './Header.styles'

export const HeaderVariants = [
    'Default',
    'Header1',
    'Header2',
    'Header3',
    'Header4',
    'Header5',
    'HeaderText',
    'Header6',
    'HeaderContact',
] as const
export type HeaderVariants = (typeof HeaderVariants)[number]

export interface HeaderProps {
    variant?: HeaderVariants

    eyebrow?: string
    title?: string | ReactNode
    titleDocument?: Document
    subtitle?: string | Document
    body?: string | ReactNode | Document

    linkProps?: LinkProps
    as?: string | ComponentType<any>
    isPageHeader?: boolean
}

interface HeaderVariantProps extends HeaderProps {
    body?: string | ReactNode // strip Document -- parent converts it
}

/**
 * If the passed body is a document, convert it to React
 */
const isRichDocument = (doc: any): doc is Document => {
    return doc?.nodeType === 'document'
}

/**
 *
 * @param title render a title document with newlines allowed
 */

const renderTitle = (title: string | Document | ReactNode) => {
    if (isRichDocument(title)) {
        return contentfulRichTextToReact(title, null, {
            renderNode: {
                paragraph: (node, children) => {
                    return <>{children}</>
                },
            },
        })
    }
    return title
}

/**
 * Get a header component by Variant
 */
const getComponent = (headerType: HeaderVariants) => {
    switch (headerType) {
        case 'Default':
            return Header1
        case 'Header1':
            return Header1
        case 'Header2':
            return Header2
        case 'Header3':
            return Header3
        case 'Header4':
            return Header4
        case 'Header5':
            return Header5
        case 'Header6':
            return Header6
        case 'HeaderText':
            return HeaderText
        case 'HeaderContact':
            return HeaderContact
        default:
            return Header3
    }
}

export const Header: FC<HeaderProps> = ({ variant, body, ...restProps }) => {
    const Component = getComponent(variant)

    return (
        <Component
            {...restProps}
            body={isRichDocument(body) ? contentfulRichTextToReact(body) : body}
        />
    )
}

const Header1: FC<HeaderVariantProps> = ({
    eyebrow,
    title,
    titleDocument,
    linkProps,
    body,
    as = 'div',
    isPageHeader,
}) => {
    return (
        <s.Header $isPageHeader={isPageHeader}>
            <s.Header1.Header as={as}>
                <s.Header1.Eyebrow>
                    <IconEyebrow text={eyebrow} />
                </s.Header1.Eyebrow>
                <s.Header1.Title>
                    {renderTitle(titleDocument || title)}
                </s.Header1.Title>
                <s.Header1.Body>{body}</s.Header1.Body>
            </s.Header1.Header>
        </s.Header>
    )
}

const Header2: FC<HeaderVariantProps> = ({
    eyebrow,
    title,
    linkProps,
    body,
    as = 'div',
    isPageHeader,
}) => {
    return (
        <s.Header $isPageHeader={isPageHeader}>
            <s.Header2.Header as={as}>
                <s.Header2.Title as={isPageHeader ? 'h1' : null}>
                    {title}
                </s.Header2.Title>
                <s.Header2.Right>
                    <IconEyebrow text={eyebrow} />
                    <s.Header2.Body>{body}</s.Header2.Body>
                </s.Header2.Right>
            </s.Header2.Header>
        </s.Header>
    )
}

const Header3: FC<HeaderVariantProps> = ({
    eyebrow,
    title,
    titleDocument,
    linkProps,
    body,
    as = 'div',
    isPageHeader,
}) => {
    return (
        <s.Header $isPageHeader={isPageHeader}>
            <s.Header3.Header as={as}>
                <IconEyebrow text={eyebrow} />
                {/* TODO: Better solution than this that can be applied globally, with a 
            custom BR that is itself a styled component that can be disabled in mobile */}
                <s.Header3.Title>
                    {renderTitle(titleDocument || title)}
                </s.Header3.Title>
            </s.Header3.Header>
        </s.Header>
    )
}

const Header4: FC<HeaderVariantProps> = ({
    eyebrow,
    title,
    titleDocument,
    body,
    linkProps,
    as = 'div',
    isPageHeader,
}) => {
    return (
        <s.Header $isPageHeader={isPageHeader}>
            <s.Header4.Header as={as}>
                <IconEyebrow text={eyebrow} />
                <s.Header4.Body>
                    {renderTitle(body || titleDocument || title)}
                </s.Header4.Body>
                {linkProps && (
                    <s.Header4.Cta>
                        <Link {...linkProps} />
                    </s.Header4.Cta>
                )}
            </s.Header4.Header>
        </s.Header>
    )
}

const Header5: FC<HeaderProps> = ({
    eyebrow,
    title,
    titleDocument,
    linkProps,
    body,
    as,
    isPageHeader,
}) => {
    const { Animation } = useScrollAnimation({
        lessMovement: true,
    })

    return (
        <s.Header $isPageHeader={isPageHeader}>
            <s.Header5.Header as={as}>
                {eyebrow && (
                    <s.Header5.Left>
                        <Animation>
                            <IconEyebrow text={eyebrow} />
                        </Animation>
                    </s.Header5.Left>
                )}

                <s.Header5.Right>
                    <Animation>
                        <s.Header5.Title>
                            {renderTitle(titleDocument || title)}
                        </s.Header5.Title>
                        <s.Header5.Body>{body}</s.Header5.Body>
                    </Animation>
                </s.Header5.Right>
            </s.Header5.Header>
        </s.Header>
    )
}

const HeaderText: FC<HeaderVariantProps> = ({
    eyebrow,
    title,
    linkProps,
    body,
    as = 'div',
    isPageHeader,
}) => {
    return (
        <s.Header $isPageHeader={isPageHeader}>
            <s.HeaderText.Header as={as}>
                <s.HeaderText.Body>{body}</s.HeaderText.Body>
            </s.HeaderText.Header>
        </s.Header>
    )
}

const Header6: FC<HeaderVariantProps> = ({
    eyebrow,
    title,
    titleDocument,
    linkProps,
    subtitle,
    body,
    as = 'div',
    isPageHeader,
}) => {
    return (
        <s.Header $isPageHeader={isPageHeader}>
            <s.Header6.Header as={as}>
                <s.Header6.Title as={isPageHeader ? 'h1' : null}>
                    {renderTitle(titleDocument || title)}
                </s.Header6.Title>
                <s.Header6.Below>
                    {subtitle && (
                        <s.Header6.Left>
                            <s.Header6.Subtitle>
                                {contentfulRichTextToReact(subtitle)}
                            </s.Header6.Subtitle>
                            {linkProps && (
                                <s.Header6.Cta>
                                    <Link {...linkProps} asButton />
                                </s.Header6.Cta>
                            )}
                        </s.Header6.Left>
                    )}
                    <s.Header6.Right>
                        <s.Header6.Body>{body}</s.Header6.Body>

                        {linkProps && (
                            <s.Header6.Cta>
                                <Link {...linkProps} asButton />
                            </s.Header6.Cta>
                        )}
                    </s.Header6.Right>
                </s.Header6.Below>
            </s.Header6.Header>
        </s.Header>
    )
}

const HeaderContact: FC<HeaderVariantProps> = ({
    eyebrow,
    title,
    titleDocument,
    linkProps,
    subtitle,
    body,
    as = 'div',
    isPageHeader,
}) => {
    /**
     * This one off component is used for the contact page.
     *
     * CMS is a challenge with repeated one off items for one variant.
     *
     * It should be replaced with the "Generic Settings" component when it is ready that will power the footer, navbar, etc.
     * via preview mode click navigation.
     */
    const items = [
        {
            title: 'New Business',
            body: (
                <>
                    For CX Initiatives
                    <br />
                    <a
                        href="mailto:business@rightpoint.com"
                        target="_blank"
                        data-cursor-text="Email"
                    >
                        business@rightpoint.com
                    </a>
                </>
            ),
        },
        {
            title: 'General',
            body: (
                <>
                    For general questions
                    <br />
                    <a
                        href="mailto:hello@rightpoint.com"
                        target="_blank"
                        data-cursor-text="Email"
                    >
                        hello@rightpoint.com
                    </a>
                </>
            ),
        },
        {
            title: 'Press',
            body: (
                <>
                    For general questions
                    <br />
                    <a
                        href="mailto:marketing@rightpoint.com"
                        target="_blank"
                        data-cursor-text="Email"
                    >
                        marketing@rightpoint.com
                    </a>
                </>
            ),
        },
        {
            title: 'Careers',
            body: (
                <>
                    For career inquiries
                    <br />
                    <a
                        href="mailto:careers@rightpoint.com"
                        target="_blank"
                        data-cursor-text="Email"
                    >
                        careers@rightpoint.com
                    </a>
                    <br />
                    <div
                        style={{
                            marginTop: 30,
                        }}
                    >
                        <Link
                            href="/careers"
                            scrollTo={{ text: 'Openings' }}
                            asButton={{
                                outlined: true,
                                size: 'small',
                            }}
                            cursor={{ text: 'Explore Careers' }}
                        >
                            Apply
                        </Link>
                    </div>
                </>
            ),
        },
    ]
    return (
        <s.HeaderContact.Header as={as}>
            <s.HeaderContact.Left>
                <s.HeaderContact.Title as={isPageHeader ? 'h1' : null}>
                    {renderTitle(titleDocument || title)}
                </s.HeaderContact.Title>
                <s.HeaderContact.Subtitle>
                    {contentfulRichTextToReact(subtitle)}
                </s.HeaderContact.Subtitle>
                {linkProps && (
                    <s.HeaderContact.Cta>
                        <Link {...linkProps} asButton />
                    </s.HeaderContact.Cta>
                )}
            </s.HeaderContact.Left>
            <s.HeaderContact.Right>
                {items.map((item, index) => (
                    <s.HeaderContact.GridItem key={index}>
                        <s.HeaderContact.GridItem__Title>
                            {item.title}
                        </s.HeaderContact.GridItem__Title>
                        <s.HeaderContact.GridItem__Body>
                            {item.body}
                        </s.HeaderContact.GridItem__Body>
                    </s.HeaderContact.GridItem>
                ))}
            </s.HeaderContact.Right>
        </s.HeaderContact.Header>
    )
}
