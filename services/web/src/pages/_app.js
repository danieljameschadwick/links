import React from "react";
import Head from "next/head";
import { View } from "react-native";
import "@src/styles/index.scss";

const App = ({ Component, pageProps }) => {
    return (
        <View>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Links</title>
                {/* // @TODO: add css-loader for index.css */}
                <style>{`
                  html,
                  body,
                  body > div:first-child,
                  div#__next,
                  div#__next > div {
                    height: 100%;
                  }
                `}</style>
            </Head>

            <Component {...pageProps} />
        </View>
    );
};

export default App;
