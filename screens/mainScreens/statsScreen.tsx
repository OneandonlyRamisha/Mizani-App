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
import StatsMizanani from "../../components/statsMizani/statsMizani";

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
      <StatsMizanani />
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
