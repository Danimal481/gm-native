import { GradeScaleRow } from '@/components/GradeScaleRow';
import { NumberStepper } from '@/components/NumberStepper';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { RoundingSelector } from '@/components/RoundingSelector';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ThemeSelector } from '@/components/ThemeSelector';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { GradeMasterLinks } from '@/constants/links';
import { Fonts } from '@/constants/theme';
import { useSettings } from '@/contexts/SettingsContext';
import { useAppTheme } from "@/hooks/use-app-theme";
import * as Application from 'expo-application';
import Constants from 'expo-constants';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef } from 'react';
import {
  Alert,
  Animated, KeyboardAvoidingView,
  Linking,
  Platform, Pressable, StyleSheet
} from 'react-native';

export default function SettingsScreen() {
  const {
    themeMode,
    setThemeMode,
    roundingMode,
    setRoundingMode,
    defaultTotalPoints,
    setDefaultTotalPoints,
    gradeScale,
    setGradeScale,
    resetPreferences,
  } = useSettings();
  const { highlight } = useLocalSearchParams<{
    highlight?: string;
  }>();
  const highlightOpacity = useRef(new Animated.Value(0)).current;
  const { theme, cardContainerStyle } = useAppTheme();
  
  const appVersion =
  Application.applicationName === 'Expo Go'
    ? Constants.expoConfig?.version ?? 'Development'
    : Application.nativeApplicationVersion ?? 'Development';

const buildVersion =
  Application.applicationName === 'Expo Go'
    ? Constants.expoConfig?.android?.versionCode?.toString() ??
      Constants.expoConfig?.ios?.buildNumber ??
      'Dev'
    : Application.nativeBuildVersion ?? 'Dev';

  useEffect(() => {
  if (highlight !== "rounding") {
    return;
  }

  highlightOpacity.setValue(0);

  Animated.sequence([
    Animated.timing(highlightOpacity, {
      toValue: 1,
      duration: 250,
      useNativeDriver: false,
    }),
    Animated.delay(800),
    Animated.timing(highlightOpacity, {
      toValue: 0,
      duration: 400,
      useNativeDriver: false,
    }),
  ]).start(() => {
    router.setParams({ highlight: undefined });
  });
}, [highlight, highlightOpacity]);

  return (
  <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={0}
>
    <ParallaxScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        paddingBottom: 16
      }}
      headerBackgroundColor={{
        light: theme.background,
        dark: theme.background,
      }}
      headerImage={
        <IconSymbol
          color={theme.tint}
          size={310}
          name="gearshape.fill"
          style={styles.headerImage}
        />
      }
     >
      
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={styles.title}>
          Settings
        </ThemedText>
      </ThemedView>

      <ThemedView
  style={[
    styles.settingCard,
    styles.appInfoCard,
    { backgroundColor: theme.card },
    cardContainerStyle,
  ]}
>
  <ThemedView
    style={[
      styles.appInfoHeader,
      { backgroundColor: theme.card },
    ]}
  >
    <ThemedView
      style={[
        styles.appInfoText,
        { backgroundColor: theme.card },
      ]}
    >
      <ThemedText style={styles.appInfoTitle}>
        GradeMaster
      </ThemedText>

      <ThemedText style={styles.versionText}>
        Version {appVersion}
      </ThemedText>

      <ThemedText style={styles.versionText}>
        Build {buildVersion}
      </ThemedText>
    </ThemedView>

    <Image
      source={require('@/assets/images/gm-app-trans.png')}
      style={styles.appInfoLogo}
      contentFit="contain"
    />
  </ThemedView>

  <ThemedText>
    A fast, offline-friendly grade calculator for teachers. No account required.
  </ThemedText>

  <Pressable
    onPress={() => {
      void Linking.openURL(GradeMasterLinks.whatsNew);
    }}
    style={({ pressed }) => [
      styles.actionButton,
      {
        backgroundColor: theme.background,
        borderColor: theme.border,
      },
      pressed && styles.actionButtonPressed,
    ]}
  >
    <ThemedText
      style={[
        styles.actionButtonText,
        { color: theme.tint },
      ]}
    >
      What's New
    </ThemedText>
  </Pressable>
</ThemedView>

    <Animated.View
      style={[
        styles.roundingCard,
        {
          borderColor: highlightOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: ["transparent", theme.tint],
          }),
        },
      ]}
      >
      <RoundingSelector value={roundingMode} onChange={setRoundingMode} />
    </Animated.View>

    <NumberStepper label="Default Total Points" value={defaultTotalPoints} onChange={setDefaultTotalPoints} min={1} />

  <ThemeSelector value={themeMode} onChange={setThemeMode} />

  <ThemedView
  style={[
    styles.settingCard,
    { backgroundColor: theme.card },
    cardContainerStyle,
  ]}
>
    <ThemedText style={styles.cardTitle}>Grade Scale</ThemedText>
    <ThemedText>Set the minimum percentage for each grade.</ThemedText>
    <GradeScaleRow letter="A" value={gradeScale.A} min={gradeScale.B + 1} max={100} onChange={(value) => setGradeScale ({ ... gradeScale, A: value, })} />
    <GradeScaleRow letter="B" value={gradeScale.B} min={gradeScale.C + 1} max={gradeScale.A - 1} onChange={(value) => setGradeScale ({ ... gradeScale, B: value, })} />
    <GradeScaleRow letter="C" value={gradeScale.C} min={gradeScale.D + 1} max={gradeScale.B - 1} onChange={(value) => setGradeScale ({ ... gradeScale, C: value, })} />
    <GradeScaleRow letter="D" value={gradeScale.D} min={1} max={gradeScale.C - 1} onChange={(value) => setGradeScale ({ ... gradeScale, D: value, })} />
  </ThemedView>

  <ThemedView
  style={[
    styles.settingCard,
    { backgroundColor: theme.card },
    cardContainerStyle,
  ]}
>
  <ThemedText style={styles.cardTitle}>
    Privacy
  </ThemedText>

  <ThemedText>
    GradeMaster stores your preferences locally on your device.
    Your grade calculations are not sent to GradeMaster or stored
    on an external server.
  </ThemedText>

  <Pressable
    onPress={() => {
      void Linking.openURL(GradeMasterLinks.privacy);
    }}
    style={({ pressed }) => [
      styles.actionButton,
      {
        backgroundColor: theme.background,
        borderColor: theme.border,
      },
      pressed && styles.actionButtonPressed,
    ]}
  >
    <ThemedText
      style={[
        styles.actionButtonText,
        { color: theme.tint },
      ]}
    >
      Privacy Policy
    </ThemedText>
  </Pressable>
</ThemedView>

<ThemedView
  style={[
    styles.settingCard,
    { backgroundColor: theme.card },
    cardContainerStyle,
  ]}
>
  <ThemedText style={styles.cardTitle}>
    Support
  </ThemedText>

  <ThemedText>
    Have a question, found a problem, or want to share feedback?
  </ThemedText>

  <Pressable
    onPress={() => {
      void Linking.openURL(GradeMasterLinks.support);
    }}
    style={({ pressed }) => [
      styles.actionButton,
      {
        backgroundColor: theme.background,
        borderColor: theme.border,
      },
      pressed && styles.actionButtonPressed,
    ]}
  >
    <ThemedText
      style={[
        styles.actionButtonText,
        { color: theme.tint },
      ]}
    >
      Support Page
    </ThemedText>
  </Pressable>

  <Pressable
    onPress={() => {
      void Linking.openURL(
        `mailto:${GradeMasterLinks.supportEmail}?subject=GradeMaster Support`
      );
    }}
    style={({ pressed }) => [
      styles.actionButton,
      {
        backgroundColor: theme.background,
        borderColor: theme.border,
      },
      pressed && styles.actionButtonPressed,
    ]}
  >
    <ThemedText
      style={[
        styles.actionButtonText,
        { color: theme.tint },
      ]}
    >
      Email Support
    </ThemedText>
  </Pressable>
</ThemedView>

 <ThemedView
  style={[
    styles.settingCard,
    { backgroundColor: theme.card },
    cardContainerStyle,
  ]}
>
  <ThemedText style={styles.cardTitle}>
    Reset Preferences
  </ThemedText>

  <ThemedText>
    Restore all app preferences to their default settings.
  </ThemedText>

  <Pressable
    onPress={() => {
      Alert.alert(
        "Reset Preferences?",
        "This will restore your theme, rounding mode, default total points, and grade scale to their defaults.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Reset",
            style: "destructive",
            onPress: () => {
              void resetPreferences();
            },
          },
        ]
      );
    }}
    style={({ pressed }) => [
      styles.actionButton,
      {
        backgroundColor: theme.danger,
        borderColor: theme.danger,
      },
      pressed && styles.actionButtonPressed,
    ]}
  >
    <ThemedText
      style={[
        styles.actionButtonText,
        { color: '#FFFFFF' },
      ]}
    >
      Reset Preferences
    </ThemedText>
  </Pressable>
</ThemedView> 
</ParallaxScrollView>
</KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },

  title: {
    fontFamily: Fonts.rounded,
  },

  settingCard: {
    borderRadius: 16,
    padding: 16,
    gap: 16,
  },

  roundingCard: {
    borderRadius: 16,
    borderWidth: 2,   
  },

  cardTitle: {
  fontSize: 18,
  fontWeight: '600',
},

actionButton: {
  alignSelf: 'flex-start',
  paddingHorizontal: 16,
  paddingVertical: 10,
  borderRadius: 10,
  borderWidth: 1,
},

actionButtonPressed: {
  opacity: 0.65,
},

actionButtonText: {
  fontWeight: '600',
},

appInfoCard: {
  gap: 12,
},

appInfoHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
},

appInfoText: {
  flex: 1,
  gap: 2,
},

appInfoTitle: {
  fontSize: 20,
  fontWeight: '700',
},

versionText: {
  fontSize: 13,
  opacity: 0.7,
},

appInfoLogo: {
  width: 64,
  height: 64,
  marginLeft: 16,
},

});
