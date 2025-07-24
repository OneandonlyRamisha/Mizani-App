import { RadarChart } from "@salmonco/react-native-radar-chart";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { GLOBAL_STYLES } from "../../lib/globalStyles";
import { Dimensions } from "react-native";
import { useProfile } from "../../store/profile";

export default function RadarStatsChart() {
  const { profile } = useProfile();
  const data = [
    { label: "Faith", value: profile.stats.faith },
    { label: "Wisdoms", value: profile.stats.wisdom },
    { label: "health", value: profile.stats.health },
    { label: "discipline", value: profile.stats.discipline },
    { label: "focus", value: profile.stats.focus },
  ];

  const phoneWidth = Dimensions.get("window").width;
  return (
    <SafeAreaView style={styles.container}>
      <RadarChart
        data={data}
        maxValue={100}
        fillColor={GLOBAL_STYLES.secondaryBg}
        // scale={1.1}
        size={phoneWidth - 20}
        strokeOpacity={[0.2, 0.2, 0.2, 0.2, 0.2]}
        strokeWidth={[1, 1, 1, 1, 1]}
        labelColor={GLOBAL_STYLES.primaryColor}
        // labelDistance={1.2}
        labelSize={14}
        divisionStrokeWidth={1}
        dataFillColor={GLOBAL_STYLES.accentColor50}
        dataFillOpacity={0.8}
        dataStroke={GLOBAL_STYLES.accentColor}
        dataStrokeWidth={1}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "red",
    elevation: 12,
    backgroundColor: GLOBAL_STYLES.card,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    borderColor: "#333",
    borderWidth: 1,
  },
});
