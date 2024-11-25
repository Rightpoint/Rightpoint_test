import { ShareStyles as s } from './Share.styles'
import { FaFacebook, FaXTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa6'
import { IconType } from 'react-icons'
import { BsArrowRight } from 'react-icons/bs'
import { FC } from 'react'
import { Link } from '../../links/Link/Link.component'

import { useRouter } from 'next/router'
import { getAbsoluteDomainUrl } from '@rightpoint/core/utils'

const getAbsoluteUrl = (path) => {
    const publicDomain = getAbsoluteDomainUrl()
    return `${publicDomain}${path}`
}

interface ShareItemProps {
    text: string
    /**
     * @deprecated -- not used in v2 designs
     */
    // Icon: IconType
    pageTitle?: string
    shareUrl?: string
    getHref: ({ pageTitle, shareUrl }) => string
}

const ShareItem: FC<ShareItemProps> = ({
    getHref,
    text,
    pageTitle,
    shareUrl,
}) => {
    const shareText = `Share with ${text}`
    return (
        <s.ShareItem>
            <Link
                href={getHref({ pageTitle, shareUrl })}
                target="_blank"
                cursorProps={{
                    text: 'Share Page',
                }}
            >
                <s.ShareText>{text}</s.ShareText>
                <BsArrowRight aria-label={shareText} />
            </Link>
        </s.ShareItem>
    )
}

const shareItems: ShareItemProps[] = [
    {
        text: 'Twitter',
        // Icon: FaXTwitter,
        getHref: ({ pageTitle, shareUrl }) => {
            const url = getAbsoluteUrl(shareUrl)
            const text = `${pageTitle} - ${url}`
            return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                text
            )}`
        },
    },
    {
        text: 'Facebook',
        // Icon: FaFacebook,
        getHref: ({ pageTitle, shareUrl }) => {
            const url = getAbsoluteUrl(shareUrl)
            return `https://www.facebook.com/sharer/sharer.php?u=${url}`
        },
    },
    {
        text: 'LinkedIn',
        // Icon: FaLinkedin,
        getHref: ({ pageTitle, shareUrl }) => {
            const url = getAbsoluteUrl(shareUrl)
            return `https://www.linkedin.com/cws/share?url=${url}            `
        },
    },
    {
        text: 'E-mail',
        // Icon: FaEnvelope,
        getHref: ({ pageTitle, shareUrl }) => {
            const url = getAbsoluteUrl(shareUrl)
            const subject = `Check out this article: ${pageTitle}`
            const body = `${pageTitle}
                %0D%0A%0D%0A
                ${url}`
            return `mailto:?subject=${subject}&body=${body}`
        },
    },
]
export interface ShareProps {
    pageTitle: string
}
export const Share: FC<ShareProps> = ({ pageTitle }) => {
    const router = useRouter()

    return (
        <s.Share>
            {shareItems.map((props) => (
                <ShareItem
                    {...props}
                    key={props.text}
                    pageTitle={pageTitle}
                    shareUrl={router.asPath}
                />
            ))}
        </s.Share>
    )
}
