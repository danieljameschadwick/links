import React from "react";
import {
  Animated,
  StyleProp,
  TouchableWithoutFeedback,
  StyleSheet,
  GestureResponderHandlers,
} from "react-native";

interface BlockProps {
  style?: StyleProp<any>;
  dragStartAnimationStyle: StyleProp<any>;
  onPress?: () => void;
  onLongPress: () => void;
  panHandlers: GestureResponderHandlers;
  delayLongPress: number;
}

export const Block: React.FC<BlockProps> = ({
  style,
  dragStartAnimationStyle,
  onPress,
  onLongPress,
  children,
  panHandlers,
  delayLongPress,
}) => {
  return (
    <Animated.View
      style={[styles.blockContainer, style, dragStartAnimationStyle]}
      {...panHandlers}
    >
      <Animated.View>
        <TouchableWithoutFeedback
          delayLongPress={delayLongPress}
          onPress={onPress}
          onLongPress={onLongPress}
        >
          {children}
        </TouchableWithoutFeedback>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  blockContainer: {
    alignItems: "center",
  },
});
