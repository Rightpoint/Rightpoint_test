import { FC } from 'react'

interface LogoMarkProps {
    title?: string
    rootProps?: object
}
export const LogoMark: FC<LogoMarkProps> = ({
    title = 'Rightpoint Logo Mark',
    rootProps = {},
}) => (
    <svg
        width="49"
        height="35"
        viewBox="0 0 49 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...rootProps}
    >
        <title>{title}</title>
        <path
            d="M48.3788 17.2484L31.2228 0H15.595L32.8071 17.2425L48.3788 17.2484Z"
            fill="#FF555E"
        />
        <path
            d="M0 34.4974L9.72306 24.8082C14.5189 19.9703 20.929 17.249 27.7393 17.249H32.8429L15.5141 34.4945L0 34.4974Z"
            fill="#FF555E"
        />
    </svg>
)
