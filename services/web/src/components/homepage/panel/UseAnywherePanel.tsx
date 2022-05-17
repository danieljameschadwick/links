import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Panel } from "@src/components/layout/Panel";

const styles = StyleSheet.create({
  columnContainer: {
    height: 400,
    display: "flex",
    flexDirection: "row",
  },
  column: {
    width: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
    <Panel>
      <View style={styles.columnContainer}>
        <View style={styles.column}>
          <View>
            <Text style={styles.heading}>
              Use <Text style={styles.headingAccent}>links</Text> everywhere
            </Text>
            <Text style={styles.subHeading}>
              Reach your target audiences with a single click.
            </Text>
          </View>
        </View>

        {/* @TODO: add native library supported by web, replace linktree source */}
        <video
          style={{ height: "auto" }}
          src={"https://videos.ctfassets.net/lbsm39fugycf/1i6LctbRMzKsEmWCdbZWe8/3aecc0e1dd43fa2e291e9d6778c822ee/link_to_anywhere.mp4"}
          loop={true}
          autoPlay={true}
        />
      </View>
    </Panel>
  );
};
