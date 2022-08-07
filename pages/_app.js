import React, { Component } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from '@components/App';
import { Provider } from 'next-auth/client';

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
    <Provider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <App>
          <Component {...pageProps} />
        </App>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
