import React, { useState } from "react";
import { Linking, Text, Button, View } from "react-native";
import StyleSheet from "react-native-media-query";
import { Panel } from "@links/ui/components/layout/Panel";
import { TextInput } from "@links/ui/components/form/TextInput";

const { ids, styles } = StyleSheet.create({
  container: {
    width: "667px",
    marginTop: 10,
    display: "flex",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  heading: { // @TODO: make a reusable h1/h2/h3 component for public pages
    fontSize: 36,
    marginBottom: 30,
  },
  darkHeading: { // @TODO: make a reusable h1/h2/h3 component for public pages
    color: "white",
  },
  headingAccent: {
    color: "rgb(255,113,0)",
    fontWeight: "bold",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: 350,
    "@media (max-width: 667px)": {
      width: "100%",
    },
  },
  inputContainer: {
    marginBottom: 10,
  },
  button: {
    width: "100%",
    backgroundColor: "rgb(255,113,0)",
  },
});

export const GetStartedPanel: React.FC = () => {
  // const colorScheme = useColorScheme();
  // const heading = colorScheme === "dark" ? [styles.darkHeading , styles.heading] : [styles.heading];
  const [ form, setForm ] = useState({});

  const handleSubmit = (): void => {
    console.log(form);

    // redirect to the register page w/ form data
  };

  return (
    <Panel style={styles.container} dataSet={{ media: ids.container }}>
      <Text style={styles.heading}>
        Create <Text style={styles.headingAccent}>your</Text> landing page for the internet
      </Text>

      <View style={styles.form} dataSet={{ media: ids.form }}>
        {/* on mobile we wont validate as we just show the button */}

        <View style={styles.inputContainer}>
          <TextInput
            textContentType={"username"}
            label={"links.gg/"}
            placeholder={"URL"}
            onChange={(event) => setForm({
              ...form,
              url: event.nativeEvent.text,
            })}
            onSubmit={handleSubmit}
          />
        </View>

        <Button
          style={styles.button}
          title={"Get started for free"}
          onPress={handleSubmit}
          color={"rgb(255,113,0)"}
        />
      </View>
    </Panel>
  );
};
