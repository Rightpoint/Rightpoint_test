import { ApplicationInsights } from '@microsoft/applicationinsights-web'
import {
    AppInsightsContext,
    ReactPlugin,
} from '@microsoft/applicationinsights-react-js'

const isValidEnv =
    process.env.NODE_ENV === 'production' &&
    typeof window !== 'undefined' &&
    Boolean(process.env.NEXT_PUBLIC_APP_INSIGHTS_INSTRUMENTATION_KEY)

let reactPlugin, appInsights

/**
 * Only instantiate on client side and if we have env vars
 */
if (isValidEnv) {
    reactPlugin = new ReactPlugin()
    appInsights = new ApplicationInsights({
        config: {
            instrumentationKey:
                process.env.NEXT_PUBLIC_APP_INSIGHTS_INSTRUMENTATION_KEY,
            enableAutoRouteTracking: true,
            extensions: [reactPlugin],
        },
    })
    appInsights.loadAppInsights()
}

export const AppInsightsProvider = ({ children }) => {
    if (isValidEnv) {
        return (
            <AppInsightsContext.Provider value={reactPlugin}>
                {children}
            </AppInsightsContext.Provider>
        )
    }

    return <>{children}</>
}
