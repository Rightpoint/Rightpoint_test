import { typography } from '@rightpoint/core/styles'
import { FC } from 'react'
import { Link, LinkProps } from '../Link/Link.component'
import { ButtonStyles as s } from './Button.styles'

export interface ButtonProps {
    text?: string
    onClick?: () => void

    buttonProps?: any
}

export const Button: FC<ButtonProps> = ({
    text,
    children,
    buttonProps,
    ...props
}) => {
    return (
        <s.Button {...props} {...(buttonProps || {})}>
            {text || children}
        </s.Button>
    )
}

export interface ButtonLinkProps extends ButtonProps {
    linkProps: LinkProps
}
export const ButtonLink: FC<ButtonLinkProps> = ({ linkProps, ...rest }) => {
    return (
        <Link {...linkProps}>
            <Button {...rest} />
        </Link>
    )
}
