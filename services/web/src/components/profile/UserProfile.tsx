import React, { useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import Link from "@links/ui/components/links/Link";
import { EditPanel } from "@src/components/profile/EditPanel";
import { ProfileDispatchContext, ProfileStateContext } from "@src/pages/page/[username]";
import { UserProfileActionType } from "@src/reducers/user/UserProfileReducer";
import { useAppSelector } from "@src/app/hooks";
import { selectStoreUser } from "@src/app/reducer/UserReducer";

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
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
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: "auto",
    position: "absolute",
    backgroundColor: "rgb(255,113,0)",
    top: 7,
    right: 7,
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 7,
  },
  editText: {
    color: "rgb(0,0,0)",
    paddingRight: 10,
    fontWeight: 600,
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
  const storeUser = useAppSelector(selectStoreUser);
  const { user, showSidebar } = state;
  const {
    heading,
    subHeading = undefined,
    styles: profileStyles,
    links = [],
  } = user.userProfile;

  const openSidebar = () => {
    dispatch({ type: UserProfileActionType.TOGGLE_SIDEBAR, payload: { showSidebar: true } });
  };

  const isCurrentUsersProfile = storeUser?.id === user?.id;

  return (
    <>
      <View style={[ styles.container ]}>
        <Text accessibilityRole={"header"} style={[ styles.heading, profileStyles.headingText ]}>
          {heading}
        </Text>

        {subHeading && (
          <Text accessibilityRole={"text"} style={[ styles.subHeading, profileStyles.headingText ]}>
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

      {isCurrentUsersProfile && (
        showSidebar ? (
          <View style={styles.sidePanel}>
            <EditPanel />
          </View>
        ) : (
          <TouchableOpacity style={styles.openPanelButton} onPress={() => openSidebar()}>
            <Text style={styles.editText}>Edit</Text>

            <Icon name={"edit"} size={20} color={"rgb(0, 0, 0)"} />
          </TouchableOpacity>
        )
      )}
    </>
  );
};

export default UserProfile;
