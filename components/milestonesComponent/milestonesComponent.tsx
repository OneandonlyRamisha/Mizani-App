import { Pressable, Text, View, StyleSheet } from "react-native";
import { Milestone } from "../../types/milestones";
import { LinearGradient } from "expo-linear-gradient";
import { GLOBAL_STYLES } from "../../lib/globalStyles";
import { useProfile } from "../../store/profile";
import { useState } from "react";
import MilestoneItem from "./milestone/milestone";

export default function MilestonesComponent({
  category,
}: {
  category: string;
}) {
  const [active, setActive] = useState(false);
  const { profile } = useProfile();
  const milestones = profile.milestones.filter(
    (milestone) => milestone.pillar === category
  );

  const completedMilestones = milestones.filter(
    (milestone) => milestone.completed
  );

  return (
    <Pressable
      style={styles.container}
      onPress={() => setActive((prev) => !prev)}
    >
      <Text style={styles.title}>{category}</Text>
      <View style={styles.underLine}></View>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarBg}>
          <LinearGradient
            style={{
              width: `${
                (completedMilestones.length / milestones.length) * 100
              }%`,
              height: 7,
              borderRadius: 1000,
            }}
            colors={[GLOBAL_STYLES.accentColor, GLOBAL_STYLES.accentColor50]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          ></LinearGradient>
        </View>
        <Text style={styles.status}>
          {completedMilestones.length}/{milestones.length} Unlocked
        </Text>
      </View>
      {active && (
        <View style={styles.bodyContainer}>
          {milestones.map((milestone) => (
            <MilestoneItem milestone={milestone} key={milestone.title} />
          ))}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: GLOBAL_STYLES.secondaryBg,
    borderWidth: 1,
    borderColor: GLOBAL_STYLES.accentColor20,
    borderRadius: 9,
    paddingVertical: 24,
    paddingHorizontal: 20,
    gap: 5,
  },
  title: {
    fontFamily: "Cinzel-Medium",
    color: GLOBAL_STYLES.accentColor,
    fontSize: 22,
  },
  underLine: {
    width: "100%",
    height: 1,
    backgroundColor: GLOBAL_STYLES.accentColor20,
  },
  progressBarContainer: { gap: 7, marginTop: 12 },
  progressBarBg: {
    height: 7,
    borderRadius: 10000,
    backgroundColor: GLOBAL_STYLES.accentColor10,
    width: "100%",
  },
  status: {
    color: GLOBAL_STYLES.secondaryColor,
  },
  bodyContainer: {
    marginVertical: 12,
    gap: 18,
  },
});
