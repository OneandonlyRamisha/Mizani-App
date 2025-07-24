import { View, Text, StyleSheet, ColorValue } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { GLOBAL_STYLES } from "../../../lib/globalStyles";
import { ProgressStatsData } from "../../../types/progressContainerTypes";
import { ProgressBarData } from "../../../types/progressContainerTypes";

export default function ProgressContainer({
  styleName,
  data,
  progressBarData,
}: {
  styleName?: {} | null;
  data: ProgressStatsData;
  progressBarData: ProgressBarData;
}) {
  return (
    <View style={styles.statsContainer}>
      <View style={styles.componentDataContainer}>
        <Text style={[styles.componentDataText, styleName]}>
          {data.headerTitle}
        </Text>
        <Text style={styles.componentDataText}>{data.headerSubTitle}</Text>
      </View>
      <View style={[styles.progressBarBg, { height: progressBarData.height }]}>
        <LinearGradient
          style={{
            width: `${progressBarData.width}%`,
            height: progressBarData.height,
            borderRadius: 1000,
          }}
          colors={progressBarData.colors as [ColorValue, ColorValue]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        ></LinearGradient>
      </View>
      {data.headerStats !== null && (
        <View style={styles.componentDataContainer}>
          <Text style={styles.componentDataText}>{data.headerStats[0]}</Text>
          <Text style={styles.componentDataText}>{data.headerStats[1]}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  statsContainer: {
    flex: 1,
    gap: 10,
  },
  componentDataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  componentDataText: {
    fontSize: GLOBAL_STYLES.element,
    color: GLOBAL_STYLES.secondaryColor,
  },
  progressBarBg: {
    width: "100%",
    backgroundColor: GLOBAL_STYLES.progressBarBg,
    borderRadius: 1000,
  },
});
