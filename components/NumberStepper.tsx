import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type NumberStepperProps = {
  label: string;
  value: number;
  onChange: (newValue: number) => void;
  min?: number;
  max?: number;
};

export function NumberStepper({
  label,
  value,
  onChange,
  min = 0,
  max,
}: NumberStepperProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  function decrease() {
    onChange(Math.max(min, value - 1));
  }

  function increase() {
    const nextValue = max !== undefined ? Math.min(max, value + 1) : value + 1;
    onChange(nextValue);
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>

      <View style={styles.row}>
        <Pressable style={[styles.button, { borderColor: colors.border }]} onPress={decrease}>
          <Text style={[styles.buttonText, { color: colors.tint }]}>−</Text>
        </Pressable>

        <Text style={[styles.value, { color: colors.text }]}>{value}</Text>

        <Pressable style={[styles.button, { borderColor: colors.border }]} onPress={increase}>
          <Text style={[styles.buttonText, { color: colors.tint }]}>+</Text>
        </Pressable>
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
    backgroundColor: '#162338',
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
});