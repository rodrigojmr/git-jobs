import { DarkLightThemeProvider } from './Theme/ThemeContext';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './Theme/GlobalStyles';
import Header from './Header';
import theme from './Theme/theme';
import { ModalProvider } from 'styled-react-modal';
import Footer from './Footer';

function App({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <DarkLightThemeProvider>
        <ModalProvider>
          <GlobalStyles />
          <Header />
          {children}
          <Footer />
        </ModalProvider>
      </DarkLightThemeProvider>
    </ThemeProvider>
  );
}

export default App;
