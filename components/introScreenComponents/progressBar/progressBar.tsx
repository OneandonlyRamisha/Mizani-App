import { LinearGradient } from "expo-linear-gradient";
import { View, ColorValue, StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../../../lib/globalStyles";

export default function ProgressBarIntroPage({
  progress,
}: {
  progress: number;
}) {
  return (
    <View style={[styles.progressBarBg, { height: 7 }]}>
      <LinearGradient
        style={{
          width: `${progress}%`,
          height: 7,
          borderRadius: 1000,
        }}
        colors={GLOBAL_STYLES.blueProgressBar as [ColorValue, ColorValue]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      ></LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  progressBarBg: {
    width: "100%",
    backgroundColor: GLOBAL_STYLES.progressBarBg,
    borderRadius: 1000,
  },
});
