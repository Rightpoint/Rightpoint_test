import path from 'path'
import { getAbsoluteDomainUrl, PageNotFoundError } from '@rightpoint/core/utils'
import { revalidate } from '@rightpoint/core/variables'
import type { GetStaticPropsResult, GetStaticPropsContext } from 'next'
import type { PageMapper } from '@rightpoint/core/next-contentful/mappers/all-mappers/page.mapper'

type RedirectOptions = {
    context: GetStaticPropsContext<any, any>
    redirectTo: string
    mapper: PageMapper<any, any>
}

/**
 * Helper to catch PageNotFound exceptions and return a 404
 * or if options provided, redirect to relevant URL with in-url 404 tracking ?404=1234 for analytics
 
 * Example:
 * /work/non-existent-page -> /work/browse/all?404=-work-non-existent-page
 */
export const getStaticProps404RedirectHelper = async (
    fn: () => Promise<GetStaticPropsResult<any>>,
    options?: {
        show404?: boolean
        redirect?: RedirectOptions
    }
): Promise<GetStaticPropsResult<any>> => {
    try {
        /**
         * Run the prop getter function.
         */
        return await fn()
    } catch (ex) {
        /**
         * Catch the PageNotFoundError and either
         * - 404
         * - or redirect to a related page with a 404 breadcrumb
         */
        if (ex instanceof PageNotFoundError) {
            if (!options || options.show404) {
                return {
                    notFound: true,
                    revalidate: revalidate.notFound,
                }
            }
            if (options.redirect) {
                return redirectToRelatedRootWith404Breadcrumb({
                    redirectOptions: options.redirect,
                })
            }
        }
        /**
         * Otherwise, throw the exception for logging etc.
         */
        throw ex
    }
}

/**
 * Redirect to a related page with a 404 breadcrumb
 * that can be found in analytics + frequency
 *  */
function redirectToRelatedRootWith404Breadcrumb({
    redirectOptions,
}: {
    redirectOptions: RedirectOptions
}) {
    /**
     * If no mapper provided, we cannot extract params url or base path reliably.
     * Simply redirect to the desired path.
     */
    if (!redirectOptions?.mapper) {
        return {
            redirect: {
                destination: redirectOptions.redirectTo,
                permanent: false,
            },
            revalidate: revalidate.notFound,
        }
    }

    try {
        const { mapper, redirectTo, context } = redirectOptions
        /**
         * Construct the url to preserve redirection.
         * - We cannot use mapper.entryToUrl() for more advanced urls because the entry doesn't exist
         * - The info should be enough to track in analytics / importance of specifically redirecting.
         * We can however, estimate the url reached by using the urlBasePath.
         */

        // get the Next.js slug param context name
        const slugContextName = mapper.config.slugContextName
        const slug = context.params[slugContextName]
        const bestGuessSourceUrl = mapper.config.urlBasePath + slug
        const destination = constructUrlFromPaths(
            [redirectTo],
            bestGuessSourceUrl
        )

        return {
            redirect: {
                destination,
                permanent: false,
            },
            revalidate: revalidate.notFound,
        }
    } catch (ex) {
        /**
         * If exception here, just redirect to the desired path.
         */
        console.error(
            'Error redirecting with source data.',
            redirectOptions.redirectTo,
            ex
        )
        // todo: maybe json stringify the error?
        const destination = constructUrlFromPaths(
            [redirectOptions.redirectTo],
            'unknown'
        )
        return {
            redirect: {
                destination,
                permanent: false,
            },
            revalidate: revalidate.notFound,
        }
    }
}

function constructUrlFromPaths(paths: string[], sourceUrl) {
    const urlObj = new URL(path.join(...paths), getAbsoluteDomainUrl())
    urlObj.searchParams.append('404', convertSlashToURLFriendlyDash(sourceUrl))
    const destination = urlObj.href
    return destination
}

/**
 * Remove the / url encoding to see it easily in analytics
 */
function convertSlashToURLFriendlyDash(str: string) {
    if (str.startsWith('/')) {
        str = str.slice(1)
    }
    return str.replace(/\//g, '-')
}
