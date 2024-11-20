import React, { ErrorInfo, ReactNode } from 'react'

export class ErrorBoundary extends React.Component<{ children?: ReactNode }> {
    state: {
        hasError: boolean
        error: Error | null
        errorInfo: ErrorInfo | null
    }
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null, errorInfo: null }
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error boundary caught', error, errorInfo)
        this.setState({
            error: error,
            errorInfo: errorInfo,
        })
        // You can also log error messages to an error reporting service here
    }

    static getDerivedStateFromError() {
        return {
            hasError: true,
        }
    }

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <div>Something went wrong.</div>
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
