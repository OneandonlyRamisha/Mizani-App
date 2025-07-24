import { View, StyleSheet, Text } from "react-native";
import ProfilePicture from "../profilePicture/profilePicture";
import { GLOBAL_STYLES } from "../../lib/globalStyles";
import { LinearGradient } from "expo-linear-gradient";
import ProgressContainer from "../mainHeader/progressContainer/progressContainer";
import { useProfile } from "../../store/profile";

export default function StatsHeader() {
  const { profile } = useProfile();
  return (
    <LinearGradient
      colors={[GLOBAL_STYLES.accentColor10, GLOBAL_STYLES.accentColor5]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <View style={styles.headerPartContainer}>
        <ProfilePicture />
        <ProgressContainer
          styleName={styles.lvlHeader}
          progressBarData={{
            height: 8,
            width: profile.currentXP,
            colors: [GLOBAL_STYLES.accentColor, GLOBAL_STYLES.accentColor75],
          }}
          data={{
            headerTitle: `Level ${profile.level}`,
            headerSubTitle: "(Habit Apprentice)",
            headerStats: [`${profile.currentXP} XP`, "-459 XP to advance"],
          }}
        />
      </View>
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

  lvlHeader: {
    fontSize: GLOBAL_STYLES.header,
    fontWeight: 800,
    color: GLOBAL_STYLES.accentColor,
    letterSpacing: 1.2,
  },
});
