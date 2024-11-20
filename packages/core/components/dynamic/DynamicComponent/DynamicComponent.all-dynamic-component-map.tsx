import dynamic from 'next/dynamic'
import { ComponentType } from 'react'
import { Config } from '@rightpoint/core/next-contentful/configs/config.types'
import { omit } from 'lodash'

export enum DynamicComponentType {
    Invalid = 'Invalid',
    MapperException = 'MapperException',

    JobsList = 'JobsList',

    SolutionsAnimation = 'SolutionsAnimation',
    // LeadershipGrid = 'LeadershipGrid',
    // ScrollZoom = 'ScrollZoom',

    Test = 'Test',
}
type DynamicComponents = {
    [key in DynamicComponentType]: {
        Component: ComponentType<unknown>
        lazyGetMapper?: () => Promise<Config>
    }
}

export const dynamicComponents: DynamicComponents = {
    // dynamic components use brittle JSON fields and may fail.
    [DynamicComponentType.Test]: {
        Component: dynamic(() =>
            import('./dynamic-components/DynamicTest/DynamicTest').then(
                (mod) => mod.DynamicTest
            )
        ),
    },
    [DynamicComponentType.MapperException]: {
        Component: (props: any) => (
            <div
                style={{
                    padding: 20,
                }}
            >
                <p>
                    Dynamic mapper exception. This is likely due to bad JSON
                    from the CMS as its shape cannot be enforced.
                </p>

                <ul>
                    <li>Getting the lazy mapper</li>
                    <li>Getting props from mapper</li>
                </ul>
                <p>Props: {JSON.stringify(omit(props, 'error'))}</p>
                <p>Error:</p>
                <pre
                    dangerouslySetInnerHTML={{
                        __html: props.error.replaceAll('\\n', '<br/>'),
                    }}
                />
            </div>
        ),
    },
    [DynamicComponentType.Invalid]: {
        Component: () => <div>Dynamic Component: not a valid type.</div>,
    },
    [DynamicComponentType.SolutionsAnimation]: {
        Component: dynamic(() =>
            import(
                './dynamic-components/SolutionsAnimation/SolutionsAnimation.component'
            ).then((mod) => mod.SolutionsAnimation)
        ),
    },
    [DynamicComponentType.JobsList]: {
        Component: dynamic(() =>
            import('./dynamic-components/JobsList/JobsList.component').then(
                (mod) => mod.JobsList
            )
        ),
        lazyGetMapper: () =>
            import('./dynamic-components/JobsList/JobsList.contentful').then(
                (mod) => mod.jobsListMapperConfig
            ),
    },
}
