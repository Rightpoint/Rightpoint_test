import { FC } from 'react'
import { SocialIconProps } from './SocialIcon'

export const Facebook: FC<SocialIconProps> = ({
    title = 'Facebook',
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

        <g transform="translate(-73.740753)">
            <path
                d="M 92.3611,0 H 75.1204 c -0.6735,0 -1.2315,0.566406 -1.2315,1.25 v 17.5 c 0,0.6836 0.558,1.25 1.2315,1.25 h 9.3034 V 12.2266 H 81.9609 V 9.3457 h 2.4629 V 6.85547 c 0,-2.27539 1.3662,-3.79883 4.0697,-3.79883 1.193,0 2.0204,0.13672 2.0204,0.13672 v 2.59766 h -1.8472 c -0.8178,0 -1.2315,0.46875 -1.2315,1.28906 V 9.3457 h 2.8766 l -0.4137,2.8809 H 87.4352 V 20 h 4.9259 c 0.6735,0 1.2315,-0.5664 1.2315,-1.25 V 1.25 C 93.5926,0.566406 93.0346,0 92.3611,0 Z"
                fill="currentColor"
            />
        </g>
    </svg>
)
