import { FC } from 'react'

interface SmallArrowProps {
    className?: string
    style?: React.CSSProperties
    rootProps?: React.SVGProps<SVGSVGElement>
}
export const SmallArrow: FC<SmallArrowProps> = ({
    className,
    style,
    rootProps,
}) => (
    <svg
        width="9"
        height="11"
        viewBox="0 0 9 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...{ className, style }}
        {...rootProps}
    >
        <path d="M4.8125 0.465332L4.8125 9.46533" stroke="currentColor" />
        <path
            d="M8.28711 6.46533L4.59448 9.65442L0.901855 6.46533"
            stroke="currentColor"
        />
    </svg>
)
