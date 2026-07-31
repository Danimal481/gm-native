import { GradeScaleRow } from '@/components/GradeScaleRow';
import { NumberStepper } from '@/components/NumberStepper';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { RoundingSelector } from '@/components/RoundingSelector';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ThemeSelector } from '@/components/ThemeSelector';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
import { useSettings } from '@/contexts/SettingsContext';
import { useAppTheme } from "@/hooks/use-app-theme";
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';

export default function SettingsScreen() {
  const { themeMode, setThemeMode } = useSettings();
  const { roundingMode, setRoundingMode } = useSettings();
  const { defaultTotalPoints, setDefaultTotalPoints } = useSettings();
  const { gradeScale, setGradeScale } = useSettings();
  const { highlight } = useLocalSearchParams<{
    highlight?: string;
  }>();
  const highlightOpacity = useRef(new Animated.Value(0)).current;
  const { theme} = useAppTheme();

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
  ]}
>
    <ThemedText style={[{ fontSize: 18, fontWeight: '600', }]}>Grade Scale</ThemedText>
    <ThemedText>Set the minimum percentage for each grade.</ThemedText>
    <GradeScaleRow letter="A" value={gradeScale.A} min={gradeScale.B + 1} max={100} onChange={(value) => setGradeScale ({ ... gradeScale, A: value, })} />
    <GradeScaleRow letter="B" value={gradeScale.B} min={gradeScale.C + 1} max={gradeScale.A - 1} onChange={(value) => setGradeScale ({ ... gradeScale, B: value, })} />
    <GradeScaleRow letter="C" value={gradeScale.C} min={gradeScale.D + 1} max={gradeScale.B - 1} onChange={(value) => setGradeScale ({ ... gradeScale, C: value, })} />
    <GradeScaleRow letter="D" value={gradeScale.D} min={1} max={gradeScale.C - 1} onChange={(value) => setGradeScale ({ ... gradeScale, D: value, })} />
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

});
