import React, { useEffect } from "react";
import { StyleSheet, Button, View } from "react-native";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { Header } from "@src/components/layout/Header";
import { PageContent } from "@src/components/layout/PageContent";
import { Heading, headerStyles } from "@src/components/layout/text/h1";
import { TextInput } from "@src/components/form/TextInput";
import { UsernameInput } from "@src/components/form/UsernameInput";
import post from "@src/util/http/post";

type FormData = {
  username: string;
  email: string;
  password: string;
};

const Register: React.FC = () => {
  const {
    query: {
      username,
    },
  } = useRouter();
  const { control, setValue, handleSubmit, formState, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      username,
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    setValue("username", username);
  }, [ username ]);

  const onSubmit = (async (data) => {
    try {
      await post(`${process.env.NEXT_PUBLIC_API_URI}/users`, data);
    } catch (error) {
      console.log(error); // plug into error handling
    }

    // dispatch to user reducer, and authenticate
    // dispatch(USER.AUTHENTICATE, { form // userData })
  });

  return (
    <View style={styles.container}>
      <Header />

      <PageContent>
        <Heading style={[ headerStyles.center ]}>
          Register
        </Heading>

        <Heading style={[ headerStyles.h3, headerStyles.center ]}>
          Create an account for free - forever!
        </Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ color: "red" }}>
            <pre>
              {Object.keys(errors).length > 0 && (
                <label>Errors: {JSON.stringify(errors, null, 2)}</label>
              )}
            </pre>
          </div>

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <UsernameInput
                defaultValue={value}
                onChange={value => onChange(value)}
                showHelpText={true}
              />
            )}
            name={"username"}
            rules={{ required: true }}
          />

          <Controller
            control={control}
            render={({ field: { onChange } }) => (
              <TextInput
                placeholder={"Email"}
                textContentType={"emailAddress"}
                onChange={value => onChange(value)}
              />
            )}
            name={"email"}
            rules={{ required: true }}
          />

          <Controller
            control={control}
            render={({ field: { onChange } }) => (
              <TextInput
                secureTextEntry={true}
                placeholder={"Password"}
                textContentType={"password"}
                onChange={value => onChange(value)}
              />
            )}
            name={"password"}
            rules={{ required: true }}
          />

          <Button
            accessibilityLabel={"submit"}
            color={"rgb(255,113,0)"}
            title={"Register"}
            onPress={handleSubmit(onSubmit)}
          />
        </form>
      </PageContent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});

export default Register;
