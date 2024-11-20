import { FC } from 'react'
import { Components } from '@rightpoint/core/next-contentful-renderer'
import { merge } from 'lodash'
import { ContainerWidths } from '../RootComponent/container'
import { BackgroundColors } from '../RootComponent/background-color'
import type { ComponentPropsWithMeta } from '@rightpoint/core/next-contentful'
import type { RootComponentProps } from '../RootComponent/RootComponent.component'

export interface ComponentGroupProps {
    componentsProps: ComponentPropsWithMeta[]
    backgroundColor?: BackgroundColors
    container?: ContainerWidths

    removeFirstComponentMargin?: boolean
    removeLastComponentMargin?: boolean
}

export const ComponentGroup: FC<ComponentGroupProps> = ({
    componentsProps,
    backgroundColor,
    container,
    removeFirstComponentMargin,
    removeLastComponentMargin,
}) => {
    /**
     * All children of this container group are affected by parameters set on the group.
     *
     * That is its purpose: to override parameters for children involving spacing, backgrounds, containers, etc., without
     * requiring them to be duplicated in the contentful data. Duplication results in fragility.
     */
    const transformComponentsPropsWithLocalOverrides = (
        componentsProps: ComponentPropsWithMeta[]
    ) => {
        return componentsProps.map((componentPropsWithMeta, index) => {
            const rootProps: RootComponentProps = merge(
                componentPropsWithMeta.rootProps,
                {
                    background: {
                        backgroundColor,
                    },
                    container,

                    /**
                     * Remove first and last component margins if requested.
                     */
                    noMarginTop: removeFirstComponentMargin && index === 0,
                    noMarginBottom:
                        removeLastComponentMargin &&
                        index === componentsProps.length - 1,
                }
            )
            return {
                ...componentPropsWithMeta,
                rootProps,
            }
        })
    }
    return (
        <Components
            componentsProps={transformComponentsPropsWithLocalOverrides(
                componentsProps
            )}
        />
    )
}
