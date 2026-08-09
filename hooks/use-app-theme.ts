import { Colors } from "@/constants/theme";
import { useSettings } from "@/contexts/SettingsContext";
import { Platform, useColorScheme } from "react-native";

export function useAppTheme() {
  const systemColorScheme = useColorScheme();
  const { themeMode } = useSettings();

  const activeThemeMode =
    themeMode === "system"
      ? systemColorScheme ?? "light"
      : themeMode;

  const theme = Colors[activeThemeMode];

  const cardContainerStyle =
    activeThemeMode === "dark"
      ? {
          borderWidth: 1,
          borderColor: theme.border,
        }
      : Platform.OS === "ios"
      ? {
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.06,
          shadowRadius: 4,
        }
      : {
          borderWidth: 1,
          borderColor: theme.border,
        };

  return {
    theme,
    activeThemeMode,
    cardContainerStyle,
  };
}