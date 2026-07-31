import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import type { RoundingMode } from "@/constants/grading";
import { useAppTheme } from "@/hooks/use-app-theme";
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
const { theme } = useAppTheme();
  return (
    <ThemedView style={[
      styles.selectorCard,
      { backgroundColor: theme.card },
      ]}>
      <ThemedText type="subtitle" style={[
        styles.selectorTitle,
        { color: theme.text },
      ]}>
        Rounding
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
              { backgroundColor: theme.background,
                borderColor: isSelected ? theme.tint : "transparent",
              },
                isFirstOption && styles.firstOption,
            ]}
          >
            <View
              style={[
                styles.radioCircle,
                { borderColor: theme.text },
                isSelected && { borderColor: theme.tint },
              ]}
            >
              {isSelected && <View style={[
                  styles.radioDot, 
                  { backgroundColor: theme.tint },
              ]} 
              />}
              
            </View>
      
            <ThemedText style={[
              styles.optionText,
              { color: theme.text },
              ]}
             >
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
    overflow: "hidden",
  },

  selectorTitle: {
    padding: 12,
    paddingBottom: 8,
  },

  optionText: {
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
},

firstOption: {
  width: "100%",
  marginBottom: 4,
},

  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});