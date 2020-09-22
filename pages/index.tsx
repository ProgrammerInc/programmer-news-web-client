/* eslint-disable @typescript-eslint/no-unused-vars-experimental */
import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { NextPageContext } from 'next';
import { State } from '../lib/reducer';
import Home from '../components/home';

export interface PageProps extends State {
  pageProp: string;
  appProp: string;
}

class Index extends React.Component<PageProps> {
  public static async getInitialProps({
    store,
    pathname,
    query,
    req,
  }: NextPageContext<State>) {
    if (req) {
      // All async actions must be await'ed
      await store.dispatch({ type: 'PAGE', payload: 'server' });

      // Some custom thing for this particular page
      return { pageProp: 'server' };
    }

    // await is not needed if action is synchronous
    store.dispatch({ type: 'PAGE', payload: 'client' });

    // Some custom thing for this particular page
    return { pageProp: 'client' };
  }

  public render() {
    const { pageProp, appProp, app, page } = this.props;
    return <Home />;
  }
}

export default connect((state) => state)(Index);
