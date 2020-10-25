import React, { Component } from 'react';
import {
  QueryCache,
  ReactQueryCacheProvider,
  ReactQueryConfigProvider
} from 'react-query';
import App from '../components/App';
const queryCache = new QueryCache();

const overrides = {
  queries: {
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false
  }
};

function MyApp({ Component, pageProps }) {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <ReactQueryConfigProvider config={overrides}>
        <App>
          <Component {...pageProps} />
        </App>
      </ReactQueryConfigProvider>
    </ReactQueryCacheProvider>
  );
}

export default MyApp;
