import { GradeBadge } from '@/components/GradeBadge';
import { GradeChart } from '@/components/GradeChart';
import { NumberStepper } from '@/components/NumberStepper';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getLetterGrade, RoundingMode, roundPercentage } from '@/constants/grading';
import { useSettings } from '@/contexts/SettingsContext';
import { useAppTheme } from '@/hooks/use-app-theme';
import { recordCalculationAndMaybeRequestReview } from "@/utils/reviewPrompt";
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const roundingLabels: Record<RoundingMode, string> = {
  nearest: 'Rounding to Nearest',
  up: 'Rounding Up',
  down: 'Rounding Down',
  oneDecimal: 'Rounding to One Decimal',
  twoDecimals: 'Rounding to Two Decimals',
};

export default function HomeScreen() {
   const { defaultTotalPoints,
        roundingMode,
        gradeScale,
        settingsLoaded,
} = useSettings();

  const [totalPoints, setTotalPoints] = useState(defaultTotalPoints);
  const [pointsEarned, setPointsEarned] = useState(defaultTotalPoints);

  const calculatorInitialized = useRef(false);
  
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const insets = useSafeAreaInsets();

useEffect(() => {
  if (settingsLoaded && !calculatorInitialized.current) {
    setTotalPoints(defaultTotalPoints);
    setPointsEarned(defaultTotalPoints);
    calculatorInitialized.current = true;
  }
}, [settingsLoaded, defaultTotalPoints]);
  
  function handleTotalPointsChange(newTotal: number) {
    setTotalPoints(newTotal);
    setPointsEarned((currentPointsEarned) => Math.min(currentPointsEarned, newTotal));
  }

  function handlePointsEarnedChange(newValue: number) {
    setPointsEarned(newValue);
    void recordCalculationAndMaybeRequestReview();
  }

  const rawPercentage =
  totalPoints > 0
    ? (pointsEarned / totalPoints ) * 100
    : 0;
  
  const percentage = roundPercentage(
  rawPercentage,
  roundingMode
);

  const letterGrade = getLetterGrade(percentage, gradeScale);
  const { theme } = useAppTheme();
  
  if (isLandscape) {
    return (
      <ThemedView
        style={[
          styles.landscapeContainer,
          {
            paddingTop: Math.max(insets.top, 12),
            paddingLeft: Math.max(insets.left, 12),
            paddingRight: Math.max(insets.right, 12),
          },
        ]}
      >
        <ScrollView
          style={styles.landscapeCalculator}
          contentContainerStyle={styles.landscapeCalculatorContent}
          showsVerticalScrollIndicator={false}
        >
          <NumberStepper
            label={"Total\nPoints"}
            value={Number(totalPoints)}
            onChange={handleTotalPointsChange}
            min={1}
            compact
          />
          
          <NumberStepper
            label={"Points\nEarned"}
            value={Number(pointsEarned)}
            onChange={handlePointsEarnedChange}
            min={0}
            max={totalPoints}
            compact
          />
          <ThemedView style={styles.summaryContainer}>
        <ThemedText
          type="defaultSemiBold"
          style={styles.summaryText}
        >
          {pointsEarned} / {totalPoints} = {percentage}%
        </ThemedText>

        <GradeBadge grade={letterGrade} />

        <Pressable
          onPress={() =>
            router.push({
              pathname: "/(tabs)/settings",
              params: { highlight: "rounding" },
            })
          }
          style={({ pressed }) => [
            styles.roundingPill,
            { 
              backgroundColor: theme.background,
              borderColor: theme.border,
            },
            pressed && styles.roundingPillPressed,
          ]}
        >
          <Text style={[styles.roundingPillText, { color: theme.text }]}>
            ⚙ {roundingLabels[roundingMode]} -&gt; 
          </Text>
        </Pressable>
        </ThemedView>
      </ScrollView>
      <ThemedView style={styles.landscapeChart}>
        <GradeChart
          totalPoints={Number(totalPoints)}
          pointsEarned={Number(pointsEarned)}
          expanded
          showNavigation={false}
        />
      </ThemedView>
        </ThemedView>         
    );
  }
  
  return (
    <ParallaxScrollView
  headerBackgroundColor={{
    light: theme.background,
    dark: theme.background,
  }}
  headerImage={
    <Image
      source={require('@/assets/images/gm-app-trans.png')}
      style={styles.headerImage}
      contentFit="contain"
    />
  }
>
      <ThemedView style={styles.stepContainer}>
        <NumberStepper
          label="Total Points"
          value={totalPoints}
          onChange={handleTotalPointsChange}
          min={1}
        />

        <NumberStepper
          label="Points Earned"
          value={pointsEarned}
          onChange={handlePointsEarnedChange}
          min={0}
          max={totalPoints}
        />
      </ThemedView>

      <ThemedView style={styles.summaryContainer}>
        <ThemedText
          type="defaultSemiBold"
          style={styles.summaryText}
        >
          {pointsEarned} / {totalPoints} = {percentage}%
        </ThemedText>

        <GradeBadge grade={letterGrade} />

        <Pressable
          onPress={() =>
            router.push({
              pathname: "/(tabs)/settings",
              params: { highlight: "rounding" },
            })
          }
          style={({ pressed }) => [
            styles.roundingPill,
            { 
              backgroundColor: theme.background,
              borderColor: theme.border,
            },
            pressed && styles.roundingPillPressed,
          ]}
        >
          <Text style={[styles.roundingPillText, { color: theme.text }]}>
            ⚙ {roundingLabels[roundingMode]} -&gt; 
          </Text>
        </Pressable>
      </ThemedView>

      <GradeChart
        totalPoints={totalPoints}
        pointsEarned={pointsEarned}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  summaryContainer: {
    alignItems: "center",
    gap: 6,
},

  summaryText: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: 'center',
    gap: 8,
  },

  instructions: {
    marginLeft: 8,
  },

  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },

  headerImage: {
    width: 310,
    height: 310,
    bottom: -90,
    left: -35,
    position: 'absolute',
  },

  roundingPill: {
    alignSelf: 'center',
    marginTop: 14,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    backgroundColor: "#16263A",
    borderColor: "#405574",
  },

  roundingPillPressed: {
    opacity: 0.65,
    transform: [{ scale: 0.95 }],
  },

  roundingPillText: {
    fontSize: 14,
    fontWeight: '600',
  },

  landscapeContainer: {
  flex: 1,
  flexDirection: "row",
  gap: 12,
},

landscapeCalculator: {
  flex: 1,
},

landscapeCalculatorContent: {
  flexGrow: 1,
  justifyContent: "center",
  gap: 12,
  paddingBottom: 12,
},

landscapeChart: {
  flex: 1.3,
},
});