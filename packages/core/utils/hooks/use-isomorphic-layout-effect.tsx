// React currently throws a warning when using useLayoutEffect on the server.
// To get around it, we can conditionally useEffect on the server (no-op) and
// useLayoutEffect in the browser.
import { useEffect, useLayoutEffect } from 'react'
export const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' &&
    typeof window.document !== 'undefined' &&
    typeof window.document.createElement !== 'undefined'
        ? useLayoutEffect
        : useEffect
