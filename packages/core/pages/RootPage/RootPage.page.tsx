import { useRouter } from 'next/router'
import { FallbackLoading } from '@rightpoint/core/components'

interface RootPageProps {
    //
}
/**
 * WIP:
 * The idea is to wrap all pages with a RootPage, that handles common behavior like:
 * - Seo component
 * - Render Components
 */
export const RootPage = () => {
    // to do: page props should be handled differently.
    // we also need to handle json unsafe props immediately in page.
    // should there be a RootPage component
    // that handles default SEO, prepareJsonUnsafeProps, enables preview mode context, etc?
    // or should that be in the App.tsx?
    // the good thin about a root page is that it can transform props so that inner props are normal.
    // it can also add SEO by default.
    const router = useRouter()

    // TODO: standardize page props
    // TODO: parse unsafe json
    // TODO: isPreview context, any child component needs to know it's preview mode
    if (router.isFallback) {
        return <FallbackLoading />
    }

    return <></>
}
