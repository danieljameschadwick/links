import React, { useState } from "react";
import { TextInput, Button } from "react-native";

const Register: React.FC = () => {
  const [ form, setForm ] = useState({});

  const handleSubmit = (): void => {
    console.log(form);
  };

  return (
    <>
      <form>
        <TextInput
          placeholder={"Email"}
          textContentType={"emailAddress"}
          onChange={(event) => setForm({
            ...form,
            email: event.nativeEvent.text,
          })}
          onSubmitEditing={handleSubmit}
        />

        <TextInput
          secureTextEntry={true}
          placeholder={"Password"}
          textContentType={"password"}
          onChange={(event) => setForm({
            ...form,
            password: event.nativeEvent.text,
          })}
          onSubmitEditing={handleSubmit}
        />

        <Button title={"Register"} onPress={handleSubmit} />
      </form>
    </>
  );
};

export default Register;