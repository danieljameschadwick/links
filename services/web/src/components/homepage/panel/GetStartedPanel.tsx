import React, { useState } from "react";
import { Text, TextInput, Button, View } from "react-native";
import StyleSheet from 'react-native-media-query';
import Panel from "@src/components/layout/panel";

const { ids, styles } = StyleSheet.create({
  container: {
    display: "flex",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "800px",
    '@media (max-width: 800px)': {
      width: "100%",
    }
  },
  heading: { // @TODO: make a reusable h1/h2/h3 component for public pages
    fontSize: 26,
    marginBottom: 15,
  },
  headingBold: {
    color: "rgb(255,113,0)",
    fontWeight: "bold",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
  },
  preInputContainer: {
    height: 35,
    justifyContent: "center",
    border: "1px solid rgb(171,171,171)",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  preInputText: {
    // alignSelf: "center",
  },
  input: {
    height: 35,
    fontSize: 20,
    border: "1px solid rgb(171,171,171)",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
});

export const GetStartedPanel: React.FC = () => {
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

      <form>
        {/* on mobile we wont validate as we just show the button */}

        <View style={styles.inputContainer}>
          <View style={styles.preInputContainer}>
            <Text style={styles.preInputText}>links.cc</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder={""}
            textContentType={"username"}
            onChange={(event) => setForm({
              ...form,
              username: event.nativeEvent.text,
            })}
            onSubmitEditing={handleSubmit}
          />
        </View>


        <Button title={"Get started for free"} onPress={handleSubmit} />
      </form>
    </Panel>
  );
}
