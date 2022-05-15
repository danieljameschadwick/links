import React from "react";
import { View } from "react-native";
import Header from "@src/components/layout/header";
import { GetStartedPanel } from "@src/components/homepage/panel/GetStartedPanel";

const Index: React.FC = () => {
  return (
    <View>
      <Header />

      <GetStartedPanel />
    </View>
  );
};

export default Index;
