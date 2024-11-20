import { Document } from '@contentful/rich-text-types'
import { ComponentType, FC, ReactNode } from 'react'
import { useScrollAnimation } from '../../general/Animation/Animation.component'
import { Link, LinkProps } from '../../general/Link/Link.component'
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
] as const
export type HeaderVariants = (typeof HeaderVariants)[number]

export interface HeaderProps {
    variant?: HeaderVariants

    eyebrow?: string
    title?: string | ReactNode
    body?: string | ReactNode | Document

    linkProps?: LinkProps
    as?: string | ComponentType<any>

    /**
     * a very few select headers might need a second body field
     * let's not confuse the rest
     */
}

interface HeaderVariantProps extends HeaderProps {
    body?: string | ReactNode // strip Document -- parent converts it
}

/**
 * Get a header component by Variant
 */
const getComponent = (headerType: HeaderVariants) => {
    switch (headerType) {
        case 'Default':
            return Header3
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
        case 'HeaderText':
            return HeaderText
        default:
            return Header3
    }
}
export const Header: FC<HeaderProps> = ({ variant, body, ...restProps }) => {
    const Component = getComponent(variant)
    /**
     * If the passed body is a document, convert it to React
     */
    const isRichDocument = (doc: any): doc is Document => {
        return doc?.nodeType === 'document'
    }
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
    linkProps,
    body,
    as = 'div',
}) => {
    return (
        <s.Header1.Header as={as}>
            <s.Header1.Eyebrow>
                <IconEyebrow text={eyebrow} />
            </s.Header1.Eyebrow>
            <s.Header1.Title>{title}</s.Header1.Title>
            <s.Header1.Body>{body}</s.Header1.Body>
        </s.Header1.Header>
    )
}

const Header2: FC<HeaderVariantProps> = ({
    eyebrow,
    title,
    linkProps,
    body,
    as = 'div',
}) => {
    return (
        <s.Header2.Header as={as}>
            <s.Header2.Title>{title}</s.Header2.Title>
            <s.Header2.Right>
                <IconEyebrow text={eyebrow} />
                <s.Header2.Body>{body}</s.Header2.Body>
            </s.Header2.Right>
        </s.Header2.Header>
    )
}

const Header3: FC<HeaderVariantProps> = ({
    eyebrow,
    title,
    linkProps,
    body,
    as = 'div',
}) => {
    return (
        <s.Header3.Header as={as}>
            <IconEyebrow text={eyebrow} />
            <s.Header3.Title>{title}</s.Header3.Title>
        </s.Header3.Header>
    )
}

const Header4: FC<HeaderVariantProps> = ({
    eyebrow,
    body,
    linkProps,
    as = 'div',
}) => {
    return (
        <s.Header4.Header as={as}>
            <IconEyebrow text={eyebrow} />
            <s.Header4.Body>{body}</s.Header4.Body>
            {linkProps && (
                <s.Header4.Cta>
                    <Link {...linkProps} />
                </s.Header4.Cta>
            )}
        </s.Header4.Header>
    )
}

const Header5: FC<HeaderProps> = ({ eyebrow, title, linkProps, body, as }) => {
    const { Animation } = useScrollAnimation({
        lessMovement: true,
    })

    return (
        <s.Header5.Header as={as}>
            <s.Header5.Left>
                <Animation>
                    <IconEyebrow text={eyebrow} />
                </Animation>
            </s.Header5.Left>

            <s.Header5.Right>
                <Animation>
                    <s.Header5.Title>{title}</s.Header5.Title>
                    <s.Header5.Body>{body}</s.Header5.Body>
                </Animation>
            </s.Header5.Right>
        </s.Header5.Header>
    )
}

const HeaderText: FC<HeaderVariantProps> = ({
    eyebrow,
    title,
    linkProps,
    body,
    as = 'div',
}) => {
    return (
        <s.HeaderText.Header as={as}>
            <s.HeaderText.Body>{body}</s.HeaderText.Body>
        </s.HeaderText.Header>
    )
}
