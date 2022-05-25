import React from "react";
import { AppRegistry } from "react-native-web";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { flush } from "react-native-media-query";

const normalizeNextElements = `
  #__next {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;

export default class Document extends NextDocument {
  static async getInitialProps({ renderPage }) {
    AppRegistry.registerComponent("Main", () => Main);

    const { getStyleElement } = AppRegistry.getApplication("Main");
    const { html, head } = await renderPage();
    const styles = [
      <style dangerouslySetInnerHTML={{ __html: normalizeNextElements }} />,
      getStyleElement(),
      flush(),
    ];

    return { html, head, styles: React.Children.toArray(styles) };
  };

  render() {
    return (
      <Html style={{ height: "100%" }}>
        <Head>
          {/* @TODO: <title> should not be used in _document.js's <Head>.
                https://nextjs.org/docs/messages/no-document-title */}
          <title>Links</title>
        </Head>

        <body style={{ height: "100%" }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
};
