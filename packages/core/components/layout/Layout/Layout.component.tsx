import { FC, ReactNode, useContext, useEffect, useRef } from 'react'
import { Footer } from '../Footer/Footer.component'
import { LayoutStyles as s } from './Layout.styles'
import { Navbar } from '../Navbar/Navbar.component'
import dynamic from 'next/dynamic'
import whatInput from 'what-input'
import { GlobalContext } from '@rightpoint/core/context'
import { useIsomorphicLayoutEffect } from 'framer-motion'
import { footerGenerators } from '../Footer/Footer.data'

export interface LayoutProps {
    debug?: boolean
    hideNavbar?: boolean
    hideFooter?: boolean
    children?: ReactNode
}

/**
 * Primary layout component which adds container/grid.
 */
export const Layout: FC<LayoutProps> = ({ children, debug }) => {
    return (
        <s.Layout debug={debug}>
            <s.LayoutContainer>{children}</s.LayoutContainer>
        </s.Layout>
    )
}

/**
 * This library fails even when imported, in SSR.
 */
const CursorNoSSR = dynamic(
    () =>
        import('../../general/Cursor/Cursor.component').then(
            (mod) => mod.Cursor
        ),
    {
        ssr: false,
    }
)

/**
 * Primary layout component which adds container/grid.
 */
export const LayoutWithNavbar: FC<LayoutProps> = ({ children, debug }) => {
    useIsomorphicLayoutEffect(() => {
        /**
         * Enable what-input to detect keyboard vs mouse
         */
        whatInput.ask()
    }, [])
    return (
        <>
            <s.SkipToMainContent href="#main" tabIndex={100}>
                Skip to Main Content
            </s.SkipToMainContent>
            <s.Layout debug={debug}>
                <Navbar />
                <s.LayoutContainer as="main" id="main">
                    {children}
                </s.LayoutContainer>
                {/* render the footer component, and send it data from contentful */}
                <Footer />
            </s.Layout>
            {/* <Toolbar /> */}
            {/* <CursorNoSSR /> */}
        </>
    )
}
