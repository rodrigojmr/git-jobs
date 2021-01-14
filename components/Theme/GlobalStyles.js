import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *, *:before, *:after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: Kumbh Sans, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"
  }

  @media screen and (max-width: 768px) {
    html {
      font-size: 80%;
    }
  }
  body {
    background: var(--bg-primary);
    color: var(--color-contrast)
  }
  p {
    color: #9297a2;
  }
  a {
    color: var(--color-primary);
  }
  h1 {
    font-size:1.8rem;
  }
  h2 {
    font-size:1.6rem;
  }
  h3 {
    font-size:1.5rem;
  }
  h4 {
    font-size:1.4rem;
  }
  h5 {
    font-size:1.3rem;
  }
  h6 {
    font-size:1.2rem;
  }
`;
export default GlobalStyles;
