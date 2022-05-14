import { Children } from "react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { AppRegistry } from "react-native";

const normalizeNextElements = `
  #__next {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;

export default class Document extends NextDocument {
  static async getInitialProps({ renderPage }) {
    AppRegistry.registerComponent("links", () => Main);
    const { getStyleElement } = AppRegistry.getApplication("links");
    const page = await renderPage();
    const styles = [
      <style dangerouslySetInnerHTML={{ __html: normalizeNextElements }} />,
      getStyleElement(),
    ];
    return { ...page, styles: Children.toArray(styles) };
  };

  render() {
    return (
      <Html style={{ height: "100%" }}>
        <Head>
          {/* @TODO: <title> should not be used in _document.js's <Head>.
                https://nextjs.org/docs/messages/no-document-title */}
          <title>Links</title>
          {/*<link href="/styles/fonts/_fonts.css" rel="stylesheet"/>*/}
        </Head>

        <body style={{ height: "100%", overflow: "hidden" }}>
        <Main />
        <NextScript />
        </body>
      </Html>
    );
  }
};
