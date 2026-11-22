import { StatusBar } from 'expo-status-bar';
import { ReactNode } from 'react';
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

function Measured({ label, children }: { label: string; children: ReactNode }) {
  return (
    <View style={styles.row}>
      <View style={styles.measured}>{children}</View>
      <Text style={styles.caption} allowFontScaling={false}>
        {label}
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
});
