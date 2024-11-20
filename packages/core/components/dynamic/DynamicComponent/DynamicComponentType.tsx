import dynamic from 'next/dynamic'
import { ComponentType } from 'react'
import { Config } from '@rightpoint/core/next-contentful/configs/config.types'
import { omit } from 'lodash'

export enum DynamicComponentType {
    Fallback = 'Fallback',
    MapperException = 'MapperException',
    Test = 'Test',
    FloatingImageText = 'FloatingImageText',
    LeadershipGrid = 'LeadershipGrid',
    ScrollZoom = 'ScrollZoom',
    JobsList = 'JobsList',
}
type DynamicComponents = {
    [key in DynamicComponentType]: {
        Component: ComponentType<unknown>
        lazyGetMapper?: () => Promise<Config>
    }
}

export const dynamicComponents: DynamicComponents = {
    // dynamic components use brittle JSON fields and may fail.
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
    [DynamicComponentType.Fallback]: {
        Component: () => <div>Dynamic Component: not a valid type.</div>,
    },
    [DynamicComponentType.Test]: {
        Component: dynamic(() =>
            import('./dynamic-components/DynamicTest/DynamicTest').then(
                (mod) => mod.DynamicTest
            )
        ),
    },
    [DynamicComponentType.FloatingImageText]: {
        Component: dynamic(() =>
            import(
                './dynamic-components/FloatingImageText/FloatingImageText.component'
            ).then((mod) => mod.FloatingImageTextComposed)
        ),
        lazyGetMapper: () =>
            import(
                './dynamic-components/FloatingImageText/FloatingImageText.contentful'
            ).then((mod) => mod.floatingImageTextMapperConfig),
    },
    [DynamicComponentType.LeadershipGrid]: {
        Component: dynamic(() =>
            import('./dynamic-components/PeopleGrid/PeopleGrid.component').then(
                (mod) => mod.PeopleGrid
            )
        ),
        lazyGetMapper: () =>
            import(
                './dynamic-components/PeopleGrid/PeopleGrid.contentful'
            ).then((mod) => mod.peopleGridMapperConfig),
    },
    [DynamicComponentType.ScrollZoom]: {
        Component: dynamic(() =>
            import('./dynamic-components/ScrollZoom/ScrollZoom.component').then(
                (mod) => mod.ScrollZoom
            )
        ),
        lazyGetMapper: () =>
            import(
                './dynamic-components/ScrollZoom/ScrollZoom.contentful'
            ).then((mod) => mod.scrollZoomMapperConfig),
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
