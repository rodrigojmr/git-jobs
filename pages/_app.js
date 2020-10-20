import React, { Component } from 'react';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import App from '../components/App';
const queryCache = new QueryCache();

function MyApp({ Component, pageProps }) {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <App>
        <Component {...pageProps} />
      </App>
    </ReactQueryCacheProvider>
  );
}

export default MyApp;
