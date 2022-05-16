import React, { useState } from "react";
import { Text, Button, View } from "react-native-web";
import StyleSheet from "react-native-media-query";
import Panel from "@src/components/layout/panel";
import { TextInput } from "@src/components/form/textInput/TextInput";

const { ids, styles } = StyleSheet.create({
  container: {
    display: "flex",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "667px",
    textAlign: "center",
    "@media (max-width: 667px)": {
      paddingLeft: "12px",
      paddingRight: "12px",
      width: "100%",
    }
  },
  heading: { // @TODO: make a reusable h1/h2/h3 component for public pages
    fontSize: 26,
    marginBottom: 15,
  },
  darkHeading: { // @TODO: make a reusable h1/h2/h3 component for public pages
    color: "white",
  },
  headingBold: {
    color: "rgb(255,113,0)",
    fontWeight: "bold",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: 350,
    "@media (max-width: 667px)": {
      width: "100%",
    }
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
  },
  preInputContainer: {
    height: 35,
    justifyContent: "center",
    backgroundColor: "rgb(245, 246, 248)",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    padding: "10px",
  },
  preInputText: {
    fontWeight: "700",
  },
  input: {
    height: 35,
    fontSize: 14,
    backgroundColor: "rgb(245, 246, 248)",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    width: "100%",
    outline: "none",
  },
  button: {
    width: "100%",
    backgroundColor: "rgb(255,113,0)",
  }
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
        Create <Text style={styles.headingBold}>your</Text> landing page for the internet
      </Text>

      <View style={styles.form} dataSet={{ media: ids.form }}>
        {/* on mobile we wont validate as we just show the button */}

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
