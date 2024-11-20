import dynamic from 'next/dynamic'
import type { EntryFields, Entry, Asset } from 'contentful'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import type { JobsListProps } from './JobsList.component'

/**
 * Contentful entry types
 */
export type JobsListEntryFields = {
    internalName: EntryFields.Text
}

export type JobsListEntry = Entry<JobsListEntryFields>

/**
 * Dynamic import chunks runtime components
 */
export const JobsListDynamic = dynamic(() =>
    import('./JobsList.component').then((mod) => mod.JobsList)
)

export const jobsListMapperConfig = makeConfig<JobsListEntry, JobsListProps>({
    __mapperType: 'component',
    component: JobsListDynamic,
    contentTypeId: 'jobsList',
    entryToProps: async ({ entry, manager }) => {
        const {} = entry.fields
        /**
         * Jobs list queries are handled client-side to ensure that the endpoint does not get overwhelmed with requests.
         *
         * While endpoints are cached per build instance, many builds (i.e. 10 commits, 2 simultaneous PRs, etc.) would cause many concurrent
         * builds, and thus requests to JobVite, and trigger their extreme rate limit/blocking.
         */
        return {}
    },
    // entryToRootProps: async ({ entry}) => {
    //    return {}
    // },
})

// const getFqdn = () => {
//     let fqdn
//     if (process.env.NEXT_PUBLIC_VERCEL_URL) {
//         fqdn = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
//     } else {
//         // local
//         if (process.env.NODE_ENV === 'development') {
//             fqdn = 'http://localhost:8000'
//         } else {
//             // local production
//             fqdn = 'http://localhost:3000'
//         }
//     }
//     return fqdn
// }
