import React from 'react';
import { ThemeProvider } from './Theme/ThemeContext';
import GlobalStyles from './Theme/GlobalStyles';
import Header from './Header';

function App({ children }) {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <Header />
      {children}
    </ThemeProvider>
  );
}

export default App;
