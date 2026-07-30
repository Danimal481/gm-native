import { GradeChart } from "@/components/GradeChart";
import { ThemedView } from "@/components/themed-view";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";

export default function ExpandedChartScreen() {
  const params = useLocalSearchParams<{
    totalPoints?: string;
    pointsEarned?: string;
  }>();

  const totalPoints = Number(params.totalPoints) || 0;
  const initialPointsEarned = Number(params.pointsEarned) || 0;

  const [selectedPoints, setSelectedPoints] =
    useState(initialPointsEarned);

  function moveSelectionUp() {
    setSelectedPoints((current) =>
      Math.min(totalPoints, current + 1)
    );
  }

  function moveSelectionDown() {
    setSelectedPoints((current) =>
      Math.max(0, current - 1)
    );
  }

  return (
    <ThemedView style={styles.container}>
      <GradeChart
        totalPoints={totalPoints}
        pointsEarned={selectedPoints}
        expanded
        onMoveUp={moveSelectionUp}
        onMoveDown={moveSelectionDown}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
});