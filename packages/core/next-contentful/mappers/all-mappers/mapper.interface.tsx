import type { CardProps } from '@rightpoint/core/components'
import type { RootComponentProps } from '@rightpoint/core/components'
import type { Entry } from 'contentful'
import type { SeoProps } from '@rightpoint/core/pages'

export type MapperProps = {
    __contentTypeId: string
    __entryId: string
    __entryName?: string

    storybook?: {
        path?: string
        label?: string
    }
}

export interface ComponentPropsWithMeta<P = any> {
    mapperProps: MapperProps
    componentProps: P
    rootProps?: RootComponentProps
}

export type GlobalPageProps = {
    __isPreview?: boolean
    __contentfulEnvironmentOverride?: string | null
    offices?: CardProps[] // TODO: used in global footer city list
}

export type IsSanitizedToken = {
    __sanitized: true
}

export interface AllPageProps<P> {
    mapperProps: MapperProps & IsSanitizedToken
    pageProps: P // TODO: TS: Don't know how to ensure this has a IsSanitizedToken given generic response overrides
    pageGlobalsProps?: GlobalPageProps & IsSanitizedToken
    seoProps?: Partial<SeoProps> & IsSanitizedToken
    cardProps?: CardProps & IsSanitizedToken
}
export interface MapperInterface<P> {
    entry?: Partial<Entry<any>>
    Component: React.ComponentType<any>
    getMapperProps(): Promise<MapperProps>
}

export interface ComponentMapperInterface<P> extends MapperInterface<P> {
    getProps?(): Promise<P>
    getRootProps?(): Promise<RootComponentProps>
    getComponentPropsWithMeta(): Promise<ComponentPropsWithMeta<P>>
}
export interface PageMapperInterface<P> extends MapperInterface<P> {
    getProps?(): Promise<P>
    getPageProps(): Promise<AllPageProps<P>> // TODO: TS: Don't know how to ensure this doesn't have a IsSanitizedToken
    getPageGlobalsProps?(): Promise<GlobalPageProps>
    getCardProps(): Promise<CardProps>
    getSeoProps(): Promise<Partial<SeoProps>>

    getUrl(): Promise<string>
}
