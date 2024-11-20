import React, { FC, Fragment, ReactElement, ReactNode } from 'react'
import { RootComponent, RootComponentProps } from '@rightpoint/core/components'
import { getConfigsManager } from '../next-contentful/mappers/registry/all-configs'
import { ErrorBoundary } from '../utils/components/ErrorBoundary'
import { PreviewWrapper } from '../next-contentful/Preview/PreviewWrapper'
import {
    ComponentPropsWithMeta,
    MapperProps,
} from '../next-contentful/mappers/all-mappers/mapper.interface'

type Transformer = {
    transformRootProps?: (
        rootProps: RootComponentProps,
        props?: any
    ) => RootComponentProps
    transformProps?: (props: ComponentPropsWithMeta) => ComponentPropsWithMeta
}

function getTransformer(contentTypeId: string, transformers): Transformer {
    let transformer = transformers[contentTypeId]
    if (!transformer) {
        // if none found, check for the wildcard
        transformer = transformers['*']
    }
    if (!transformer) {
        return {
            transformRootProps: null,
            transformProps: null,
        }
    }
    return {
        transformRootProps: transformer.transformRootProps,
        transformProps: transformer.transformProps,
    }
}
interface ComponentsProps {
    componentsProps: ComponentPropsWithMeta[]
    removeFirstLastSpacing?: boolean
    injectComponents?: {
        [key: number]: ReactElement
    }
    transformers?: {
        [contentTypeId: string]: Transformer
    }
}
export const Components: FC<ComponentsProps> = ({
    componentsProps = [],
    removeFirstLastSpacing = false,
    transformers = {},
    injectComponents = {},
}) => {
    if (!componentsProps) {
        return null
    }
    return (
        <>
            {componentsProps.map(
                ({ mapperProps, rootProps, componentProps }, index) => {
                    /**
                     *  Handle prop transformers which may modify props before rendering
                     *  on a per implementation context basis.
                     *
                     *  Use case:
                     *  - Alter root component backgrounds based on page level background color info.
                     *       Components on the Work pages need a consistent BG color specified by parent,
                     *       some of its children (Quote, Impact) may be used in multiple pages, yet need a particular BG color on one page.
                     *  - Alter root component grid sizing to modify layout for specific components.
                     */

                    const { transformProps, transformRootProps } =
                        getTransformer(
                            mapperProps.__contentTypeId,
                            transformers
                        )

                    const mapper = getConfigsManager().getComponentMapper(
                        mapperProps.__contentTypeId
                    )

                    const Component = mapper.config.component
                    if (!Component) {
                        return (
                            <Fragment key={index}>
                                No component found:{' '}
                                <div>{mapper.config.contentTypeId}</div>
                            </Fragment>
                        )
                    }

                    /**
                     * Prepare JSON unsafe props. Incoming props are alway JSON safe.
                     * However, some components require JSON unsafe props.
                     *
                     * Example:
                     * - Contentful rich text document to React.
                     * - Dynamic Component props.
                     */
                    const props = mapper.prepareJsonUnsafeProps(componentProps)

                    return (
                        <Fragment key={index}>
                            {injectComponents[index] && injectComponents[index]}
                            <DynamicComponent
                                key={index}
                                index={index}
                                totalCount={componentsProps.length}
                                removeFirstLastSpacing={removeFirstLastSpacing}
                                rootProps={
                                    transformRootProps
                                        ? transformRootProps(rootProps, props)
                                        : rootProps
                                }
                                mapperProps={mapperProps}
                            >
                                <Component
                                    {...(transformProps
                                        ? transformProps(props)
                                        : props)}
                                />
                            </DynamicComponent>
                        </Fragment>
                    )
                }
            )}
        </>
    )
}

interface DynamicComponentProps {
    index: number
    totalCount: number
    removeFirstLastSpacing: boolean
    rootProps: RootComponentProps
    mapperProps: MapperProps
    children?: ReactNode
}
export const DynamicComponent: FC<DynamicComponentProps> = ({
    index,
    totalCount,
    removeFirstLastSpacing,
    children,
    rootProps,
    mapperProps,
}) => {
    return (
        <ErrorBoundary>
            <RootComponent
                index={index}
                totalCount={totalCount}
                removeFirstLastSpacing={removeFirstLastSpacing}
                {...rootProps}
            >
                <PreviewWrapper mapperProps={mapperProps}>
                    {children}
                </PreviewWrapper>
            </RootComponent>
        </ErrorBoundary>
    )
}
