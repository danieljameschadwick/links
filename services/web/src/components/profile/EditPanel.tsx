import React, { useContext } from "react";
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from "react-native";
import { ProfileDispatchContext, ProfileStateContext } from "@src/pages/page/[username]";

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
    height: "40px",
    backgroundColor: "rgb(33, 150, 243)",
  },
  headerText: {
    color: "rgb(255,255,255)",
    fontSize: 16,
    fontWeight: "500",
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
    height: "30px",
    backgroundColor: "rgb(33, 150, 243)",
  },
  buttonText: {
    fontSize: 14,
    color: "rgb(255,255,255)",
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
    dispatch({ type: "toggleSidebar" });
  };

  return (
    <View style={styles.settingPanel}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          Settings
        </Text>

        <Text onPress={() => closePanel()}>X</Text>
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
