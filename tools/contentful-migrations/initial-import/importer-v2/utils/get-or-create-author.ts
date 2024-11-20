import { PersonEntry } from '@rightpoint/core/components'
import * as contentful from 'contentful-management'
import { get } from 'lodash'
import { createOrUpdateEntry } from './create-or-update-entry'
import { deterministicId } from './deterministic-id'
import { getClientEnvironment } from './get-client-environment'

export const getOrCreatePerson = async (
    {
        name,
        jobTitle,
    }: {
        name: string
        jobTitle: string
    } = {
        name: undefined,
        jobTitle: undefined,
    }
) => {
    if (!name) {
        console.log('No author found')
        return null
    }
    const environment = await getClientEnvironment()

    // search
    const results = await environment.getEntries({
        content_type: 'person',
        'fields.name': name,
    })

    console.log('Author result:', results?.items?.[0])
    let personEntry = get(results, 'items[0]')
    if (!personEntry) {
        console.log("Person doesn't exist matching name. Creating...")
        const fields: PersonEntry['fields'] = {
            internalName: `Person/${name}`,
            name: name,
            jobTitle: jobTitle,
        }

        personEntry = await createOrUpdateEntry({
            environment,
            contentTypeId: 'person',
            // in this case, we don't really need a deterministic versioned id, we just want to update or save it.
            id: deterministicId('person', name, jobTitle || ''),
            fields,
        })
    }

    console.log('Done handling person')
    console.log(' ')
    return personEntry
}
