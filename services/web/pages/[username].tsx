import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Profile from "../components/Profile";
import { ProfileInterface } from "../types/profile";
import { StyleSheet, View } from "react-native";

const fetchProfile = (username: string): ProfileInterface => {
    // @TODO: fetch data from profile.
    return {
        username: "dan",
        heading: "Daniel Chadwick",
        subHeading: "Software Developer",
        links: [
            {
                id: 1,
                text: "GitHub",
                url: "https://github.com/danieljameschadwick",
                styles: {
                    container: {
                        backgroundColor: "#FFF",
                        borderWidth: 1,
                        borderColor: "#254569",
                    },
                    text: {
                        color: "rgb(17 17 17)",
                    }
                },
                logo: {
                    uri: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
                    altText: "\"GitHub\" logo",
                },
            },
            {
                id: 2,
                text: "www.danielchadwick.co.uk",
                url: "https://www.danielchadwick.co.uk",
                styles: {
                    container: {
                        backgroundColor: "#FFF",
                        borderWidth: 1,
                        borderColour: "#000",
                    },
                },
                logo: {
                    uri: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
                    altText: "\"GitHub\" logo",
                },
            },
            {
                id: 3,
                text: "LinkedIn",
                url: "https://linkedin.com/in/danieljchadwick/",
                styles: {
                    container: {
                        backgroundColor: "#FFF",
                        borderWidth: 1,
                        borderColour: "#000",
                    },
                },
            },
        ]
    };
};

const ProfilePage: React.FC = () => {
    const router = useRouter();
    const { username } = router.query;
    const [ profile, setProfile ] = useState<ProfileInterface>();

    useEffect(() => {
        setProfile(
            fetchProfile(username)
        );
    }, [ username ]);

    if (!profile) {
        return <>404.</>;
    }

    const profileStyles = StyleSheet.create({
        container: {
            display: "flex",
            alignItems: "center",
            backgroundColor: "black",
            width: "100%",
            height: "100%",
            // ...styles.container,
        },
    });

    return (
        <View style={profileStyles.container}>
            <Profile profile={profile} />
        </View>
    );
};

export default ProfilePage;
