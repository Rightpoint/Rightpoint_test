import dynamic from 'next/dynamic'
import type { Asset } from 'contentful'
import type { ImageProps } from './Image.component'
import { get } from 'lodash'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'
import fetch from 'cross-fetch'

type EntryCompat = { update(): any } // compat with Entry<any> used site-wide
export type ImageEntry = Asset & EntryCompat

export const ImageDynamic = dynamic(() =>
    import('./Image.component').then((mod) => mod.ImageWithAspect)
)

let loggedOnce
const logOnce = (message) => {
    if (!loggedOnce) {
        console.log(message)
        loggedOnce = true
    }
}

/**
 * Get placeholder image CSS properties from local API
 */
const getImagePlaceholderCss = async (url): Promise<Record<string, string>> => {
    try {
        let fqdn: string
        if (process.env.NEXT_PUBLIC_VERCEL_URL) {
            fqdn = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
        } else {
            // local
            if (process.env.NODE_ENV === 'development') {
                // don't run on local, is costly
                return null
            } else {
                // local production
                fqdn = 'http://localhost:3000'
            }
        }

        logOnce('Resolved FQDN: ' + fqdn)

        const response = await fetch(`${fqdn}/api/images/blur?imageUrl=${url}`)
        if (response.status >= 400) {
            throw new Error('Bad response from server')
        }
        const json = await response.json()
        return json.css
    } catch (ex) {
        return null
    }
}

export const imageMapperConfig = makeConfig<ImageEntry, ImageProps>({
    __mapperType: 'component',
    contentTypeId: 'image',
    component: ImageDynamic,
    entryToProps: async ({ entry, manager }) => {
        /**
         * Ensure plaiceholder image manipulation only ever runs on server.
         * our other method of using a serverless function is
         * faster though.. doing blur generation here causes us to download the entire image set
         * per build locally.
         */
        // const getImagePlaceholderCss = async (imageUrl) => {
        //     if (typeof window === 'undefined') {
        //         const { getPlaiceholder } = await import('plaiceholder')
        //         const absolute = imageUrl.replace('//', 'https://')
        //         const { css, img, base64 } = await getPlaiceholder(absolute)
        //         return {
        //             base64,
        //             css,
        //             // img,
        //         }
        //     }
        // }
        try {
            const { file, title } = entry.fields
            if (!file) {
                return {
                    src: 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=',
                    alt: 'Error finding image',
                    width: 160,
                    height: 90,
                }
            }
            const css = await getImagePlaceholderCss(file.url)
            return {
                src: file.url,
                alt: title,
                width: get(file, 'details.image.width'),
                height: get(file, 'details.image.height'),
                plaiceholder: {
                    cssProps: css,
                },
            }
        } catch (ex) {
            console.error(
                'Critical error mapping image to props:',
                get(entry, 'fields.title'),
                ':',
                ex?.message
            )
            return {
                src: 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=',
                alt: 'Error finding image',
                width: 160,
                height: 90,
            }
        }
    },
})
