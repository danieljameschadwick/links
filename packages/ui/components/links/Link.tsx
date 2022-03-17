import { React } from "react";
import { Linking, Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { Platforms } from "@links/ui/util/enum/Platforms";
import ExternalLink from "@links/ui/components/links/ExternalLink";

type Props = {
    text: string;
    url: string;
    styles: StyleSheet.NamedStyles;
};

const Link: React.FC<Props> = ({ text, url, styles: propStyles }) => {
    const styles = StyleSheet.create({
        container: {
            display: "flex",
            justifyContent: "center",
            marginBottom: 10,
            borderRadius: "0.4em",
            ...propStyles.container,
        },
        text: {
            textAlign: "center",
            padding: 16,
            ...propStyles.text,
        },
    });

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
                    <ExternalLink style={styles.text} url={url}>
                        {text}
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
