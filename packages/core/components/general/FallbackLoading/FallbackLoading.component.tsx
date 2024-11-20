import { FC } from 'react'
import { FallbackLoadingStyles as s } from './FallbackLoading.styles'

export interface FallbackLoadingProps {}

export const FallbackLoading: FC<FallbackLoadingProps> = () => {
    return <s.FallbackLoading>{/* loading graphic */}</s.FallbackLoading>
}
