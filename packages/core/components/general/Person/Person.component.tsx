import { FC } from 'react'
import { MultiMediaProps } from '../MultiMedia/MultiMedia.component'

export interface PersonProps {
    name: string
    jobTitle: string
    multiMediaProps?: MultiMediaProps
}

export const Person: FC<PersonProps> = () => {
    return <>No person detail page exists currently.</>
}
