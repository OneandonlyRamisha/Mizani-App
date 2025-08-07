import ScreenContainer from "../../components/screenContainer/screenContainer";
import { Text, StyleSheet, View, ColorValue, Pressable } from "react-native";
import StatsHeader from "../../components/statsHeader/statsHeader";

import StatsGridComponents from "../../components/statsGridComponent/statsGridComponent";
import RadarStatsChart from "../../components/radarStatsChart/radarStatsChart";
import { useEffect, useState } from "react";
import { GLOBAL_STYLES } from "../../lib/globalStyles";
import { Ionicons, MaterialCommunityIcons, Fontisto } from "@expo/vector-icons";
import { useProfile } from "../../store/profile";
import StatsButton from "../../components/statsButton/statsButton";
import { getStatsData } from "../../lib/statsData";
import MainHeader from "../../components/mainHeader/mainHeader";
import { LinearGradient } from "expo-linear-gradient";

export default function StatsScreen() {
  const [statType, setStatType] = useState("Grid");
  const { profile } = useProfile();

  const statsData = getStatsData(profile.stats);

  return (
    <ScreenContainer>
      <View>
        <Text style={styles.header}>{profile.name}</Text>
        <Text style={styles.subHeader}>This is your ability table</Text>
      </View>

      <StatsButton setStatType={setStatType} statType={statType} />
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

      {statType === "Grid" ? (
        <View style={styles.statsContainer}>
          {statsData.map((stats) => (
            <StatsGridComponents stats={stats} key={stats.name} />
          ))}
        </View>
      ) : (
        <RadarStatsChart />
      )}
    </ScreenContainer>
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
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
    marginBottom: 20,
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    borderRadius: 1000,
    alignSelf: "center",
    backgroundColor: GLOBAL_STYLES.secondaryBg,
  },
  btn: {
    fontSize: GLOBAL_STYLES.subHeader,
    color: "#fff",
    paddingVertical: 12,
    borderRadius: 1000,
    paddingHorizontal: 40,
  },
  active: {
    backgroundColor: GLOBAL_STYLES.accentColor75,
  },
  header: {
    textAlign: "center",
    fontSize: 32,
    fontFamily: "Cinzel-Semi-Bold",
    // fontWeight: 800,
    letterSpacing: 1.5,
    color: GLOBAL_STYLES.primaryColor,
  },
  subHeader: {
    textAlign: "center",
    color: GLOBAL_STYLES.secondaryColor,
    fontSize: 16,
    letterSpacing: 1.5,
    fontFamily: "Cinzel-Regular",
  },
});
