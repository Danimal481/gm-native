import { GradeBadge } from '@/components/GradeBadge';
import { GradeChart } from '@/components/GradeChart';
import { NumberStepper } from '@/components/NumberStepper';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { RoundingSelector } from '@/components/RoundingSelector';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getLetterGrade, RoundingMode, roundPercentage } from '@/constants/grading';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Image } from 'expo-image';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const [totalQuestions, setTotalQuestions] = useState(20);
  const [correct, setCorrect] = useState(15);

  function handleTotalQuestionsChange(newTotal: number) {
    setTotalQuestions(newTotal);
    setCorrect((currentCorrect) => Math.min(currentCorrect, newTotal));
  }

  const rawPercentage =
  totalQuestions > 0
    ? (correct / totalQuestions) * 100
    : 0;
  
  const [roundingMode, setRoundingMode] =
  useState<RoundingMode>("nearest");

  const percentage = roundPercentage(
  rawPercentage,
  roundingMode
);

  const letterGrade = getLetterGrade(percentage);
 
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
      }>

      <ThemedView style={styles.stepContainer}>
        <NumberStepper
          label="Total Points"
          value={totalQuestions}
          onChange={handleTotalQuestionsChange}
          min={1}
        />

        <NumberStepper
          label="Correct"
          value={correct}
          onChange={setCorrect}
          min={0}
          max={totalQuestions}
        />
        <RoundingSelector value={roundingMode} onChange={setRoundingMode} />
      
      <ThemedView style={styles.summaryContainer}>
        <ThemedText type="defaultSemiBold" style={styles.summaryText}>
          {correct} / {totalQuestions} = {percentage}%          
          </ThemedText>
            <GradeBadge grade={letterGrade} />
            
        </ThemedView>
      </ThemedView>

      <GradeChart totalQuestions={totalQuestions} correct={correct} roundingMode={roundingMode} />
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
});