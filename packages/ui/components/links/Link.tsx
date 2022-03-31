import React from "react";
import { Image, Linking, Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { Platforms } from "@links/ui/util/enum/Platforms";
import ExternalLink from "@links/ui/components/links/ExternalLink";

type LinkLogo = {
    uri: string;
    altText: string;
};

type Props = {
    text: string;
    url: string;
    styles: StyleSheet.NamedStyles;
    logo?: LinkLogo;
};

const Link: React.FC<Props> = ({ text, url, styles: propStyles, logo = null }) => {
    const styles = StyleSheet.create({
        container: {
            display: "flex",
            justifyContent: "center",
            marginBottom: 10,
            borderRadius: "0.4em",
            ...propStyles.container,
        },
        link: {
            display: "flex",
            padding: 16,
            ...propStyles.text,
        },
        logo: {
            width: 25,
            height: 25,
            marginRight: 10,
        },
        text: {
            flex: 1,
            textAlign: "center",
            justifyContent: "center",
            alignContent: "center",
            alignSelf: "center",
            paddingRight: 0,
        },
    });

    const logoStyles = StyleSheet.create({
        text: {
            paddingRight: 25,
        },
    });

    const textStyle = logo ? StyleSheet.compose(styles.text, logoStyles.text) : styles.text;

    const handlePress = () => {
        Linking.openURL(url);
    };

    // The purpose of TouchableWithoutFeedback is just to stop propagating
    // press events to parents
    // The View in the middle exists because otherwise TouchableWithoutFeedback
    // would render the inner link unclickable.
    if (Platform.OS === Platforms.WEB) {
        return (
            <TouchableWithoutFeedback>
                <View style={styles.container}>
                    <ExternalLink style={styles.link} url={url}>
                        {logo && (
                            <Image
                                style={styles.logo}
                                accessibilityLabel={logo.altText}
                                source={{
                                    uri: logo.uri,
                                }}
                            />
                        )}

                        <Text style={textStyle}>{text}</Text>
                    </ExternalLink>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    return (
        <TouchableWithoutFeedback style={styles.container} onPress={() => handlePress()}>
            <Text accessibilityRole={"link"} style={styles.text}>
                {text}
            </Text>
        </TouchableWithoutFeedback>
    );
};

export default Link;
