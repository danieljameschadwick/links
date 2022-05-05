import React, { createContext } from "react";
import { StyleSheet, TextInput, View, Text, Button, TouchableOpacity } from "react-native";
import { UserProfileInterface } from "@src/interfaces/UserProfileInterface";

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

const ProfileContext = createContext(null);

type Props = {
  profile: UserProfileInterface;
}

export const EditPanel: React.FC<Props> = ({ profile }) => {
  // const profile = useContext<UserProfileInterface | null>(ProfileContext);

  const handleSubmit = () => {
    alert("save");

    // @TODO: pass profile settings and save
  };

  const closePanel = () => {
    alert('closePanel');
  };

  return (
    <View style={styles.settingPanel}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          Settings
        </Text>

        <Text onPress={closePanel}>X</Text>
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
          defaultValue={JSON.stringify(profile)}
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
