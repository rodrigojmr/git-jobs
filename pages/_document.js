import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import {
  FallbackStyles,
  MagicScriptTag
} from '../components/Theme/InlineCSSVariables';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="application-name" content="GitHub Jobs Clone" />
          {/* <meta name='twitter:card' content='summary_large_image' /> */}
          {/* <meta name='twitter:creator' content='@pbteja1998' /> */}
          <meta property="og:type" content="website" />
          <meta name="author" content="Rodrigo Moura" />
          <meta property="og:site_name" content="GitHub Jobs Clone" />
          <meta name="theme-color" content="#5964E0" />
          <meta
            name="description"
            content="A GitHub Jobs clone made using the design from frontendmentor.io."
          />
          <meta property="og:title" content="GitHub Jobs Clone" />
          <meta
            property="og:description"
            content="A GitHub Jobs clone made using the design from frontendmentor.io."
          />
          <meta property="og:url" content="https://jobs.bhanuteja.dev" />
          <meta property="twitter:title" content="GitHub Jobs" />
          <meta
            property="twitter:description"
            content="A GitHub Jobs clone made using the design from frontendmentor.io."
          />
          <meta property="twitter:url" content="https://jobs.bhanuteja.dev" />
          <meta
            property="og:image"
            content="https://jobs.bhanuteja.dev/preview.jpg"
          />
          <meta
            property="twitter:image"
            content="https://jobs.bhanuteja.dev/preview.jpg"
          />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link
            href="https://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@300;400;700&display=swap"
            rel="stylesheet"
          />
          <FallbackStyles />
          {this.props.styleTags}
        </Head>
        <body>
          <MagicScriptTag />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
