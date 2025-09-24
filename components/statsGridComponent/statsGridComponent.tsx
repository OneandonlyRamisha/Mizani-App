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
    <View style={styles.stats}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 9 }}>
        <View>{stats.icon}</View>
        <Text style={styles.statTitle}>{stats.name}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Text style={styles.num}>{stats.stat.toFixed(2)}</Text>
        <Text style={{ color: GLOBAL_STYLES.secondaryColor }}>/100</Text>
      </View>
      <View
        style={{
          backgroundColor: GLOBAL_STYLES.progressBarBg,
          width: "100%",
          height: 7,
        }}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#FACD37", "#B8732E"]}
          style={{ width: `${stats.stat}%`, height: 7 }}
        ></LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stats: {
    width: "49%",
    borderWidth: 1,
    gap: 9,
    backgroundColor: GLOBAL_STYLES.card,
    borderColor: GLOBAL_STYLES.progressBarBg,
    elevation: 2,
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  statTitle: {
    fontSize: 18,
    fontFamily: "Cinzel-Medium",
    color: GLOBAL_STYLES.primaryColor,
  },
  num: {
    fontSize: 24,
    fontFamily: "Cinzel-Medium",
    color: GLOBAL_STYLES.accentColor,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
