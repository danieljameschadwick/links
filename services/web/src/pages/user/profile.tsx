import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Header } from "@src/components/layout/Header";
import { Heading, headerStyles } from "@src/components/layout/text/h1";
import { PageContent } from "@src/components/layout/PageContent";
import { useAppSelector } from "@src/app/hooks";
import { selectUser } from "@src/app/reducer/UserReducer";
import { useRouter } from "next/router";

const Profile: React.FC = () => {
  const router = useRouter();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (user) {
      return;
    }

    router.push('/login');
  }, [user]);

  return (
    <View style={styles.container}>
      <Header />

      <PageContent>
        <Heading style={[ headerStyles.center ]}>
          Profile
        </Heading>

        <Text>
          {user.name}
        </Text>
      </PageContent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});

export default Profile;
