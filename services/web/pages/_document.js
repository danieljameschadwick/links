import React, { Children } from "react";
import { AppRegistry } from "react-native";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import config from "../app.json";

const normalizeNextElements = `
  #__next {
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100%;
  }
`;

export default class Document extends NextDocument {
    static async getInitialProps({ renderPage }) {
        AppRegistry.registerComponent(config.name, () => Main);

        const { getStyleElement } = AppRegistry.getApplication(config.name);
        const page = await renderPage();
        const styles = [
            <style dangerouslySetInnerHTML={{ __html: normalizeNextElements }} />,
            getStyleElement(),
        ];

        return { ...page, styles: Children.toArray(styles) };
    }

    render() {
        return (
            <Html style={{ height: "100%" }}>
                <Head />

                <body style={{ height: "100%", overflow: "hidden" }}>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
};
