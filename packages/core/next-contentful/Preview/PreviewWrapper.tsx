import { useClientSafePreviewData } from './use-client-safe-preview-data'
import { PreviewWrapperStyles as s } from './PreviewWrapper.styles'
import { ComponentType, ReactNode, useEffect, useState } from 'react'
import { SiStorybook } from 'react-icons/si'
import type { MapperProps } from '../mappers/all-mappers/mapper.interface'
import { ContentfulLivePreview } from '@contentful/live-preview'
import '@contentful/live-preview/style.css'

type PreviewData = ReturnType<typeof useClientSafePreviewData>

function getContentfulHref(
    useComposeUrl: boolean,
    mapperProps: MapperProps,
    previewData: PreviewData // used for overriding environment
) {
    const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
    // get environment from environment variables, or overridden previewData if client is previewing different environment
    const environment =
        previewData.__contentfulEnvironmentOverride ||
        process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT

    const optionalEnv =
        environment === 'master' ? '' : `environments/${environment}/`

    const href = useComposeUrl
        ? `https://compose.contentful.com/spaces/${spaceId}/${optionalEnv}page/${mapperProps.__entryId}`
        : `https://app.contentful.com/spaces/${spaceId}/${optionalEnv}entries/${mapperProps.__entryId}`
    return href
}

const excerpt = (text: string, max = 15) => {
    if (text?.length > max) {
        return text.slice(0, max) + '...'
    }
    return text
}

export const PreviewContentfulLink = ({
    useComposeUrl = false,
    title = undefined,
    prefix = 'Edit in New Tab',
    mapperProps,
    name = 'Name: ',
}: {
    children?: ReactNode
    useComposeUrl?: boolean
    title?: string
    prefix?: string
    mapperProps: MapperProps
    name?: string
}) => {
    const previewData = useClientSafePreviewData()
    const href = getContentfulHref(useComposeUrl, mapperProps, previewData)

    return (
        <s.Link href={href} rel="noreferrer" target="_blank" title={title}>
            <s.Prefix>{prefix}</s.Prefix>
            <s.Name>
                {name && <s.Label>{name} </s.Label>}
                {excerpt(mapperProps.__entryName, 50)}
            </s.Name>
        </s.Link>
    )
}

export const PreviewStorybookLink = ({
    mapperProps,
}: {
    children?: ReactNode
    useComposeUrl?: boolean
    title?: string
    prefix?: string
    mapperProps: MapperProps
}) => {
    if (mapperProps.storybook) {
        const { storybook } = mapperProps
        return (
            <s.Link
                href={'http://localhost:8001/' + storybook.path}
                rel="noreferrer"
                target="_blank"
            >
                <s.Icon>
                    <SiStorybook size={16} />
                </s.Icon>
                {storybook.label || 'Storybook'}
            </s.Link>
        )
    }

    return null
}

export const PreviewWrapper = ({
    children = null,
    mapperProps,
}: {
    children?: React.ReactNode
    mapperProps: MapperProps
}) => {
    /**
     * we may sometimes be double checking the preview mode but this is
     * because the PreviewWrapper may be set from many different places
     */
    const previewData = useClientSafePreviewData()
    if (previewData.__isPreview) {
        return (
            <s.PreviewWrapper
                // NOTE: attempting to lazily load this via import() caused build issues 04/2024
                {...ContentfulLivePreview.getProps({
                    entryId: mapperProps.__entryId,
                    fieldId: 'ANYTHING_TO_ENABLE_ENTRY_LEVEL_EDIT',
                    locale: 'en-US',
                })}
            >
                <s.PreviewLinks>
                    <PreviewContentfulLink mapperProps={mapperProps} />
                    <PreviewStorybookLink mapperProps={mapperProps} />
                </s.PreviewLinks>
                {children}
            </s.PreviewWrapper>
        )
    }
    return <>{children}</>
}

/**
 * HOC that adds a preview link to the component.
 */
export const withPreview = <C extends ComponentType>(Component: C) => {
    const Wrapped = (props): C | JSX.Element => {
        const { __isPreview } = useClientSafePreviewData()
        if (__isPreview) {
            return (
                <PreviewContentfulLink mapperProps={props.mapperProps}>
                    <Component {...props} />
                </PreviewContentfulLink>
            )
        }
        return <Component {...props} />
    }
    return Wrapped
}
