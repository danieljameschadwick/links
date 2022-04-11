import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useRouter } from "next/router";
import Profile from "@src/components/profile/Profile";
import { fetchProfile } from "@src/pages/page/actions";
import { ProfileInterface } from "@src/interfaces/ProfileInterface";

const UserProfile: React.FC = () => {
  const router = useRouter();
  const {
    username = undefined
  } = router.query;
  const [ profile, setProfile ] = useState<ProfileInterface | null>();

  useEffect(() => {
    setProfile(
      fetchProfile(username as string)
    );
  }, [ username ]);

  if (!username) {
    return <>rendering.</>;
  }

  const profileStyles = StyleSheet.create({
    container: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "black", // @TODO: derive from API
      width: "100%",
      height: "100%",
      // ...styles.container, // @TODO: override API styling
    },
  });

  return (
    // <ProfileProvider>
    <View style={profileStyles.container}>
      <Profile profile={profile} />
    </View>
    // </ProfileProvider>
  );
};

export default UserProfile;
