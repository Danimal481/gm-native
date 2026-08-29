import { GradeBadge } from "@/components/GradeBadge";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { getLetterGrade, roundPercentage, type LetterGrade } from "@/constants/grading";
import { useSettings } from "@/contexts/SettingsContext";
import { useAppTheme } from "@/hooks/use-app-theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

type GradeRow = {
  earned: number;
  lost: number;
  percentage: number;
  letter: LetterGrade;
};

type GradeChartProps = {
  totalPoints: number;
  pointsEarned: number;
  expanded?: boolean;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  showNavigation?: boolean;
};

export function GradeChart({ 
    totalPoints, 
    pointsEarned,
    expanded = false,
    onMoveUp,
    onMoveDown,
    showNavigation = true,
 }: GradeChartProps) {
    const { theme, cardContainerStyle } = useAppTheme();
    const totalNumber = Number(totalPoints) || 0;
    const correctNumber = Number(pointsEarned) || 0;
    const { roundingMode, gradeScale } = useSettings();
    const gradeRows: GradeRow[] = [];

for (let earned = totalNumber; earned >= 0; earned--) {
  const rawPercentage =
    totalNumber > 0
      ? (earned / totalNumber) * 100
      : 0;

  const rowPercentage = roundPercentage(rawPercentage, roundingMode);

  gradeRows.push({
    earned,
    lost: totalNumber - earned,
    percentage: rowPercentage,
    letter: getLetterGrade(rowPercentage, gradeScale),
  });
}

const scrollRef = useRef<ScrollView>(null);

const [scrollHeight, setScrollHeight] = useState(0);
const [rowHeight, setRowHeight] = useState(0);

function centerSelectedRow(animated = true) {
  if (!expanded || scrollHeight === 0 || rowHeight === 0) {
    return;
  }

  // Rows run from totalPoints down to zero.
  // For 21 total:
  // 21/21 = index 0
  // 20/21 = index 1
  // 15/21 = index 6
  const selectedIndex = totalNumber - correctNumber;

  const rowTop = selectedIndex * rowHeight;
  const rowCenter = rowTop + rowHeight / 2;

  const targetOffset = Math.max(
    0,
    rowCenter - scrollHeight / 2
  );

  scrollRef.current?.scrollTo({
    y: targetOffset,
    animated,
  });
}

useEffect(() => {
  if (!expanded || rowHeight === 0 || scrollHeight === 0) {
    return;
  }

  const frame = requestAnimationFrame(() => {
    centerSelectedRow(true);
  });

  return () => cancelAnimationFrame(frame);
}, [
  correctNumber,
  totalNumber,
  rowHeight,
  scrollHeight,
  expanded,
]);

return (
  <ThemedView
    style={[
      styles.chartCard,
      { backgroundColor: theme.card },
      cardContainerStyle,
        expanded && styles.expandedChartCard,
    ]}
  >
    <ThemedView
      style={[
        styles.titleRow,
          { backgroundColor: theme.card },
      ]}
    >
    {!expanded ? (
    <>
      <ThemedText type="subtitle">
        Grade Chart
      </ThemedText>

      <Pressable
        onPress={() =>
          router.push({
            pathname: "/expanded-chart",
            params: {
              totalPoints: String(totalNumber),
              pointsEarned: String(correctNumber),
            },
          })
        }
        hitSlop={10}
        accessibilityRole="button"
        accessibilityLabel="Open grade chart in full screen"
        style={({ pressed }) => [
          styles.expandButton,
          { backgroundColor: theme.background },
          pressed && styles.expandButtonPressed,
        ]}
      >
        <MaterialIcons
          name="open-in-full"
          size={22}
          color={theme.tint}
        />
      </Pressable>
    </>
  ) : showNavigation ? (
  <ThemedView
    style={[
      styles.expandedControls,
      { backgroundColor: theme.card },
    ]}
  >
      <Pressable
        onPress={onMoveDown}
        disabled={correctNumber <= 0}
        hitSlop={10}
        style={[
  styles.arrowButton,
  { backgroundColor: theme.background },
  correctNumber <= 0 && styles.disabledArrow,
]}
      >
        <ThemedText
  style={[
    styles.arrowText,
    { color: theme.tint },
  ]}
>▼</ThemedText>
      </Pressable>

      <ThemedText style={styles.selectedScoreText}>
        {correctNumber}/{totalNumber} selected
      </ThemedText>

      <Pressable
        onPress={onMoveUp}
        disabled={correctNumber >= totalNumber}
        hitSlop={10}
        style={[
  styles.arrowButton,
  { backgroundColor: theme.background },
  correctNumber >= totalNumber && styles.disabledArrow,
]}
      >
       <ThemedText
  style={[
    styles.arrowText,
    { color: theme.tint },
  ]}
>▲</ThemedText>
      </Pressable>
    </ThemedView>
  ) : null}
</ThemedView>

                      
    <ThemedView
  style={[
    styles.chartHeader,
    { backgroundColor: theme.background },
  ]}
>
        <ThemedText style={styles.chartHeaderText}>Correct</ThemedText>
        <ThemedText style={styles.chartHeaderText}>Incorrect</ThemedText>
        <ThemedText style={styles.chartHeaderText}>Score</ThemedText>
        <ThemedText style={styles.chartHeaderText}>Grade</ThemedText>
    </ThemedView>
    
              <ScrollView
                ref={scrollRef}
                style={[
                  styles.chartScroll,
                  expanded && styles.expandedChartScroll,
                ]}
                nestedScrollEnabled
                onLayout={(event) => {
                  setScrollHeight(event.nativeEvent.layout.height);
                }}
              >
                {gradeRows.map((row) => (
                  <ThemedView
                  key={row.earned}
                  onLayout={(event) => {
                    if (rowHeight === 0) {
                      setRowHeight(event.nativeEvent.layout.height);
                    }
                  }}
                  style={[
                    styles.chartRow,
                      {
                        backgroundColor: theme.card,
                        borderBottomColor: theme.border,
                      },
                      row.earned === correctNumber && [
                        styles.highlightedRow,
                        {
                          backgroundColor: theme.background,
                          borderBottomColor: theme.tint,
                        },
                      ],
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
                    {row.lost} missed
                  </ThemedText>
                  <ThemedText style={[
                    styles.chartCell,
                    row.earned === correctNumber && styles.highlightedCell,
                  ]}>
                    {row.percentage}%
                  </ThemedText>
                  <View style={styles.letterGradeCell}>
                    <GradeBadge grade={row.letter} />
                  </View>
                </ThemedView>
                ))}
            
              </ScrollView>
            </ThemedView>
);
 }

 const styles = StyleSheet.create({
    expandedControls: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },

    arrowButton: {
      minWidth: 48,
      minHeight: 44,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
    },

    arrowText: {
      fontSize: 22,
      fontWeight: "700",
    },

    disabledArrow: {
      opacity: 0.3,
    },

    selectedScoreText: {
      flex: 1,
      textAlign: "center",
      fontWeight: "700",
      fontSize: 17,
    },

    chartCard: {
        width: '100%',
        marginTop: 12,
        padding: 12,
        borderRadius: 16,
    },

    chartHeader: {
        flexDirection: 'row',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 12,
    },

    chartHeaderText: {
        flex: 1,
        fontWeight: '700',
        textAlign: 'center',
    },

    chartRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
    },

    highlightedRow: {
        paddingHorizontal: 13,
    },

    highlightedCell: {
        fontWeight: '700',    
    },

    letterGradeCell: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',       
    },
    
    chartCell: {
        flex: 1,
        textAlign: 'center',                
    },    

    chartScroll: {
        maxHeight: 320,
    },

    expandedChartScroll: {
      flex: 1,
      maxHeight: undefined,
    },

    expandedChartCard: {
      flex: 1,
      marginTop: 0,
    },

    titleRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 12,
      paddingTop: 12,
      paddingBottom: 8,
    },    
    
    expandButton: {
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
    },

    expandButtonPressed: {
      opacity: 0.6,
    },

 });