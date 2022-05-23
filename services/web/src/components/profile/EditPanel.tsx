import React, { useContext } from "react";
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { ProfileDispatchContext, ProfileStateContext } from "@src/pages/page/[username]";
import { UserProfileActionType } from "@src/reducers/user/UserProfileReducer";

const styles = StyleSheet.create({
  settingPanel: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "250px",
    zIndex: 10, // overlay - 1
  },
  headerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "51px",
    backgroundColor: "rgb(0,0,0)",
  },
  headerText: {
    color: "rgb(255,113,0)",
    fontSize: 16,
    fontWeight: "500",
  },
  closeButton: {
    position: "absolute",
    right: 10,
  },
  panelContainer: {
    flexGrow: 1,
    margin: "5px",
  },
  labelContainer: {
    marginBottom: "5px",
  },
  settingJsonInput: {
    height: "100%",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "35px",
    backgroundColor: "rgb(0,0,0)",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "rgb(255,113,0)",
  },
});

export const EditPanel: React.FC = () => {
  const dispatch = useContext(ProfileDispatchContext);
  const state = useContext(ProfileStateContext);
  const { user: { userProfile } } = state;

  const handleSubmit = () => {
    alert("save");

    // @TODO: pass profile settings and save
  };

  const closePanel = () => {
    dispatch({ type: UserProfileActionType.TOGGLE_SIDEBAR, payload: { showSidebar: false } });
  };

  return (
    <View style={styles.settingPanel}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          Settings
        </Text>

        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => closePanel()}
        >
          <Icon name={"cross"} size={30} color={"rgb(255,113,0)"} />
        </TouchableOpacity>
      </View>

      <View style={styles.panelContainer}>
        <Text style={styles.labelContainer}>
          JSON:
        </Text>

        <TextInput
          style={styles.settingJsonInput}
          placeholder={"profile"}
          multiline
          // onChange={(event) => setProfile(
          //   JSON.parse(event.nativeEvent.text)
          //)}
          defaultValue={JSON.stringify(userProfile)}
        />
      </View>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>
          Save
        </Text>
      </TouchableOpacity>
    </View>
  );
};
