import React from "react";
import StyleSheet from "react-native-media-query";
import { View, Text } from "react-native";
import { Panel } from "@src/components/layout/Panel";

const { ids, styles } = StyleSheet.create({
  panelContainer: {
    display: "flex",
    alignItems: "center",
  },
  columnContainer: {
    height: 400,
    width: 850,
    display: "flex",
    flexDirection: "row",
    "@media (max-width: 850px)": {
      width: "100%",
      height: "auto",
      flexDirection: "column",
      flexWrap: "wrap",
    }
  },
  column: {
    width: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    "@media (max-width: 850px)": {
      width: "100%",
    }
  },
  heading: {
    fontSize: 36,
    marginBottom: 10,
  },
  headingAccent: {
    color: "rgb(255,113,0)",
    fontWeight: "bold",
  },
  subHeading: {
    fontSize: 18,
    color: "rgb(38, 50, 56)",
  },
});

export const UseAnywherePanel: React.FC = () => {
  return (
    <Panel style={styles.panelContainer}>
      <View style={styles.columnContainer} dataSet={{ media: ids.columnContainer }}>
        <View style={styles.column} dataSet={{ media: ids.column }}>
          <View>
            <Text style={styles.heading}>
              Use <Text style={styles.headingAccent}>links</Text> everywhere.
            </Text>
            <Text style={styles.subHeading}>
              Reach your target audiences with a single click.
            </Text>
          </View>
        </View>

        <View style={styles.column} dataSet={{ media: ids.column }}>
          {/* @TODO: add native library supported by web */}
          <video
            style={{ height: "auto", maxHeight: "100%", maxWidth: "100%" }}
            src={"/assets/link_to_anywhere.mp4"}
            loop={true}
            autoPlay={true}
            muted={true}
          />
        </View>
      </View>
    </Panel>
  );
};
