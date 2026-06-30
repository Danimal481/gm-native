import { Image } from 'expo-image';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

import { Colors } from '@/constants/theme';

import { GradeChart } from '@/components/GradeChart';
import { NumberStepper } from '@/components/NumberStepper';

export default function HomeScreen() {

const [totalQuestions, setTotalQuestions] = useState(20);
const [correct, setCorrect] = useState(15);

function handleTotalQuestionsChange(newTotal: number) {
  setTotalQuestions(newTotal);
  setCorrect((currentCorrect) => Math.min(currentCorrect, newTotal));
}

const totalPoints = Number(totalQuestions);
const correctPoints = Number(correct);
const percentage = 
  totalPoints > 0
  ? Math.round((correctPoints / totalPoints) * 100)
  : 0;

const totalNumber = Number(totalQuestions) || 0;
const correctNumber = Number(correct) || 0;

const gradeRows = [];
for (let earned = totalNumber; earned >= 0; earned--) {
  const rowPercentage =
    totalNumber > 0
      ? Math.round((earned / totalNumber) * 100)
      : 0;

  gradeRows.push({
    earned,
    lost: totalNumber - earned,
    percentage: rowPercentage,
  });
}
return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: Colors.light.background, dark: Colors.dark.background }}
      headerImage={
        <Image
          source={require('@/assets/images/grademaster-logo.png')}
          style={styles.logo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        {/* <ThemedText type="title">GradeMaster</ThemedText> */}
          <ThemedText type="subtitle" style={{ marginLeft: 8 }}>
            Choose how many points the assignment is being scored out of.
          </ThemedText>
      </ThemedView>
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

        <ThemedText type="defaultSemiBold">{correctPoints} correct out of {totalPoints} is a score of {percentage}%</ThemedText>
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

  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  
chartCard: {
  width: '100%',
  marginTop: 12,
  borderRadius: 16,
  padding: 12,
  gap: 8,
  backgroundColor: Colors.light.card,
  overflow: 'hidden',
},

chartTitle: {
  color: Colors.light.text,
  padding: 12,
  paddingBottom: 8,
},

chartHeader: {
  flexDirection: 'row',
  borderRadius: 8,
  backgroundColor: Colors.light.background,
  paddingVertical: 12,
  paddingHorizontal: 12,
},

chartHeaderText: {
  flex: 1,
  fontWeight: '700',
  color: Colors.light.tint,
  textAlign: 'center',
},

chartScroll: {
  maxHeight: 320,
},

chartRow: {
  flexDirection: 'row',
  backgroundColor: Colors.light.card,
  borderRadius: 8,
  paddingVertical: 12,
  paddingHorizontal: 12,
  borderBottomWidth: 1,
  borderBottomColor: Colors.light.card,
},

highlightedRow: {
  backgroundColor: Colors.light.background,
  borderBottomColor: Colors.light.tint,
  paddingHorizontal: 13,
},

highlightedCell: {
  color: Colors.light.tint,
  fontWeight: '700',
},

chartCell: {
  flex: 1,
  color: Colors.light.text,
  textAlign: 'center',
},

  logo: {
    height: 228,
    width: 360,
    top: 95,
    alignSelf: 'center',
    position: 'absolute',
  },
});
