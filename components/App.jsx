import { DarkLightThemeProvider } from './Theme/ThemeContext';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyles from './Theme/GlobalStyles';
import Header from './Header';
import theme from './Theme/theme';
import { ModalProvider } from 'styled-react-modal';
import Footer from './Footer';

const Main = styled.main`
  padding-bottom: 3rem;
`;

function App({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <DarkLightThemeProvider>
        <ModalProvider>
          <GlobalStyles />
          <Header />
          <Main>{children}</Main>
          <Footer />
        </ModalProvider>
      </DarkLightThemeProvider>
    </ThemeProvider>
  );
}

export default App;
