import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import type { RoundingMode } from "@/constants/grading";
import { Colors } from "@/constants/theme";
import { Pressable, StyleSheet, View } from "react-native";

type RoundingSelectorProps = {
  value: RoundingMode;
  onChange: (mode: RoundingMode) => void;
};

type RoundingOption = {
  value: RoundingMode;
  label: string;
};

const options: RoundingOption[] = [
  { value: "nearest", label: "Round to Nearest" },
  { value: "up", label: "Round Up" },
  { value: "down", label: "Round Down" },
  { value: "oneDecimal", label: "One Decimal" },
  { value: "twoDecimals", label: "Two Decimals" },
];

export function RoundingSelector({
  value,
  onChange,
}: RoundingSelectorProps) {
  return (
    <ThemedView style={styles.selectorCard}>
      <ThemedText type="subtitle" style={styles.selectorTitle}>
        Rounding Mode
      </ThemedText>

      <View style={styles.optionsContainer}>
       {options.map((option, index) => {
  const isLastOption = index === options.length - 1;
  const isSelected = value === option.value;

  return (
    <Pressable
      key={option.value}
      onPress={() => onChange(option.value)}
      style={[
        styles.optionButton,
        isSelected && styles.selectedOption,
        isLastOption && styles.lastOption,
      ]}
    >
      <View
        style={[
          styles.radioCircle,
          isSelected && styles.selectedRadioCircle,
        ]}
      >
        {isSelected && <View style={styles.radioDot} />}
      </View>

      <ThemedText style={styles.optionText}>
        {option.label}
      </ThemedText>
    </Pressable>
  );
})}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  selectorCard: {
    width: "100%",
    marginTop: 12,
    padding: 12,
    borderRadius: 16,
    backgroundColor: Colors.light.card,
    overflow: "hidden",
  },

  selectorTitle: {
    color: Colors.light.text,
    padding: 12,
    paddingBottom: 8,
  },

  optionText: {
  color: Colors.light.text,
  fontSize: 16,
},

  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

optionButton: {
  width: "48.5%",
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
  paddingVertical: 12,
  paddingHorizontal: 10,
  borderRadius: 8,
  backgroundColor: Colors.light.background,
},

lastOption: {
  marginLeft: "25.75%",
},

  selectedOption: {
    borderWidth: 1,
    borderColor: Colors.light.tint,
  },

  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: Colors.light.text,
    alignItems: "center",
    justifyContent: "center",
  },

  selectedRadioCircle: {
    borderColor: Colors.light.tint,
  },

  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.light.tint,
  },
});