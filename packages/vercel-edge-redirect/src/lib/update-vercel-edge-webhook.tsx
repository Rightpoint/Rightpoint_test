import type { NextApiHandler } from 'next'
import fetch from 'cross-fetch'

import { NextResponse } from 'next/server'
import { get } from '@vercel/edge-config'

export const updateVercelEdgeWebhook: NextApiHandler = async (req, res) => {
    /**
     * https://vercel.com/docs/rest-api#introduction/api-basics/server-specs
     * Edge configs can be deleted/populated in one pass.
     * Limits are 500kb.
     *
     * Step 1: this is a webhook response that syncs ALL contentful redirect entries to an edge config.
     *
     * Query contentful  for all redirect entries
     * Create or path the edge config.
     *
     */
    // should be in env var

    // 'https://api.vercel.com/v1/edge-config/ecfg_dtfygs482goufthcz9pdkrkc1wqd/items?teamId=rightpoint';

    const edgeToken = 'N3LiJOTTdWfa7oDTQnaE0YpX'
    const edgeConfigId = `ecfg_dtfygs482goufthcz9pdkrkc1wqd`
    // const response = await fetch(
    //     `https://api.vercel.com/edge-config/${edgeConfigId}/items`,
    //     {
    //         body: {
    //             items: JSON.stringify([
    //                 {
    //                     foobar: '123',
    //                 },
    //             ]),
    //         },
    //         headers: {
    //             Authorization: `Bearer ${edgeToken}`,
    //         },
    //         method: 'patch',
    //     }
    // )
    // export const config = { matcher: '/welcome' }

    // https://vercel.com/dashboard/rightpoint/stores/edge-config/ecfg_c6b8qzaye8injnhsxoj5ertgqkzm/items get this working first.
    // const greeting = await get('greeting')

    const response = await fetch(
        `https://api.vercel.com/v1/edge-config/${edgeConfigId}`,
        {
            headers: {
                Authorization: `Bearer ${edgeToken}`,
            },
            method: 'get',
        }
    )
    console.log(response)

    // const response = await fetch(
    //     `https://api.vercel.com/edge-config/${edgeConfigId}/items`,
    //     {
    //         headers: {
    //             Authorization: `Bearer ${edgeToken}`,
    //         },
    //         method: 'get',
    //     }
    // )

    // console.log(response)
}

updateVercelEdgeWebhook(null, null)
