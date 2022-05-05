import React, { createContext, useEffect, useReducer, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import Head from "next/head";
import { useRouter } from "next/router";
import UserProfile from "@src/components/profile/UserProfile";
import { fetchUser } from "@src/pages/page/actions";
import Loading from "@src/components/loading";
import Error404 from "@src/pages/404";
import ExternalLink from "@links/ui/components/links/ExternalLink";
import { UserInterface } from "@src/interfaces/UserInterface";

const footerStyles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: "10px",
    width: "100%",
    textAlign: "center",
    zIndex: 3, // content + 1
  },
  text: {
    color: "white",
    marginBottom: "10px",
  },
  brandText: {
    fontWeight: "bold",
  },
  linkText: {
    textDecorationLine: "underline"
  },
});

const UserReducer = (
  state: { user: UserInterface | null },
  action: { type: string, payload: UserInterface }
) => {
  switch (action.type) {
    case "updateUser":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

const initialState = {
  user: null,
};

export const ProfileStateContext = createContext({});
export const ProfileDispatchContext = createContext({});

const UserPage: React.FC = () => {
  const router = useRouter();

  const { username = undefined } = router.query;
  const [ httpStatus, setHttpStatus ] = useState<number | null>();
  const [ state, dispatch ] = useReducer(UserReducer, initialState);
  const { user = undefined } = state;

  useEffect(() => {
    const fetchData = async () => {
      if (!username) return;

      dispatch({ type: "updateUser", payload: await fetchUser(username as string) });
    };

    fetchData()
      .catch(() => {
        setHttpStatus(404); // @TODO: improve error handling/logging/rather than catch all
      });
  }, [ username ]);

  if (httpStatus === null) {
    return <Loading />;
  }

  if (!user && httpStatus !== 200) {
    return <Error404 />;
  }

  const { userProfile } = user;
  const profileStyles = StyleSheet.create({
    container: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      height: "100%",
      ...userProfile.styles, // @TODO: override API styling
    },
  });

  return (
    <>
      <Head>
        <title>Links | {username}</title>
      </Head>

      <ProfileDispatchContext.Provider value={dispatch}>
        <ProfileStateContext.Provider value={state}>
          <View style={profileStyles.container}>
            <UserProfile profile={userProfile} />
          </View>
        </ProfileStateContext.Provider>
      </ProfileDispatchContext.Provider>

      <View style={footerStyles.container}>
        <Text style={footerStyles.text}>
          Powered by <Text style={footerStyles.brandText}>links</Text>.
        </Text>

        <Text style={footerStyles.text}>
          Create your own profile <ExternalLink style={footerStyles.linkText} url={"/"} openInANewTab={false}>here</ExternalLink>.
        </Text>
      </View>
    </>
  );
};

export default UserPage;
