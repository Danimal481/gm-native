import { useAppTheme } from "@/hooks/use-app-theme";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

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
  const { theme } = useAppTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [inputText, setInputText] = useState(String(value));
    
  useEffect (() => {
    if (!isEditing) {
        setInputText(String(value));
    }
  }, [value, isEditing]);

  function decrease() {
    onChange(Math.max(min, value - 1));
  }

  function increase() {
    onChange(Math.min(max, value + 1));
  }

  function handleTextChange(text: string) {
    const digitsOnly = text.replace(/\D/g, "");
    setInputText(digitsOnly);
    const nextValue = Number(digitsOnly);
    const limitedValue = Math.min(max, Math.max(min, nextValue));

    onChange(limitedValue);
  }

  function commitInput() {
    if (inputText === "") {
        setInputText(String(value));
        return;
  }

  const enteredValue = Number(inputText);
  const limitedValue = Math.min(max, Math.max(min, enteredValue));

  setIsEditing(false);
  onChange(limitedValue);
  setInputText(String(limitedValue));
}


  return (
    <View style={styles.row}>
      <Text style={[styles.letter, { color: theme.text }]}>
        {letter}
      </Text>

      <Pressable
        style={[styles.button, { backgroundColor: theme.background, borderColor: theme.border }]}
        onPress={decrease}
      >
        <Text style={[styles.buttonText, { color: theme.tint }]}>
          −
        </Text>
      </Pressable>

      <TextInput
        onFocus={() => setIsEditing(true)}
        value={inputText}
        onChangeText={handleTextChange}
        onBlur={commitInput}
        onSubmitEditing={commitInput}
        keyboardType="number-pad"
        selectTextOnFocus
        style={[
            styles.valueInput,
            {
                color: theme.text,
                borderColor: theme.border,
            },
        ]}
      />

      <Pressable
        style={[styles.button, { backgroundColor: theme.background, borderColor: theme.border }]}
        onPress={increase}
      >
        <Text style={[styles.buttonText, { color: theme.tint }]}>
          +
        </Text>
      </Pressable>

      <Text style={[styles.percent, { color: theme.icon }]}>
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