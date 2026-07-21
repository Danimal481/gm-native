import type { LetterGrade } from "@/constants/grading";
import { getLetterGradeColor } from "@/constants/grading";
import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";
import { ThemedText } from "./themed-text";

type GradeBadgeProps = {
  grade: LetterGrade;
};

export function GradeBadge({ grade }: GradeBadgeProps) {
  return (
    <ThemedText
      style={[
        styles.gradeBadge,
        { backgroundColor: getLetterGradeColor(grade, Colors.light) },
      ]}
    >
      {grade}
    </ThemedText>
  );
}

const styles = StyleSheet.create({
  gradeBadge: {
    minWidth: 46,
    paddingVertical: 2,
    paddingHorizontal: 14,
    borderRadius: 999,
    textAlign: "center",
    fontWeight: "800",
    overflow: "hidden",
    color: Colors.light.card,
    backgroundColor: Colors.light.background,
  },
});