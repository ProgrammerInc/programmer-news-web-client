import React from 'react';
import App, { AppContext } from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';
import { wrapper } from '../lib/store';
import withData from '../lib/withData';

class WrappedApp extends App<any> {
  public static getInitialProps = async ({ Component, ctx }: AppContext) => {
    // Keep in mind that this will be called twice on server, one for page and second for error page
    ctx.store.dispatch({ type: 'APP', payload: 'was set in _app' });

    return {
      pageProps: {
        // Call page-level getInitialProps
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}),
        // Some custom thing for all pages
        appProp: ctx.pathname,
      },
    };
  };

  public render() {
    const { Component, pageProps, apollo } = this.props;
    return (
      <ApolloProvider client={apollo}>
        <Component {...pageProps} />
      </ApolloProvider>
    );
  }
}

export default wrapper.withRedux(withData(WrappedApp));
