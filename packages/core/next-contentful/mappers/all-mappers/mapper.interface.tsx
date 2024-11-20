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
    noNavbar?: boolean // some pages (homepage) set the navbar themselves.
}

export interface AllPageProps<P> {
    mapperProps: MapperProps
    pageProps: P
    pageGlobalsProps?: GlobalPageProps
    seoProps?: Partial<SeoProps>
    cardProps?: CardProps
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
    getPageProps(): Promise<AllPageProps<P>>
    getPageGlobalsProps?(): Promise<GlobalPageProps>
    getCardProps(): Promise<CardProps>
    getSeoProps(): Promise<Partial<SeoProps>>

    getUrl(): Promise<string>
}
