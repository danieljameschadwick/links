import React, { createContext, useEffect, useReducer, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import Head from "next/head";
import { useRouter } from "next/router";
import UserProfile from "@src/components/profile/UserProfile";
import { fetchUser } from "@src/pages/page/actions";
import Error404 from "@src/pages/404";
import ExternalLink from "@links/ui/components/links/ExternalLink";
import InvalidArgumentError from "@src/error/InvalidArgumentError";
import {
  UserProfileActionType,
  UserProfileReducer,
} from "@src/reducers/user/UserProfileReducer";
import { Z_INDEXES } from "@src/enum/zIndex";
import { FluidPageContent } from "@src/components/layout/FluidPageContent";

const initialState = {
  user: null,
  showSidebar: false,
};

export const ProfileDispatchContext = createContext(initialState);
export const ProfileStateContext = createContext(initialState);

const UserPage: React.FC = () => {
  const router = useRouter();

  const { username = undefined } = router.query;
  const [httpStatus, setHttpStatus] = useState<number | null>(null);
  const [state, dispatch] = useReducer(UserProfileReducer, initialState);
  const { user = undefined } = state;

  useEffect(() => {
    const fetchData = async () => {
      if (!username) throw new InvalidArgumentError();

      await dispatch({
        type: UserProfileActionType.UPDATE_USER,
        payload: await fetchUser(username as string),
      });
    };

    fetchData()
      .then(() => {
        setHttpStatus(200);
      })
      .catch((error) => {
        if (error instanceof InvalidArgumentError) {
          return; // no fetch occurred, username not set
        }

        setHttpStatus(404); // @TODO: improve error handling/logging/rather than catch all
      });
  }, [username]);

  if (httpStatus === null) {
    return null;
  }

  if (!user && httpStatus !== 200) {
    return <Error404 />;
  }

  const { userProfile } = user;
  const profileStyles = StyleSheet.create({
    container: {
      display: "flex",
      width: "100%",
      height: "100%",
      ...userProfile.styles.container, // @TODO: override API styling
    },
  });

  return (
    <FluidPageContent>
      <Head>
        <title>Links | {username}</title>
      </Head>

      <ProfileDispatchContext.Provider value={dispatch}>
        <ProfileStateContext.Provider value={state}>
          <View style={profileStyles.container}>
            <UserProfile />
          </View>
        </ProfileStateContext.Provider>
      </ProfileDispatchContext.Provider>

      <View style={footerStyles.container}>
        <Text style={footerStyles.text}>
          Powered by{" "}
          <ExternalLink
            style={footerStyles.brandText}
            url={"/"}
            openInANewTab={false}
          >
            <Text>links</Text>
          </ExternalLink>
          .
        </Text>

        <Text style={footerStyles.text}>
          Create your own profile{" "}
          <ExternalLink
            style={footerStyles.linkText}
            url={"/register"}
            openInANewTab={false}
          >
            <Text>here</Text>
          </ExternalLink>
          .
        </Text>
      </View>
    </FluidPageContent>
  );
};

const footerStyles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: "10px", 
    width: "100%",
    textAlign: "center",
  },
  text: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "rgb(255,255,255)",
    marginBottom: "10px",
  },
  brandText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "rgb(255,113,0)",
  },
  linkText: {
    textDecorationLine: "underline",
    color: "rgb(255,113,0)",
  },
});

export default UserPage;
