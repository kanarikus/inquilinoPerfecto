import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            // Puedes renderizar cualquier interfaz de repuesto
            return <div>
                <h1>Ha ocurrido un error</h1>
                <div className='error-div'/>
            </div>
        }
        return this.props.children;
    }
}

export default ErrorBoundary
