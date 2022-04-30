import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import Head from "next/head";
import { useRouter } from "next/router";
import UserProfile from "@src/components/profile/UserProfile";
import { fetchUser } from "@src/pages/page/actions";
import { UserProfileInterface } from "@src/interfaces/ProfileInterface";
import Loading from "@src/components/loading";
import Error404 from "@src/pages/404";
import ExternalLink from "@links/ui/components/links/ExternalLink";
import { UserInterface } from "@src/interfaces/UserInterface";
import profile from "@src/pages/settings/profile";

const footerStyles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: "10px",
    width: "100%",
    textAlign: "center",
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

const UserPage: React.FC = () => {
  const router = useRouter();
  const {
    username = undefined
  } = router.query;
  const [ user, setUser ] = useState<UserInterface | null>();
  const [ httpStatus, setHttpStatus ] = useState<number | null>();

  useEffect(() => {
    const fetchData = async () => {
      if (!username) return;

      setUser(await fetchUser(username as string));
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

      {/*<ProfileProvider>*/}
      <View style={profileStyles.container}>
        <UserProfile profile={userProfile} />
      </View>
      {/*</ProfileProvider>*/}

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
