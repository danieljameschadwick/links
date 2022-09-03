import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native-web";
import StyleSheet from "react-native-media-query";
import Icon from "react-native-vector-icons/Entypo";
import Link from "@links/ui/components/links/Link";
import { DraggableLinks } from "@src/components/profile/DraggableLinks";
import { EditPanel } from "@src/components/profile/EditPanel";
import {
  ProfileDispatchContext,
  ProfileStateContext,
} from "@src/pages/page/[username]";
import { UserProfileActionType } from "@src/reducers/user/UserProfileReducer";
import { useAppSelector } from "@links/state/hooks";
import { selectStoreUser } from "@links/state/reducer/UserReducer";
import NoSSRWrapper from "../noSsrWrapper";

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
    dispatch({
      type: UserProfileActionType.TOGGLE_SIDEBAR,
      payload: { showSidebar: true },
    });
  };

  const isCurrentUsersProfile = storeUser?.id === user?.id;
  const renderItem = (item: { name: string; key: string }) => {
    return (
      <View style={styles.item} key={item.key}>
        <Text style={styles.itemText}>{item.name}</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container]} dataSet={{ media: ids.container }}>
      <View style={[styles.profileContainer]}>
        <Text
          accessibilityRole={"header"}
          style={[styles.heading, profileStyles.headingText]}
        >
          {heading}
        </Text>

        {subHeading && (
          <Text
            accessibilityRole={"text"}
            style={[styles.subHeading, profileStyles.headingText]}
          >
            {subHeading}
          </Text>
        )}

        <View>
          <NoSSRWrapper>
            <DraggableLinks links={links} />
          </NoSSRWrapper>
        </View>
      </View>

      {isCurrentUsersProfile &&
        (showSidebar ? (
          <View style={styles.sidePanel}>
            <EditPanel />
          </View>
        ) : (
          <TouchableOpacity
            style={styles.openPanelButton}
            onPress={() => openSidebar()}
          >
            <Text style={styles.editText}>Edit</Text>

            <Icon name={"edit"} size={20} color={"rgb(0, 0, 0)"} />
          </TouchableOpacity>
        ))}
    </View>
  );
};

const { ids, styles } = StyleSheet.create({
  container: {
    maxWidth: 400,
    marginLeft: "auto",
    marginRight: "auto",
    "@media (max-width: 667px)": {
      paddingLeft: "12px",
      paddingRight: "12px",
      width: "100%",
    },
  },
  gridContainer: {
    height: 1000,
  },
  profileContainer: {
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
  item: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    fontSize: 40,
    color: "#FFFFFF",
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

export default UserProfile;
