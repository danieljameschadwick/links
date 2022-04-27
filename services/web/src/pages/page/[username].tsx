import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Head from "next/head";
import { useRouter } from "next/router";
import Profile from "@src/components/profile/Profile";
import { fetchProfile } from "@src/pages/page/actions";
import { ProfileInterface } from "@src/interfaces/ProfileInterface";
import Loading from "@src/components/loading";
import Error404 from "@src/pages/404";

const UserProfile: React.FC = () => {
  const router = useRouter();
  const {
    username = undefined
  } = router.query;
  const [ profile, setProfile ] = useState<ProfileInterface | null>();
  const [ httpStatus, setHttpStatus ] = useState<number | null>();

  useEffect(() => {
    const fetchData = async () => {
      if (!username) return;

      setProfile(await fetchProfile(username as string));
    };

    fetchData()
      .catch(() => {
        setHttpStatus(404); // @TODO: improve error handling/logging/rather than catch all
      });
  }, [ username ]);

  if (httpStatus === null) {
    return <Loading />;
  }

  if (!profile && httpStatus !== 200) {
    return <Error404 />;
  }

  const profileStyles = StyleSheet.create({
    container: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "black", // @TODO: derive from API
      width: "100%",
      height: "100%",
      // ...styles.container, // @TODO: override API styling
    },
  });

  return (
    <>
      <Head>
        <title>Links | {username}</title>
      </Head>

      {/*<ProfileProvider>*/}
      <View style={profileStyles.container}>
        <Profile profile={profile} />
      </View>
      {/*</ProfileProvider>*/}
    </>
  );
};

export default UserProfile;
