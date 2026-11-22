import { Host, Text as ExpoUIText } from '@expo/ui';
import { StatusBar } from 'expo-status-bar';
import { ReactNode, useState } from 'react';
import { LayoutChangeEvent, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

type Size = { width: number; height: number };

const SAMPLE = 'Twelve point text';

function Measured({ label, children }: { label: string; children: ReactNode }) {
  const [size, setSize] = useState<Size | null>(null);
  const onLayout = (e: LayoutChangeEvent) => setSize(e.nativeEvent.layout);
  const measured = size ? ` · ${Math.round(size.width)} × ${Math.round(size.height)} pt` : '';

  return (
    <View style={styles.row}>
      <View onLayout={onLayout} style={styles.measured}>
        {children}
      </View>
      <Text style={styles.caption} allowFontScaling={false}>
        {label}
        {measured}
      </Text>
    </View>
  );
}

export default function App() {
  const { fontScale } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title} allowFontScaling={false}>
          @expo/ui Text and the system text size
        </Text>
        <Text style={styles.scale} allowFontScaling={false}>
          fontScale: {fontScale}
        </Text>

        <Measured label="RN Text, fontSize 12">
          <Text style={styles.twelve}>{SAMPLE}</Text>
        </Measured>

        <Measured label="RN Text, fontSize 12, allowFontScaling off">
          <Text style={styles.twelve} allowFontScaling={false}>
            {SAMPLE}
          </Text>
        </Measured>

        <Measured label="@expo/ui Text, fontSize 12">
          <Host matchContents>
            <ExpoUIText textStyle={{ fontSize: 12 }}>{SAMPLE}</ExpoUIText>
          </Host>
        </Measured>

        <Measured label="@expo/ui Text, fontSize 12, lineHeight 20">
          <Host matchContents>
            <ExpoUIText textStyle={{ fontSize: 12, lineHeight: 20 }}>{`${SAMPLE}\n${SAMPLE}`}</ExpoUIText>
          </Host>
        </Measured>

        <Measured label="@expo/ui Text, no fontSize">
          <Host matchContents>
            <ExpoUIText>{SAMPLE}</ExpoUIText>
          </Host>
        </Measured>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingTop: 72,
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  scale: {
    fontSize: 15,
    color: '#444',
  },
  row: {
    gap: 4,
  },
  measured: {
    alignSelf: 'flex-start',
  },
  caption: {
    fontSize: 12,
    color: '#888',
  },
  twelve: {
    fontSize: 12,
  },
});
