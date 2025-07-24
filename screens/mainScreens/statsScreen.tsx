import ScreenContainer from "../../components/screenContainer/screenContainer";
import { Text, StyleSheet, View, ColorValue, Pressable } from "react-native";
import StatsHeader from "../../components/statsHeader/statsHeader";

import StatsGridComponents from "../../components/statsGridComponent/statsGridComponent";
import RadarStatsChart from "../../components/radarStatsChart/radarStatsChart";
import { useState } from "react";
import { GLOBAL_STYLES } from "../../lib/globalStyles";
import { Ionicons, MaterialCommunityIcons, Fontisto } from "@expo/vector-icons";
import { useProfile } from "../../store/profile";
import StatsButton from "../../components/statsButton/statsButton";
import { getStatsData } from "../../lib/statsData";

export default function StatsScreen() {
  const [statType, setStatType] = useState("Grid");
  const { profile } = useProfile();

  const statsData = getStatsData(profile.stats);
  console.log(profile);
  return (
    <ScreenContainer>
      <StatsHeader />

      <StatsButton setStatType={setStatType} statType={statType} />

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
    gap: 10,
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
});
