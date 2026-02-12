import { Component } from 'react';

function WithLogging(WrappedComponent) {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  class WithLoggingComponent extends Component {
    componentDidMount() {
      console.log(`Component ${displayName} is mounted`);
    }

    componentWillUnmount() {
      console.log(`Component ${displayName} is going to unmount`);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  WithLoggingComponent.displayName = `WithLogging(${displayName})`;

  return WithLoggingComponent;
}

export default WithLogging;
