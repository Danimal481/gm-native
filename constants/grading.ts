import { Colors } from "./theme";

export type LetterGrade = "A" | "B" | "C" | "D" | "F";

export type RoundingMode =
  | "nearest"
  | "up"
  | "down"
  | "oneDecimal"
  | "twoDecimals";

export function getLetterGrade(roundPercentage: number): LetterGrade {
  if (roundPercentage >= 90) return 'A';
  if (roundPercentage >= 80) return 'B';
  if (roundPercentage >= 70) return 'C';
  if (roundPercentage >= 60) return 'D';
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

export function roundPercentage(
  value: number,
  mode: RoundingMode
): number {
  switch (mode) {
    case "up":
      return Math.ceil(value);

    case "down":
      return Math.floor(value);

    case "oneDecimal":
      return Math.round(value * 10) / 10;

    case "twoDecimals":
      return Math.round(value * 100) / 100;

    case "nearest":
    default:
      return Math.round(value);
  }
}