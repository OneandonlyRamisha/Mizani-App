import { Text, View, StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../../lib/globalStyles";
import { LinearGradient } from "expo-linear-gradient";
import ProgressContainer from "./progressContainer/progressContainer";

export default function MainHeader() {
  return (
    <LinearGradient
      colors={[GLOBAL_STYLES.accentColor10, GLOBAL_STYLES.accentColor5]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <View style={styles.headerPartContainer}>
        <Text style={styles.pfp}>LU</Text>
        <ProgressContainer
          styleName={styles.lvlHeader}
          progressBarData={{
            height: 8,
            width: 70,
            colors: [GLOBAL_STYLES.accentColor, GLOBAL_STYLES.accentColor75],
          }}
          data={{
            headerTitle: "Level 1",
            headerSubTitle: "(Habit Apprentice)",
            headerStats: ["1200 XP", "-459 XP to advance"],
          }}
        />
      </View>
      <ProgressContainer
        data={{
          headerTitle: "Daily Quest Progress",
          headerSubTitle: "30 / 120 XP",
          headerStats: null,
        }}
        progressBarData={{
          height: 12,
          width: 25,
          colors: GLOBAL_STYLES.blueProgressBar,
        }}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 35,
    paddingHorizontal: 20,
    elevation: 6,
    borderColor: GLOBAL_STYLES.accentColor20,
    borderWidth: 1,
    borderRadius: 16,
    gap: 24,
  },
  headerPartContainer: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  pfp: {
    backgroundColor: GLOBAL_STYLES.accentColor20,
    color: GLOBAL_STYLES.accentColor,
    fontWeight: "bold",
    fontSize: 30,
    alignSelf: "flex-start",
    padding: 20,
    borderRadius: 90,
  },

  lvlHeader: {
    fontSize: GLOBAL_STYLES.header,
    fontWeight: 800,
    color: GLOBAL_STYLES.accentColor,
    letterSpacing: 1.2,
  },
});
