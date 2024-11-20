import { FC } from 'react'

interface MenuProps {
    className?: string
    style?: React.CSSProperties
    rootProps?: React.SVGProps<SVGSVGElement>
}
export const Menu: FC<MenuProps> = ({ className, style, rootProps }) => (
    <svg
        width="27"
        height="16"
        viewBox="0 0 27 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...{ className, style }}
        {...rootProps}
    >
        <path
            d="M0 7.97995H26.9996M27 1H0.00040877M27 15H0.00040877"
            stroke="currentColor"
        />
    </svg>
)
