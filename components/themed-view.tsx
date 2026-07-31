import { useAppTheme } from "@/hooks/use-app-theme";
import { View, type ViewProps } from 'react-native';

export type ThemedViewProps = ViewProps;

export function ThemedView({ style, ...otherProps }: ThemedViewProps) {
  const { theme } = useAppTheme();

  return (
    <View 
      style={[
        { backgroundColor: theme.background },
        style,
      ]}
      {...otherProps}
    />
    );
}
