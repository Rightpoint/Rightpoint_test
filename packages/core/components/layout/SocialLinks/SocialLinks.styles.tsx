import { cssVarsTypographyValues, typography } from '@rightpoint/core/styles'
import styled from 'styled-components'
import { Link, LinkProps } from '../../general/Link/Link.component'

const SocialLink = styled(Link)<LinkProps>`
    display: inline-block;
    padding: 0.9rem;
    text-decoration: none;
    margin-bottom: -0.5rem;

    &:first-child {
        margin-left: -0.9rem;
        margin-right: -0.9rem;
    }
`

const SocialLinks = styled.div``

export const SocialLinksStyles = {
    SocialLinks,
    SocialLink,
}
