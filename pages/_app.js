import React, { Component } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from '@components/App';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false
    },
    mutations: {
      // mutation options
    }
  }
});

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <App>
        <Component {...pageProps} />
      </App>
    </QueryClientProvider>
  );
}

export default MyApp;
