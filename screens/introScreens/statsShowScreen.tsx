import { Pressable, StyleSheet, Text, View } from "react-native";
import { useProfile } from "../../store/profile";
import React, { useState } from "react";
import RadarStatsChart from "../../components/radarStatsChart/radarStatsChart";
import StatsGridComponents from "../../components/statsGridComponent/statsGridComponent";
import { GLOBAL_STYLES } from "../../lib/globalStyles";
import { getStatsData } from "../../lib/statsData";
import StatsButton from "../../components/statsButton/statsButton";
import NextBtn from "../../components/introScreenComponents/nextBtn/nextBtn";

export default function StatsShowScreen({
  setActiveScreen,
}: {
  setActiveScreen: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { profile } = useProfile();
  const [statType, setStatType] = useState("Grid");

  const statsData = getStatsData(profile.stats);

  function handlePress() {
    setActiveScreen("paywall");
  }

  return (
    <View
      style={{
        width: "100%",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <View>
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
      </View>
      <NextBtn onPress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
});
