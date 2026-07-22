import ParallaxScrollView from '@/components/parallax-scroll-view';
import { RoundingSelector } from '@/components/RoundingSelector';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Fonts } from '@/constants/theme';
import { useSettings } from '@/contexts/SettingsContext';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';

export default function SettingsScreen() {
  const { roundingMode, setRoundingMode } = useSettings();
  const { highlight } = useLocalSearchParams<{
    highlight?: string;
  }>();
  const [highlightRounding, setHighlightRounding] = useState(false);
  const highlightOpacity = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
  if (highlight !== "rounding") {
    return;
  }

  highlightOpacity.setValue(0);

  Animated.sequence([
    Animated.timing(highlightOpacity, {
      toValue: 1,
      duration: 250,
      useNativeDriver: false,
    }),
    Animated.delay(800),
    Animated.timing(highlightOpacity, {
      toValue: 0,
      duration: 400,
      useNativeDriver: false,
    }),
  ]).start(() => {
    router.setParams({ highlight: undefined });
  });
}, [highlight, highlightOpacity]);


  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: Colors.light.background,
        dark: Colors.dark.background,
      }}
      headerImage={
        <IconSymbol
          color={Colors.light.tint}
          size={310}
          name="gearshape.fill"
          style={styles.headerImage}
        />
      }>
      
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={styles.title}>
          Settings
        </ThemedText>
      </ThemedView>
    <Animated.View
      style={[
        styles.roundingCard,
        {
          borderColor: highlightOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: ["transparent", Colors.light.tint],
          }),
        },
      ]}
      >
      <RoundingSelector
        value={roundingMode}
        onChange={setRoundingMode}
      />
    </Animated.View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: Colors.light.tint,
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },

  title: {
    fontFamily: Fonts.rounded,
  },

  roundingCard: {
    borderRadius: 16,
    borderWidth: 2,   
  },

  roundingCardHighlighted: {
    borderColor: Colors.light.tint,
  }

});
