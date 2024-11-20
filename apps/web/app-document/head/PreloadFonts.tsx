/**
 * Note: preload fonts conflicts with bundled font names.
 * It will duplicate downloaded fonts.
 *
 * Next.js font optimization does not support self hosted fonts.
 * https://nextjs.org/docs/basic-features/font-optimization
 *
 * Implementation requires webpack file loader to resolve chunk names.
 *
 * Hints here:
 * https://stackoverflow.com/questions/63023946/preload-custom-font-with-next-js
 */

const fontsToPreload = [
    {
        href: '/fonts/riforma/RiformaLLSub-Light.woff2',
        type: 'font/woff2',
    },
    {
        href: '/fonts/riforma/RiformaLLSub-Regular.woff2',
        type: 'font/woff2',
    },
    {
        href: '/fonts/reckless/RecklessNeue-Book.woff2',
        type: 'font/woff2',
    },
    {
        href: '/fonts/riforma/RiformaLLSub-Regular.woff2',
        type: 'font/woff2',
    },
]
export const PreloadFonts = () => {
    console.warn('Font preload is not ready. See comment.')
    return null
    return (
        <>
            {fontsToPreload.map((font) => (
                <link
                    rel="preload"
                    as="font"
                    href={font.href}
                    type={font.type}
                    key={font.href}
                />
            ))}
        </>
    )
}
