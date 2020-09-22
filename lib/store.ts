import { Context, createWrapper, MakeStore } from 'next-redux-wrapper';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import { reducer, State } from './reducer';

declare const window: any;

// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
export const makeStore: MakeStore<State> = (context: Context) =>
  createStore(reducer, applyMiddleware(logger));

export const wrapper = createWrapper<State>(makeStore, { debug: true });
