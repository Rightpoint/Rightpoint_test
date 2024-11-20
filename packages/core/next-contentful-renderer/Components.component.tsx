import { FC, Fragment } from 'react'
import { RootComponent, RootComponentProps } from '@rightpoint/core/components'
// import { getConfigsManager } from '../next-contentful/mappers/registry/all-configs'
import { ErrorBoundary } from '../utils/components/ErrorBoundary'
import { PreviewWrapper } from '../next-contentful/Preview/PreviewWrapper'
import type { ComponentPropsWithMeta } from '../next-contentful/mappers/all-mappers/mapper.interface'
import { getContentTypeToComponentMap } from '../next-contentful/mappers/registry-client/all-content-type-to-components'

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
    removeSpacing?: {
        first?: boolean
        last?: boolean
    }
    transformers?: {
        [contentTypeId: string]: Transformer
    }
}
export const Components: FC<ComponentsProps> = ({
    componentsProps = [],
    removeFirstLastSpacing = false,
    removeSpacing = {},
    transformers = {},
}) => {
    if (!componentsProps) {
        return null
    }
    return (
        // keep this fragment for typescript type
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

                    // const mapper = getConfigsManager().getComponentMapper(
                    //     mapperProps.__contentTypeId
                    // )

                    // const Component = mapper.config.component
                    const Component =
                        getContentTypeToComponentMap()[
                            mapperProps.__contentTypeId
                        ]

                    if (!Component) {
                        return (
                            <Fragment key={index}>
                                No component found:{' '}
                                <div>{mapperProps.__contentTypeId}</div>
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
                    const props = componentProps

                    /**
                     * Get root props from either the entryToRootProps helper
                     * or extract from props.rootProps.
                     */
                    const getRootProps = (props) => {
                        if (props.rootProps) {
                            return props.rootProps
                        }
                        return rootProps
                    }

                    const rootProps_ = getRootProps(props)

                    const componentPropsToApply = {
                        // we can have one last chance to
                        ...(transformProps ? transformProps(props) : props),
                    }
                    const rootPropsToApply = rootProps_
                        ? // if root props
                          transformRootProps
                            ? // if root props + transformer
                              transformRootProps(rootProps_, props)
                            : // otherwise return root props
                              rootProps_
                        : null

                    /**
                     * If there's a component group, we should expand the
                     * component without wrapping.
                     */

                    return (
                        <Fragment key={index}>
                            <ErrorBoundary>
                                <RootComponent
                                    removeFirstLastSpacing={
                                        removeFirstLastSpacing
                                    }
                                    {...rootPropsToApply}
                                    listMeta={{
                                        index,
                                        isFirst: index === 0,
                                        isLast:
                                            index ===
                                            componentsProps.length - 1,
                                        totalCount: componentsProps.length,
                                    }}
                                >
                                    <PreviewWrapper mapperProps={mapperProps}>
                                        <Component {...componentPropsToApply} />
                                    </PreviewWrapper>
                                </RootComponent>
                            </ErrorBoundary>
                        </Fragment>
                    )
                }
            )}
        </>
    )
}
