import React from 'react';
import App from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';
import withData from '../lib/withData';

class MyApp extends App<any> {
  render() {
    const { Component, pageProps, apollo } = this.props;
    return (
      <ApolloProvider client={apollo}>
        <Component {...pageProps} />
      </ApolloProvider>
    );
  }
}

export default withData(MyApp);
