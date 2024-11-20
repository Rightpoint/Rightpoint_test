import type { Entry } from 'contentful'
import type { ComponentType } from 'react'
import type { CardProps, RootComponentProps } from '@rightpoint/core/components'
import type { ConfigManagerType } from '../mappers/registry/all-configs'
import type { GetStaticPropsContext } from 'next'
import type { MapperProps } from '../mappers/all-mappers/mapper.interface'
import type { SeoProps } from '../../pages'

/**
 * Components and pages may reference Storybook directly
 * as the single source of truth for admin documentation.
 */
export type StorybookConfig = {
    path?: string
}

export type MapEntryTo<
    E extends Entry<any> = Entry<any>,
    P = Record<any, any>
> = ({
    entry,
    manager,
}: {
    entry: E
    manager: ConfigManagerType

    // only on page mapper. Should we have different types?
    // maybe page mappers/component mappers should be entirely separated
    nextContext?: GetStaticPropsContext<any, any>
}) => Promise<P>

export type TransformProps<In, Out> = ({
    props,
    manager,
}: {
    props: In & {
        transitoryProps?: Record<string, any>
    }
    manager: ConfigManagerType
}) => Out

export type Config<E extends Entry<any> = Entry<any>, P = Record<any, any>> =
    | PageMapperConfig<E, P>
    | ComponentMapperConfig<E, P>

export type ComponentMapperConfig<E extends Entry<any>, P> = {
    __mapperType: 'component'
    contentTypeId: string
    component: ComponentType

    entryToProps?: MapEntryTo<E, P>
    entryToRootProps?: MapEntryTo<E, RootComponentProps>
    entryToMapperProps?: MapEntryTo<E, Partial<MapperProps>>
    prepareJsonUnsafeProps?: TransformProps<P, P>
}

export type PageMapperConfig<E extends Entry<any>, P> = {
    __mapperType: 'page'
    contentTypeId: string

    excludeFromSitemap?: boolean
    /**
     * Page helpers
     */
    slugFieldName: string
    slugContextName: string
    seoFieldName: string
    urlBasePath: string

    // todo: restrict to NextPage?
    component: ComponentType

    entryToProps?: MapEntryTo<E, P>
    entryToRootProps?: MapEntryTo<E, RootComponentProps>
    entryToCardProps?: MapEntryTo<E, CardProps>
    entryToSeoProps?: MapEntryTo<E, Partial<SeoProps>>
    entryToMapperProps?: MapEntryTo<E, Partial<MapperProps>>
    /**
     * Optional URL resolver if not base path + slug
     */
    entryToUrl?: ({
        entry,
        manager,
    }: {
        entry: E
        manager: ConfigManagerType
    }) => Promise<string>
    prepareJsonUnsafeProps?: TransformProps<P, P>
}
