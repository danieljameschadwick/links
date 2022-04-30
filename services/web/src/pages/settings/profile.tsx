import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import { UserInterface } from "@src/interfaces/UserInterface";
import { fetchUser } from "@src/pages/page/actions";
import Loading from "@src/components/loading";
import Error404 from "@src/pages/404";
import UserProfile from "@src/components/profile/UserProfile";
import { UserProfileInterface } from "@src/interfaces/UserProfileInterface";

const styles = StyleSheet.create({
  profileContainer: {
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  userProfileContainer: {
    display: "flex",
    alignItems: "center",
    height: "100%",
  },
  profilePanel: {
    height: "100%",
    width: "70%",
  },
  settingPanel: {
    flex: 1,
  },
  settingJsonInput: {
    height: "100%",
  },
});

type Props = {
  username: string;
}

const Profile: React.FC<Props> = ({ username = 'dan' }) => {
  const [ user, setUser ] = useState<UserInterface | null>();
  const [ profile, setProfile ] = useState<UserProfileInterface | null>();
  const [ httpStatus, setHttpStatus ] = useState<number | null>();

  useEffect(() => {
    const fetchData = async () => {
      if (!username) return;

      const user = await fetchUser(username as string);

      setUser(user);
      setProfile(user.userProfile);
    };

    fetchData()
      .catch(() => {
        setHttpStatus(404); // @TODO: improve error handling/logging/rather than catch all
      });
  }, [ username ]);

  if (httpStatus === null) {
    return <Loading />;
  }

  if (!profile) {
    return <Error404 />;
  }

  const profileStyles = StyleSheet.create({
    container: {
      ...profile.styles,
    },
  });
  const userProfileStyles = StyleSheet.flatten([
    profileStyles.container,
    styles.userProfileContainer,
  ]);

  const handleSubmit = () => {
    alert('save');

    // @TODO: pass profile settings and save
  };

  return (
      <View style={styles.profileContainer}>
        <View style={styles.profilePanel}>
          {/* // @TODO: some pop-up text to disclose unsaved changes */}
          {/*<Text>This has not been saved.</Text>*/}

          <View style={userProfileStyles}>
            <UserProfile profile={profile} />
          </View>
        </View>

        {/* // @TODO: refactor to [username].tsx and have as a hideable panel */}
        <View style={styles.settingPanel}>
          <Text>Profile: </Text>
          <TextInput
            style={styles.settingJsonInput}
            placeholder={"profile"}
            multiline
            onChange={(event) => setProfile(
              JSON.parse(event.nativeEvent.text)
            )}
            defaultValue={JSON.stringify(profile)}
          />

          <Button title={"Save"} onPress={handleSubmit} />
        </View>
      </View>
  );
};

export default Profile;
