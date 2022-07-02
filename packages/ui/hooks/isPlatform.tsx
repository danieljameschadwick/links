import { Platforms } from "../util/enum/Platforms";
import { Platform } from "react-native";

interface PlatformType {
  isWeb: boolean;
  isiOS: boolean;
  isAndroid: boolean;
}

export const isPlatform = (): PlatformType => {
  return {
    isWeb: Platform.OS === Platforms.WEB,
    isiOS: Platform.OS === Platforms.iOS,
    isAndroid: Platform.OS === Platforms.ANDROID,
  }
};
