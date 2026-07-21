import ParallaxScrollView from '@/components/parallax-scroll-view';
import { RoundingSelector } from '@/components/RoundingSelector';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import type { RoundingMode } from '@/constants/grading';
import { Colors, Fonts } from '@/constants/theme';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

export default function SettingsScreen() {
  const [roundingMode, setRoundingMode] = 
  useState<RoundingMode>("nearest");
 
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

      <RoundingSelector
        value={roundingMode}
        onChange={setRoundingMode}
      />

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

});
