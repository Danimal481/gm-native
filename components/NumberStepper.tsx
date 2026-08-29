import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { useAppTheme } from "@/hooks/use-app-theme";

type NumberStepperProps = {
  label: string;
  value: number;
  onChange: (newValue: number) => void;
  min?: number;
  max?: number;
  compact?: boolean;
};

export function NumberStepper({
  label,
  value,
  onChange,
  min = 0,
  max,
  compact = false 
}: NumberStepperProps) {
  const { theme, cardContainerStyle } = useAppTheme();
  
  function decrease() {
    onChange(Math.max(min, value - 1));
  }

  function increase() {
    const nextValue = max !== undefined ? Math.min(max, value + 1) : value + 1;
    onChange(nextValue);
  }

  return (
    <View
  style={[
    styles.container,
    compact && styles.compactContainer,
    { backgroundColor: theme.card },
    cardContainerStyle,
  ]}
>
  <View style={compact ? styles.compactLayout : undefined}>
    <Text
      style={[
        styles.label,
        compact && styles.compactLabel,
        { color: theme.text },
      ]}
    >
      {label}
    </Text>

    <View style={[styles.row, compact && styles.compactRow]}>
      <Pressable
        style={[
          styles.button,
          compact && styles.compactButton,
          {
            borderColor: theme.border,
            backgroundColor: theme.background,
          },
        ]}
        onPress={decrease}
      >
        <Text
          style={[
            styles.buttonText,
            compact && styles.compactButtonText,
            { color: theme.tint },
          ]}
        >
          −
        </Text>
      </Pressable>

      <TextInput
        value={String(value ?? '')}
        onChangeText={(text) => {
          const digitsOnly = text.replace(/\D/g, '');

          if (digitsOnly === '') {
            onChange(min);
            return;
          }

          const nextValue = Number(digitsOnly);

          const limitedValue =
            max !== undefined ? Math.min(max, nextValue) : nextValue;

          onChange(Math.max(min, limitedValue));
        }}
        keyboardType="number-pad"
        selectTextOnFocus={true}
        style={[
          styles.valueInput,
          compact && styles.compactValueInput,
          { color: theme.text },
        ]}
      />

      <Pressable
        style={[
          styles.button,
          compact && styles.compactButton,
          {
            borderColor: theme.border,
            backgroundColor: theme.background,
          },
        ]}
        onPress={increase}
      >
        <Text
          style={[
            styles.buttonText,
            compact && styles.compactButtonText,
            { color: theme.tint },
          ]}
        >
          +
        </Text>
      </Pressable>
    </View>
  </View>
</View>
  );
}

const styles = StyleSheet.create({
  container: {
  borderRadius: 16,
  padding: 12,
  gap: 8,
},

  label: {
    fontSize: 18,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  button: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 30,
    fontWeight: '700',
  },
  value: {
    minWidth: 48,
    textAlign: 'center',
    fontSize: 38,
    fontWeight: '700',
  },

  valueInput: {
    minWidth: 80,
    textAlign: 'center',
    fontSize: 38,
    fontWeight: '700',
    paddingVertical: 0,
  },

  compactContainer: {
  paddingHorizontal: 12,
  paddingVertical: 8,
},

compactLayout: {
  flexDirection: 'row',
  alignItems: 'center',
},

compactLabel: {
  fontSize: 15,
  lineHeight: 18,
  width: 85,
  flexShrink: 0,
},

compactRow: {
  flex: 1,
  justifyContent: 'center',
  gap: 8,
},

compactButton: {
  width: 40,
  height: 40,
  borderRadius: 10,
},

compactButtonText: {
  fontSize: 24,
},

compactValueInput: {
  minWidth: 60,
  fontSize: 30,
},
});