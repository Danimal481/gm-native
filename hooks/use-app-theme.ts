import { Colors } from "@/constants/theme";
import { useSettings } from "@/contexts/SettingsContext";
import { useColorScheme } from "react-native";

export function useAppTheme() {
  const systemColorScheme = useColorScheme();
  const { themeMode } = useSettings();

  const activeThemeMode =
    themeMode === "system"
      ? systemColorScheme ?? "light"
      : themeMode;

  return {
    theme: Colors[activeThemeMode],
    activeThemeMode,
  };
}