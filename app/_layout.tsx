import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";

import { Colors } from "@/constants/theme";
import {
  SettingsProvider,
  useSettings,
} from "@/contexts/SettingsContext";
import { recordAppOpen } from "@/utils/reviewPrompt";
import { useEffect } from "react";

export default function RootLayout() {
  return (
    <SettingsProvider>
      <RootNavigator />
    </SettingsProvider>
  );
}

function RootNavigator() {
  const systemColorScheme = useColorScheme();
  const { themeMode, settingsLoaded } = useSettings();

  useEffect(() => {
    if (!settingsLoaded) {
      return;
    }

    void recordAppOpen();
  }, [settingsLoaded]);

  const activeThemeMode =
    themeMode === "system"
      ? systemColorScheme ?? "light"
      : themeMode;

  const theme = Colors[activeThemeMode];

  const baseNavigationTheme =
    activeThemeMode === "dark"
      ? DarkTheme
      : DefaultTheme;

  const navigationTheme = {
    ...baseNavigationTheme,
    colors: {
      ...baseNavigationTheme.colors,
      primary: theme.tint,
      background: theme.background,
      card: theme.card,
      text: theme.text,
      border: theme.border,
      notification: theme.tint,
    },
  };

  if (!settingsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={navigationTheme}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="expanded-chart"
          options={{
            title: "Grade Chart",
            headerStyle: {
              backgroundColor: theme.background,
            },
            headerTintColor: theme.text,
          }}
        />

        <Stack.Screen
          name="modal"
          options={{
            presentation: "modal",
            title: "Modal",
          }}
        />
      </Stack>

      <StatusBar
        style={activeThemeMode === "dark" ? "light" : "dark"}
      />
    </ThemeProvider>
  );
}