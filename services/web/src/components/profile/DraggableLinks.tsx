import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
  View,
  Text,
} from "react-native-web";
import { LinkInterface } from "@links/types/interfaces/LinkInterface";
import Link from "@links/ui/components/links/Link";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { withRouter } from "next/router";

interface Item {
  key: string;
  label: string;
  height: number;
  width: number;
  backgroundColor: string;
  link: LinkInterface;
}

interface RenderItemParams<T> {
  item: T;
  drag: GestureResponderEvent | any;
  isActive: boolean;
}

const formatLinksData = (links: LinkInterface[]) => {
  return links.map((link, index) => {
    return {
      key: `item-${index}`,
      label: String(index) + "",
      height: 100,
      width: 60 + Math.random() * 40,
      link,
    };
  });
};

export const DraggableLinks = ({ links }) => {
  const [data, setData] = useState(formatLinksData(links));

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Item>) => {
    const {
      link: { id, text, url, styles: linkStyles, logo = null },
    } = item;

    return (
      <ScaleDecorator>
        <TouchableOpacity
          onPress={drag}
          onLongPress={drag}
          disabled={isActive}
        >
          <Link
              key={id}
              text={text}
              url={url}
              styles={linkStyles}
              logo={logo}
              disabled={true}
            />
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <DraggableFlatList
        data={data}
        onDragEnd={({ data }) => setData(data)}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
      />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  rowItem: {
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});
