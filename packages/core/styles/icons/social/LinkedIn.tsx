import { FC } from 'react'
import { SocialIconProps } from './SocialIcon'

export const LinkedIn: FC<SocialIconProps> = ({
    title = 'LinkedIn',
    rootProps = {},
}) => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...rootProps}
    >
        <title>{title}</title>

        <g transform="translate(-34.333351,-0.209961)">
            <path
                d="M 39.4074,2.70508 C 39.3882,1.41602 38.4453,0.419922 36.9637,0.419922 c -1.5009,0 -2.4822,0.996098 -2.4822,2.285158 C 34.4815,3.98438 35.4436,5 36.8963,5 h 0.0289 c 1.5201,0 2.4822,-1.01562 2.4822,-2.29492 z m -4.5122,4.375 V 20 h 4.0985 V 7.08008 Z M 45.5648,12.5 c 0,-1.6699 1.0487,-2.5 2.2802,-2.5 1.2315,0 2.232,0.8301 2.232,2.9199 V 20 h 4.1082 v -7.5 c 0,-3.75 -2.0493,-5.83008 -4.9259,-5.83008 -1.6452,0 -2.8767,0.94727 -3.6945,2.19727 L 45.4301,7.08008 H 41.3893 C 41.3893,7.51953 41.4567,10 41.4567,10 v 10 h 4.1081 z"
                fill="currentColor"
            />
        </g>
    </svg>
)
