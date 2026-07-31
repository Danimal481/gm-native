import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import type { ThemeMode } from "@/contexts/SettingsContext";
import { Pressable, StyleSheet, View } from "react-native";

type ThemeSelectorProps = {
  value: ThemeMode;
  onChange: (mode: ThemeMode) => void;
};

type ThemeOption = {
  value: ThemeMode;
  label: string;
};

const options: ThemeOption[] = [
  { value: "system", label: "Use System Settings" },
  { value: "light", label: "Light Mode" },
  { value: "dark", label: "Dark Mode" },  
];

export function ThemeSelector({
  value,
  onChange,
}: ThemeSelectorProps) {
  return (
    <ThemedView style={styles.selectorCard}>
      <ThemedText type="subtitle" style={styles.selectorTitle}>
        Color Mode
      </ThemedText>

      <View style={styles.optionsContainer}>
       {options.map((option, index) => {
  const isFirstOption = index === 0;
  const isSelected = value === option.value;

  return (
    <Pressable
      key={option.value}
      onPress={() => onChange(option.value)}
      style={[
        styles.optionButton,
        isSelected && styles.selectedOption,
        isFirstOption && styles.firstOption,
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

firstOption: {
  width: "100%",
  marginBottom: 4,
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