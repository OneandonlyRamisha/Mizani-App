import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../../lib/globalStyles";
import { useProfile } from "../../store/profile";

export default function StatsMizanani() {
  const { profile } = useProfile();
  return (
    <LinearGradient
      colors={[GLOBAL_STYLES.accentColor10, GLOBAL_STYLES.accentColor5]}
      style={styles.mizaniScoreContainer}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <Text style={styles.mizaniHeader}>Your Mizani Score</Text>
      <View style={{ gap: 10 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <Text style={styles.mizaniScore}>
            {profile.stats.overall.toFixed(2)}
          </Text>
          <Text style={{ color: GLOBAL_STYLES.secondaryColor, fontSize: 18 }}>
            /100
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            height: 7,
            backgroundColor: GLOBAL_STYLES.progressBarBg,
          }}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["#FACD37", "#B8732E"]}
            style={{ width: `${profile.stats.overall}%`, height: 7 }}
          ></LinearGradient>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  mizaniScoreContainer: {
    paddingVertical: 20,
    marginBottom: 20,
    // backgroundColor: GLOBAL_STYLES.card,
    borderColor: GLOBAL_STYLES.accentColor20,
    borderWidth: 1,
    paddingHorizontal: 25,
    gap: 9,
  },
  mizaniHeader: {
    fontSize: 18,
    fontFamily: "Cinzel-Regular",
    color: GLOBAL_STYLES.accentColor,
  },
  mizaniScore: {
    fontSize: 32,
    fontFamily: "Cinzel-Medium",
    color: GLOBAL_STYLES.accentColor,
  },
});
