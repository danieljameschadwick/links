import React, { useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import Link from "@links/ui/components/links/Link";
import { EditPanel } from "@src/components/profile/EditPanel";
import { ProfileDispatchContext, ProfileStateContext } from "@src/pages/page/[username]";
import { UserProfileActionType } from "@src/reducers/user/UserProfileReducer";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
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
  openPanelButton: {
    height: "auto",
    position: "absolute",
    right: "7px",
  },
  sidePanel: {
    position: "absolute",
    right: 0,
    height: "100%",
    backgroundColor: "white",
  },
});

const UserProfile: React.FC = () => {
  const dispatch = useContext(ProfileDispatchContext);
  const state = useContext(ProfileStateContext);
  const { user: { userProfile }, showSidebar } = state;
  const {
    heading,
    subHeading = undefined,
    links = [],
  } = userProfile;

  const profileStyles = StyleSheet.create({
    container: {
      maxWidth: 500,
      marginTop: 24,
    }
  });

  const openSidebar = () => {
    dispatch({ type: UserProfileActionType.TOGGLE_SIDEBAR, payload: { showSidebar: true } });
  };

  return (
    <>
      <View style={profileStyles.container}>
        <Text accessibilityRole={"header"} style={styles.heading}>
          {heading}
        </Text>

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

      {showSidebar ? (
        <View style={styles.sidePanel}>
          <EditPanel />
        </View>
      ) : (
        <TouchableOpacity style={styles.openPanelButton} onPress={() => openSidebar()}>
          <Icon name={"edit"} size={30} color={"rgb(255,113,0)"} />
        </TouchableOpacity>
      )}
    </>
  );
};

export default UserProfile;
