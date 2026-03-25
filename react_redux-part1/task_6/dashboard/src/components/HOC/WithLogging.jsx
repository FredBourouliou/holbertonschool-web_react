import { useEffect } from 'react';

function WithLogging(WrappedComponent) {
  function WithLoggingComponent(props) {
    useEffect(() => {
      const name = WrappedComponent.displayName || WrappedComponent.name || 'Component';
      console.log(`Component ${name} is mounted`);
      return () => {
        console.log(`Component ${name} is going to unmount`);
      };
    }, []);

    return <WrappedComponent {...props} />;
  }

  const name = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithLoggingComponent.displayName = `WithLogging(${name})`;

  return WithLoggingComponent;
}

export default WithLogging;
