import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { getLetterGrade } from "@/constants/grading";
import { Colors } from "@/constants/theme";
import { ScrollView, StyleSheet } from "react-native";

type GradeChartProps = {
  totalQuestions: number;
  correct: number;
};

export function GradeChart({ 
    totalQuestions, 
    correct,
 }: GradeChartProps) {
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
    letter: getLetterGrade(rowPercentage),
  });
}
function getLetterGradeColor(letter: string) {
  if (letter === 'A') return Colors.light.gradeA;
  if (letter === 'B') return Colors.light.gradeB;
  if (letter === 'C') return Colors.light.gradeC;
  if (letter === 'D') return Colors.light.gradeD;
  return Colors.light.gradeF;
}

return (
    <ThemedView style={styles.chartCard}>
        <ThemedText type="subtitle" style={styles.chartTitle}>
            Grade Chart
        </ThemedText>
              
    <ThemedView style={styles.chartHeader}>
        <ThemedText style={styles.chartHeaderText}>Correct</ThemedText>
        <ThemedText style={styles.chartHeaderText}>Incorrect</ThemedText>
        <ThemedText style={styles.chartHeaderText}>Score</ThemedText>
        <ThemedText style={styles.chartHeaderText}>Grade</ThemedText>
    </ThemedView>
    
              <ScrollView
                style={styles.chartScroll}
                nestedScrollEnabled={true}
              >
                {gradeRows.map((row) => (
                  <ThemedView
                  key={row.earned}
                  style={[
                    styles.chartRow,
                    row.earned === correctNumber && styles.highlightedRow,
                  ]}
                >
                  <ThemedText style={[
                    styles.chartCell,
                    row.earned === correctNumber && styles.highlightedCell,
                  ]}>
                    {row.earned}/{totalNumber}
                  </ThemedText>
                  <ThemedText style={[
                    styles.chartCell,
                    row.earned === correctNumber && styles.highlightedCell,
                  ]}>
                    {row.lost} lost
                  </ThemedText>
                  <ThemedText style={[
                    styles.chartCell,
                    row.earned === correctNumber && styles.highlightedCell,
                  ]}>
                    {row.percentage}%
                  </ThemedText>
                  <ThemedText
                    style={[
                      styles.chartCell,
                      row.earned === correctNumber && styles.highlightedCell,
                      { color: getLetterGradeColor(row.letter) },
                    ]}>
                      {row.letter}
                  </ThemedText>
                </ThemedView>
                ))}
            
              </ScrollView>
            </ThemedView>
);
 }

 const styles = StyleSheet.create({
    chartCard: {
        width: '100%',
        marginTop: 12,
        padding: 12,
        borderRadius: 16,
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
        color: Colors.light.tint,
        fontWeight: '700',
        textAlign: 'center',
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

    chartScroll: {
        maxHeight: 320,
    },
 });