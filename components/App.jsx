import { DarkLightThemeProvider } from './Theme/ThemeContext';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './Theme/GlobalStyles';
import Header from './Header';
import theme from './Theme/theme';

function App({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <DarkLightThemeProvider>
        <GlobalStyles />
        <Header />
        {children}
      </DarkLightThemeProvider>
    </ThemeProvider>
  );
}

export default App;
