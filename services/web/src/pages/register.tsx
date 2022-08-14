import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { Header } from "@src/components/layout/Header";
import { PageContent } from "@src/components/layout/PageContent";
import { Heading, headerStyles } from "@src/components/layout/text/h1";
import { TextInput } from "@src/components/form/TextInput";
import { UsernameInput } from "@src/components/form/UsernameInput";
import post from "@src/util/http/post";
import { Button } from "@src/components/form/Button";
import { useAppDispatch, useAppSelector } from "@links/state/hooks";
import { selectStoreUser } from "@links/state/reducer/UserReducer";

type FormData = {
  username: string;
  email: string;
  password: string;
};

const Register: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const storeUser = useAppSelector(selectStoreUser);
  const { query } = router;
  const username = query.username as string;

  const { control, setValue, handleSubmit, formState, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      username: username || "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    setValue("username", username);
  }, [ username ]);

  useEffect(() => {
    if (!storeUser) {
      return;
    }

    router.push('/user/settings');
  }, [storeUser]);

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
                defaultValue={value || ""}
                onChange={value => onChange(value)}
                showHelpText={true}
              />
            )}
            name={"username"}
            rules={{ required: true }}
          />

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder={"Email"}
                autoComplete={"email"}
                textContentType={"emailAddress"}
                defaultValue={value || ""}
                onChange={value => onChange(value)}
              />
            )}
            name={"email"}
            rules={{ required: true }}
          />

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                secureTextEntry
                autoComplete={"password"}
                placeholder={"Password"}
                defaultValue={value || ""}
                textContentType={"password"}
                onChange={value => onChange(value)}
              />
            )}
            name={"password"}
            rules={{ required: true }}
          />

          <Button
            text={"Register"}
            accessibilityLabel={"Register"}
            buttonStyles={buttonStyles}
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

const buttonStyles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: "rgb(255,113,0)",
    height: 40,
  },
});

export default Register;
