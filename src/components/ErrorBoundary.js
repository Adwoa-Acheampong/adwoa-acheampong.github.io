import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
    
    // Update state with error details
    this.setState({
      error,
      errorInfo
    });

    // In production, you could send this to an error reporting service
    // logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    // Optionally reload the page
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="text-center p-5 bg-white rounded-4 shadow">
                  <div className="mb-4">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-danger">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                  </div>
                  <h2 className="mb-3">Oops! Something went wrong</h2>
                  <p className="text-muted mb-4">
                    We're sorry, but something unexpected happened. Please try refreshing the page or contact support if the problem persists.
                  </p>
                  {process.env.NODE_ENV === 'development' && this.state.error && (
                    <details className="text-start mb-4 p-3 bg-light rounded">
                      <summary className="cursor-pointer fw-bold">Error Details (Development Only)</summary>
                      <pre className="mt-2 text-danger small">
                        {this.state.error.toString()}
                        {this.state.errorInfo && this.state.errorInfo.componentStack}
                      </pre>
                    </details>
                  )}
                  <button 
                    onClick={this.handleReset}
                    className="btn btn-primary rounded-pill px-5"
                  >
                    Refresh Page
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;