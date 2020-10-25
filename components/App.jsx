import React from 'react';
import { ThemeProvider } from './Theme/ThemeContext';
import GlobalStyles from './Theme/GlobalStyles';
import Header from './Header';
import { ReactQueryDevtools } from 'react-query-devtools';

function App({ children }) {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <Header />
      {children}
      <ReactQueryDevtools />
    </ThemeProvider>
  );
}

export default App;
