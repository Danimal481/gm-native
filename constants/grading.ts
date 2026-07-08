import { Colors } from "./theme";

export function getLetterGrade(percentage: number): string {
  if (percentage >= 90) return 'A';
  if (percentage >= 80) return 'B';
  if (percentage >= 70) return 'C';
  if (percentage >= 60) return 'D';
  return 'F';
}

export function getLetterGradeColor(
  letter: string,
  colors: typeof Colors.light) {
    switch (letter) {
      case 'A':
        return colors.gradeA;
      case 'B':
        return colors.gradeB;
      case 'C':
        return colors.gradeC;
      case 'D':
        return colors.gradeD;
      default:
        return colors.gradeF;
    }
  }