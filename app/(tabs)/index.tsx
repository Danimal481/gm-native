import { Image } from 'expo-image';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

import { GradeChart } from '@/components/GradeChart';
import { NumberStepper } from '@/components/NumberStepper';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';

export default function HomeScreen() {
  const [totalQuestions, setTotalQuestions] = useState(20);
  const [correct, setCorrect] = useState(15);

  function handleTotalQuestionsChange(newTotal: number) {
    setTotalQuestions(newTotal);
    setCorrect((currentCorrect) => Math.min(currentCorrect, newTotal));
  }

  const percentage =
    totalQuestions > 0 ? Math.round((correct / totalQuestions) * 100) : 0;

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

        <ThemedText type="defaultSemiBold">
          {correct} correct out of {totalQuestions} is a score of {percentage}%
        </ThemedText>
      </ThemedView>

      <GradeChart totalQuestions={totalQuestions} correct={correct} />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
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