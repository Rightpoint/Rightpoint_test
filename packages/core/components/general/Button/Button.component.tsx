import { typography } from '@rightpoint/core/styles'
import { AllHTMLAttributes, FC, HTMLAttributes, ReactNode } from 'react'
import { Link, LinkProps } from '../../links/Link/Link.component'
import { ButtonStyles as s } from './Button.styles'

export type ButtonSize = 'small' | 'normal'

export interface ButtonProps extends HTMLAttributes<any> {
    text?: string
    children?: ReactNode
    buttonProps?: any
    size?: ButtonSize // or default: normal
    outlined?: boolean
}

export const Button: FC<ButtonProps> = ({
    text,
    children,
    buttonProps,
    size,
    outlined,
    ...props
}) => {
    return (
        <s.Button
            {...props}
            {...(buttonProps || {})}
            $size={size}
            $outlined={outlined}
        >
            {text || children}
        </s.Button>
    )
}

/**
 * @deprecated
 */
export interface ButtonLinkProps extends ButtonProps {
    linkProps: LinkProps
}
/**
 * @deprecated
 */
export const ButtonLink: FC<ButtonLinkProps> = ({ linkProps, ...rest }) => {
    return (
        <Link {...linkProps}>
            <Button {...rest} />
        </Link>
    )
}
