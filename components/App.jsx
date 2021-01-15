import { DarkLightThemeProvider } from './Theme/ThemeContext';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './Theme/GlobalStyles';
import Header from './Header';
import theme from './Theme/theme';
import { ModalProvider } from 'styled-react-modal';

function App({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <DarkLightThemeProvider>
        <ModalProvider>
          <GlobalStyles />
          <Header />
          {children}
        </ModalProvider>
      </DarkLightThemeProvider>
    </ThemeProvider>
  );
}

export default App;
