import React from "react";
import { StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";
import { ProfileInterface } from "@src/types/profile";
import Link from "@links/ui/components/links/Link";

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flexGrow: 1,
        justifyContent: "center",
    },
    textContainer: {
        alignItems: "center",
    },
    heading: {
        color: "white",
        textAlign: "center",
        fontSize: 24,
        marginBottom: 10,
    },
    subHeading: {
        color: "white",
        textAlign: "center",
        fontSize: 14,
        marginBottom: 16,
    },
});

const Heading = styled.Text`
    color: white;
    text-align: center;
    font-size: 24px;
    margin-bottom: 10px;
`;

type Props = {
    profile: ProfileInterface;
};

export const Profile: React.FC<Props> = ({ profile }) => {
    const {
        heading,
        links,
        subHeading = undefined
    } = profile;

    const profileStyles = StyleSheet.create({
        container: {
            maxWidth: 500,
            ...styles.container,
        }
    });

    return (
        <View style={profileStyles.container}>
            <Text accessibilityRole={"header"} style={styles.heading}>
                {heading}
            </Text>

            <Text accessibilityRole={"header"} style={{ color: "white" }}>
                {heading}
            </Text>

            <Heading>
                {heading}
            </Heading>

            {subHeading && (
                <Text accessibilityRole={"text"} style={styles.subHeading}>
                    {subHeading}
                </Text>
            )}

            <View>
                {links.map(({ id, text, url, styles, logo = null }) => {
                    return (
                        <Link key={id} text={text} url={url} styles={styles} logo={logo} />
                    );
                })}
            </View>
        </View>
    );
};
