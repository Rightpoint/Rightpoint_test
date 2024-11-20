import { FC } from 'react'
import ReactPlayer from 'react-player'
import { DebugLargePayloadStyles as s } from './DebugLargePayload.styles'
import faker from 'faker'

export interface DebugLargePayloadProps {}

export const DebugLargePayload: FC<DebugLargePayloadProps> = () => {
    return (
        <s.DebugLargePayload>
            DebugLargePayload
            <div>
                <ReactPlayer url="https://player.vimeo.com/video/502696604"></ReactPlayer>
                {faker.address.city()}
            </div>
        </s.DebugLargePayload>
    )
}
