import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

type GradeScaleRowProps = {
  letter: "A" | "B" | "C" | "D";
  value: number;
  onChange: (newValue: number) => void;
  min?: number;
  max?: number;
};

export function GradeScaleRow({
  letter,
  value,
  onChange,
  min = 0,
  max = 100,
}: GradeScaleRowProps) {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  function decrease() {
    onChange(Math.max(min, value - 1));
  }

  function increase() {
    onChange(Math.min(max, value + 1));
  }

  function handleTextChange(text: string) {
    const digitsOnly = text.replace(/\D/g, "");

    if (digitsOnly === "") {
      onChange(min);
      return;
    }

    const nextValue = Number(digitsOnly);
    const limitedValue = Math.min(max, Math.max(min, nextValue));

    onChange(limitedValue);
  }

  return (
    <View style={styles.row}>
      <Text style={[styles.letter, { color: colors.text }]}>
        {letter}
      </Text>

      <Pressable
        style={[styles.button, { borderColor: colors.border }]}
        onPress={decrease}
      >
        <Text style={[styles.buttonText, { color: colors.tint }]}>
          −
        </Text>
      </Pressable>

      <TextInput
        value={String(value)}
        onChangeText={handleTextChange}
        keyboardType="number-pad"
        selectTextOnFocus
        style={[
          styles.valueInput,
          {
            color: colors.text,
            borderColor: colors.border,
          },
        ]}
      />

      <Pressable
        style={[styles.button, { borderColor: colors.border }]}
        onPress={increase}
      >
        <Text style={[styles.buttonText, { color: colors.tint }]}>
          +
        </Text>
      </Pressable>

      <Text style={[styles.percent, { color: colors.icon }]}>
        %
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 4,
  },
  letter: {
    width: 28,
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "700",
  },
  valueInput: {
    width: 72,
    height: 44,
    borderWidth: 1,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
    paddingVertical: 0,
  },
  percent: {
    fontSize: 18,
    fontWeight: "600",
  },
});