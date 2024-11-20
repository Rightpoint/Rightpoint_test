import dynamic from 'next/dynamic'
import { EntryFields, Entry, Asset } from 'contentful'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'

export type DebugLargePayloadEntryFields = {
    //
}

export type DebugLargePayloadEntry = Entry<DebugLargePayloadEntryFields>

/**
 * Dynamic import chunks runtime components
 */
export const DebugLargePayloadDynamic = dynamic(
    () =>
        import('./DebugLargePayload.component').then(
            (mod) => mod.DebugLargePayload
        ),
    {
        // ssr: false, // SSR: false -- does NOT render on initial HTML response. Client side chunk downloads deferred after main bundle.
        // ssr: true, // SSR: true -- DOES render on initial page load in HTML response. Client side chunk downloads, then queued immediately on page load.
    }
)

export const DebugLargePayloadDynamicNoSSR = dynamic(
    () =>
        import('./DebugLargePayload.component').then(
            (mod) => mod.DebugLargePayload
        ),
    {
        ssr: false,
    }
)

export const debugLargePayloadMapperConfig = makeConfig({
    __mapperType: 'component',
    contentTypeId: 'DebugLargePayloadComponent',
    component: DebugLargePayloadDynamic,
})
