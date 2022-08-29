import React, { useContext, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import Link from "@links/ui/components/links/Link";
import { DraggableGrid } from "react-native-draggable-grid";
import { EditPanel } from "@src/components/profile/EditPanel";
import {
  ProfileDispatchContext,
  ProfileStateContext,
} from "@src/pages/page/[username]";
import { UserProfileActionType } from "@src/reducers/user/UserProfileReducer";
import { useAppSelector } from "@links/state/hooks";
import { selectStoreUser } from "@links/state/reducer/UserReducer";

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
  const [items, setItems] = useState([
    { name: "1", key: "one" },
    { name: "2", key: "two" },
    { name: "3", key: "three" },
    { name: "4", key: "four" },
    { name: "5", key: "five" },
    { name: "6", key: "six" },
    { name: "7", key: "seven" },
    { name: "8", key: "eight" },
    { name: "9", key: "night" },
    { name: "0", key: "zero" },
  ]);

  const openSidebar = () => {
    dispatch({
      type: UserProfileActionType.TOGGLE_SIDEBAR,
      payload: { showSidebar: true },
    });
  };

  const isCurrentUsersProfile = storeUser?.id === user?.id;
  const renderItem = (item: { name: string; key: string }) => {
    console.log(item);

    return (
      <View style={styles.item} key={item.key}>
        <Text style={styles.itemText}>{item.name}</Text>
      </View>
    );
  };

  return (
    <>
      <View style={styles.wrapper}>
        <DraggableGrid
          numColumns={5}
          renderItem={renderItem}
          data={items}
          onDragRelease={(data) => {
            console.log("onDragRelease");
            console.log(data);

            setItems(data);
          }}
        />
      </View>

      <View style={[styles.container]}>
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
          {links.map(({ id, text, url, styles, logo = null }) => {
            return (
              <Link
                key={id}
                text={text}
                url={url}
                styles={styles}
                logo={logo}
              />
            );
          })}
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
    </>
  );
};

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
  wrapper: {
    paddingTop: 100,
    width: "100%",
    height: "100%",
    justifyContent: "center",
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
