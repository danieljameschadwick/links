import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Link from "@links/ui/components/links/Link";
import data from "@links/web/utils/mockLinks";

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flexGrow: 1,
        justifyContent: "center",
    },
    link: {
        color: "blue",
    },
    textContainer: {
        alignItems: "center",
    },
    text: {
        alignItems: "center",
        fontSize: 24,
        marginBottom: 16,
    },
});

const App: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text accessibilityRole={"header"} style={styles.text}>
                Daniel Chadwick
            </Text>

            <View>
                {data.map(({ id, text, url, styles }) => {
                    return (
                        <Link key={id} text={text} url={url} styles={styles} />
                    );
                })}
            </View>
        </View>
    );
}

export default App;
