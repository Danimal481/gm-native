import { GradeBadge } from '@/components/GradeBadge';
import { GradeChart } from '@/components/GradeChart';
import { NumberStepper } from '@/components/NumberStepper';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getLetterGrade, RoundingMode, roundPercentage } from '@/constants/grading';
import { Colors } from '@/constants/theme';
import { useSettings } from '@/contexts/SettingsContext';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

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

  const rawPercentage =
  totalPoints > 0
    ? (pointsEarned / totalPoints ) * 100
    : 0;
  
  const percentage = roundPercentage(
  rawPercentage,
  roundingMode
);

  const letterGrade = getLetterGrade(percentage, gradeScale);
 
  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: Colors.light.background,
        dark: Colors.dark.background,
      }}
      headerImage={
        <Image
          source={require('@/assets/images/grademaster-logo.png')}
          style={styles.logo}
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
          onChange={setPointsEarned}
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
            pressed && styles.roundingPillPressed,
          ]}
        >
          <Text style={styles.roundingPillText}>
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

  logo: {
    height: 228,
    width: 360,
    top: 95,
    alignSelf: 'center',
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
    color: "#E8EDF5",
    fontSize: 14,
    fontWeight: '600',
  },
});