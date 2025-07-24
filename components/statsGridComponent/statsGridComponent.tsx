import { LinearGradient } from "expo-linear-gradient";
import { View, ColorValue, StyleSheet, Text } from "react-native";
import { GLOBAL_STYLES } from "../../lib/globalStyles";
import { JSX } from "react";

export default function StatsGridComponents({
  stats,
}: {
  stats: {
    name: string;
    stat: number;
    icon: JSX.Element;
    color: string;
    backgroundColor: string[];
  };
}) {
  return (
    <LinearGradient
      colors={stats.backgroundColor as [ColorValue, ColorValue]}
      style={styles.stats}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <View>{stats.icon}</View>
      <Text style={[styles.statTitle, { color: stats.color }]}>
        {stats.name}
      </Text>
      <Text style={[styles.num, { color: stats.color }]}>{stats.stat}</Text>
      <View
        style={{
          backgroundColor: GLOBAL_STYLES.progressBarBg,
          width: "100%",
          height: 12,
          borderRadius: 120000,
        }}
      >
        <View
          style={{
            width: `${stats.stat}%`,
            height: 12,
            backgroundColor: stats.color,
            borderRadius: 12000,
          }}
        ></View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  stats: {
    width: "48%",
    paddingVertical: 20,
    paddingHorizontal: 25,
    gap: 9,
    borderRadius: 16,
  },
  statTitle: {
    fontSize: GLOBAL_STYLES.header,
    fontWeight: 700,
  },
  num: { fontSize: 24, fontWeight: 900 },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
