import { FC } from 'react'
import { ComponentPropsWithMeta } from '@rightpoint/core/next-contentful'
import { Components } from '@rightpoint/core/next-contentful-renderer'
import { BackgroundColors } from '../RootComponent/background-color'
import { merge } from 'lodash'
import { ContainerWidths } from '../RootComponent/container'

export interface ComponentGroupProps {
    componentsProps: ComponentPropsWithMeta[]
    backgroundColor?: BackgroundColors
    container?: ContainerWidths
}

export const ComponentGroup: FC<ComponentGroupProps> = ({
    componentsProps,
    backgroundColor,
    container,
}) => {
    return (
        <Components
            componentsProps={componentsProps}
            transformers={{
                '*': {
                    transformRootProps: (rootProps) => {
                        const props = merge(rootProps, {
                            background: {
                                backgroundColor,
                            },
                            container,
                        })
                        return props
                    },
                },
            }}
        />
    )
}
