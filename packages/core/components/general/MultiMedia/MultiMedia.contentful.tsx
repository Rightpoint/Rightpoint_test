import dynamic from 'next/dynamic'
import { EntryFields, Entry, Asset } from 'contentful'
import {
    MultiMedia,
    MultiMediaProps,
    MultiMediaTypes,
} from './MultiMedia.component'
import { makeConfig } from '@rightpoint/core/next-contentful/configs/make-config'

type AssetEntryCompatible =
    | Asset
    | {
          update: any
      }

export type MultiMediaEntryFields = {
    internalTitle?: EntryFields.Text
    image?: AssetEntryCompatible
    image2?: AssetEntryCompatible
    imageMobile?: AssetEntryCompatible
    videoUrl?: EntryFields.Text
    /**
     * @deprecated - not implemented.
     * TODO: implement support for MP4 video for preview videos especially.
     */
    videoFile?: AssetEntryCompatible
    videoAutoplay?: EntryFields.Boolean
    videoShowUnmute?: EntryFields.Boolean
    videoLoop?: EntryFields.Boolean
    videoPosterMultiMedia?: MultiMediaEntry
    // mobile image
    // portrait image
    // landscape image
    // crop focus
}

export type MultiMediaEntry = Entry<MultiMediaEntryFields>

/**
 * Dynamic import chunks runtime components
 */
export const MultiMediaDynamic = dynamic(() =>
    import('./MultiMedia.component').then((mod) => mod.MultiMedia)
)

export const multiMediaMapperConfig = makeConfig<
    MultiMediaEntry,
    MultiMediaProps
>({
    __mapperType: 'component',
    contentTypeId: 'multiMedia',
    component: MultiMedia,
    entryToProps: async ({ entry, manager }) => {
        const {
            videoUrl,
            videoAutoplay,
            videoShowUnmute,
            videoLoop,
            videoPosterMultiMedia,
        } = entry.fields
        if (videoUrl) {
            return {
                aspectWrapperRatio: 16 / 9,
                mediaType: MultiMediaTypes.VIDEO,
                mediaProps: {
                    videoUrl,
                    showUnmute: videoShowUnmute,
                    autoPlay: videoAutoplay ?? true,
                    loop: videoLoop ?? true,
                    posterMultiMediaProps: {
                        ...(await manager.getProps(videoPosterMultiMedia, {
                            restrictToContentTypes: ['multiMedia'],
                        })),
                    },
                },
            }
        }
        const { image, imageMobile, image2 } = entry.fields
        if (image && image2) {
            return {
                mediaType: MultiMediaTypes.ANIMATED_IMAGES,
                mediaProps: {
                    images: [
                        (await manager
                            .getComponentMapper(image)
                            .getProps()) as any,
                        (await manager
                            .getComponentMapper(image2)
                            .getProps()) as any,
                    ],
                },
            }
        }
        return {
            mediaType: MultiMediaTypes.IMAGE,
            mediaProps: (await manager
                .getComponentMapper(image)
                .getProps()) as any,
        }
    },
})
