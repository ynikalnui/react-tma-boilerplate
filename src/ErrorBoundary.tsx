import {
    Component,
    ErrorInfo,
    type ComponentType,
    type GetDerivedStateFromError,
    type PropsWithChildren,
    type ReactNode,
} from 'react';

export interface ErrorBoundaryProps extends PropsWithChildren {
    fallback?: ReactNode | ComponentType<{ error: unknown }>;
}

type TErrorBoundaryState = {
    error?: unknown;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, TErrorBoundaryState> {
    state: TErrorBoundaryState = {};

    // eslint-disable-next-line max-len
    static getDerivedStateFromError: GetDerivedStateFromError<ErrorBoundaryProps, TErrorBoundaryState> = (error) => ({ error });

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ error });
    }

    render() {
        const { error } = this.state
        const { fallback: Fallback, children } = this.props

        return 'error' in this.state
        ? Fallback && typeof Fallback === 'function'
            ? <Fallback error={error} />
            : Fallback || null
        : children;
    }
}