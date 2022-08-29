import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native-web";
import { useOutside } from "@src/util/hooks/clickOutsideRef";
import ExternalLink from "@links/ui/components/links/ExternalLink";
import { useAppSelector } from "@links/state/hooks";
import { selectStoreUser } from "@links/state/reducer/UserReducer";
import Icon from "react-native-vector-icons/AntDesign";

export const HeaderDropdown: React.FC = () => {
  const user = useAppSelector(selectStoreUser);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const wrapperRef = useRef(null);
  useOutside(wrapperRef, setShowMenu);

  const buttonContainer = [styles.buttonContainer];
  const menuStyles = [styles.menuContainer];
  if (showMenu) buttonContainer.push(styles.buttonContainerBottomBorder);
  if (!showMenu) menuStyles.push(styles.hidden);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const { username, name } = user;

  return (
    <View ref={wrapperRef} style={styles.container}>
      <TouchableWithoutFeedback onPress={() => toggleMenu()}>
        <View style={buttonContainer}>
          <Text style={styles.text}>{name}</Text>

          <Text style={styles.icon}>
            {showMenu ? (
              <View style={styles.iconReverse}>
                <Icon name="down" size={12} color="#FFFFFF" />
              </View>
            ) : (
              <Icon name="down" size={12} color="#FFFFFF" />
            )}
          </Text>
        </View>
      </TouchableWithoutFeedback>

      <View style={menuStyles}>
        <ExternalLink
          style={styles.menuLink}
          url={`/page/${username}`}
          openInANewTab={false}
        >
          <Text>Profile</Text>
        </ExternalLink>
        <ExternalLink
          style={styles.menuLink}
          url={"/user/settings"}
          openInANewTab={false}
        >
          <Text>Settings</Text>
        </ExternalLink>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    display: "inline-block",
    marginRight: 8,
  },
  buttonContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    cursor: "pointer",
    padding: 8,
    backgroundColor: "rgb(255, 113, 0)",
    borderRadius: 5,
  },
  buttonContainerBottomBorder: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  text: {
    color: "white",
    fontWeight: 500,
    paddingRight: 6,
    userSelect: "none",
  },
  iconReverse: {
    transform: [{ rotate: "180deg" }],
  },
  menuContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    position: "absolute",
    backgroundColor: "rgb(234, 234, 234)",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    paddingBottom: 2,
  },
  menuLink: {
    flex: 1,
    padding: 7,
    userSelect: "none",
  },
  hidden: {
    display: "none",
  },
});
