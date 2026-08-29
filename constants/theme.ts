/**
 * GradeMaster theme definitions.
 *
 * Brand colors define the application's identity.
 * Theme colors define how those brand colors are applied
 * in Light and Dark mode.
 */

import { Platform } from "react-native";

/* ---------- Brand Colors ---------- */

const brandNavy = "#101C2A";
const brandGold = "#E4B64A";
const brandBlue = "#0A7EA4";
const danger = "#C94A4A";

/* ---------- Grade Colors ---------- */

const gradeA = "#4ADE80";
const gradeB = "#A3E635";
const gradeC = "#FACC15";
const gradeD = "#FB923C";
const gradeF = "#F87171";

/* ---------- Light Theme ---------- */

const lightBackground = "#EEF2F7";
const lightCard = "#FFFFFF";
const lightText = "#182536";
const lightBorder = "#D2DAE5";
const lightIcon = "#536176";
const lightTabIcon = "#7C8999";
const lightTint = "#A97400";

/* ---------- Dark Theme ---------- */

const darkBackground = brandNavy;
const darkCard = "#1E2F47";
const darkText = "#F4F7FB";
const darkBorder = "#3C4D66";
const darkIcon = "#AEB9C9";
const darkTabIcon = "#AEB9C9";
const darkTint = brandGold;

export const Colors = {
  light: {
    highlight: brandBlue,
    text: lightText,
    background: lightBackground,
    card: lightCard,
    border: lightBorder,
    tint: lightTint,
    icon: lightIcon,
    tabIconDefault: lightTabIcon,
    tabIconSelected: lightTint,

    danger,

    gradeA,
    gradeB,
    gradeC,
    gradeD,
    gradeF,
  },

  dark: {
    highlight: brandBlue,
    text: darkText,
    background: darkBackground,
    card: darkCard,
    border: darkBorder,
    tint: darkTint,
    icon: darkIcon,
    tabIconDefault: darkTabIcon,
    tabIconSelected: darkTint,

    danger,

    gradeA,
    gradeB,
    gradeC,
    gradeD,
    gradeF,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});