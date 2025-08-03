import { Text, View, StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../../lib/globalStyles";
import { LinearGradient } from "expo-linear-gradient";
import ProgressContainer from "./progressContainer/progressContainer";
import ProfilePicture from "../profilePicture/profilePicture";
import { useProfile } from "../../store/profile";

export default function MainHeader({
  totalXp,
  totalCompletedXp,
  title,
}: {
  totalXp: number;
  totalCompletedXp: number;
  title: string;
}) {
  const { profile } = useProfile();
  return (
    <LinearGradient
      colors={[GLOBAL_STYLES.accentColor10, GLOBAL_STYLES.accentColor5]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <View style={styles.headerPartContainer}>
        <View>
          <Text style={styles.header}>{title}</Text>
          <Text style={styles.subHeader}>Keep pushing forward, warrior</Text>
        </View>
        <Text style={styles.progressNum}>
          {totalXp > 0 ? Math.floor((totalCompletedXp / totalXp) * 100) : 0}%
        </Text>
      </View>
      <ProgressContainer
        data={{
          headerTitle: `${Math.floor(totalCompletedXp)}/${totalXp} completed`,
          headerSubTitle: ``,
          headerStats: null,
        }}
        progressBarData={{
          height: 12,
          width: (totalCompletedXp / totalXp) * 100,
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
    justifyContent: "space-between",
    alignItems: "center",
  },

  header: {
    fontFamily: "Cinzel-Semi-Bold",
    fontSize: 18,
    color: GLOBAL_STYLES.accentColor,
  },
  subHeader: {
    fontSize: 12,
    color: GLOBAL_STYLES.secondaryColor,
  },
  progressNum: {
    fontSize: 30,
    fontFamily: "Cinzel-Semi-Bold",
    fontWeight: 600,
    color: GLOBAL_STYLES.accentColor,
  },
});
