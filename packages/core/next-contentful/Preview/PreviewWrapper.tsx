import { useClientSafePreviewData } from './use-client-safe-preview-data'
import { PreviewWrapperStyles as s } from './PreviewWrapper.styles'
import { ComponentType, ReactNode } from 'react'
import { FiEdit } from 'react-icons/fi'
import { SiStorybook, SiContentful } from 'react-icons/si'
import { MapperProps } from '../mappers/all-mappers/mapper.interface'

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
    prefix = 'Contentful: ',
    mapperProps,
}: {
    children?: ReactNode
    useComposeUrl?: boolean
    title?: string
    prefix?: string
    mapperProps: MapperProps
}) => {
    const previewData = useClientSafePreviewData()
    const href = getContentfulHref(useComposeUrl, mapperProps, previewData)

    return (
        <s.Link href={href} rel="noreferrer" target="_blank" title={title}>
            <s.Icon>
                <SiContentful size={16} />
            </s.Icon>
            {prefix}
            {excerpt(mapperProps.__entryName)}
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
    const previewData = useClientSafePreviewData()

    if (previewData.__isPreview) {
        return (
            <s.PreviewWrapper>
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
