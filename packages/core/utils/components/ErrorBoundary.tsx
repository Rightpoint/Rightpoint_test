import React, { ErrorInfo } from 'react'

export class ErrorBoundary extends React.Component {
    state: {
        hasError: boolean
        error: Error | null
        errorInfo: ErrorInfo | null
    }
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null, errorInfo: null }
    }

    // static getDerivedStateFromError(error) {
    //     // Update state so the next render will show the fallback UI.
    //     return { hasError: true }
    // }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error(error, errorInfo)
    }

    render() {
        if (this.state.errorInfo) {
            return (
                <div>
                    <h2>Something went wrong.</h2>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo &&
                            this.state.errorInfo.componentStack}
                    </details>
                </div>
            )
        }
        return this.props.children
    }
}
