import { Text, View } from "react-native";
import ScreenContainer from "../../components/screenContainer/screenContainer";
import MainHeader from "../../components/mainHeader/mainHeader";
import MilestonesComponent from "../../components/milestonesComponent/milestonesComponent";
import { useEffect } from "react";
import { useSQLiteContext } from "expo-sqlite";

import { useProfile } from "../../store/profile";
import { useHabits } from "../../store/habits";
import { updateMilestonesFromHabits } from "../../lib/profileProgress";
import { persistProfile } from "../../lib/profileStorage";

export default function MilestoneScreen() {
  const { profile, setProfile } = useProfile();
  const { habits } = useHabits();
  const totalMilestones = profile.milestones.length;
  const completedMilestones = profile.milestones.filter(
    (milestone) => milestone.completed
  ).length;
  const db = useSQLiteContext();

  // useEffect(() => {
  //   const uniqueDaysPerPillar: Record<string, Set<string>> = {};

  //   habits.forEach((habit) => {
  //     const pillar = habit.category;

  //     if (!uniqueDaysPerPillar[pillar]) {
  //       uniqueDaysPerPillar[pillar] = new Set();
  //     }

  //     habit.completed.forEach((date) => {
  //       uniqueDaysPerPillar[pillar].add(date);
  //     });
  //   });

  //   const updatedMilestones = profile.milestones.map((m) => ({
  //     ...m,
  //     completed: uniqueDaysPerPillar[m.pillar]?.size >= m.daysRequired,
  //   }));

  //   setProfile((prev) => ({
  //     ...prev,
  //     milestones: updatedMilestones,
  //   }));
  // }, [habits]);
  useEffect(() => {
    const updatedProfile = updateMilestonesFromHabits(profile, habits);

    if (updatedProfile === profile) {
      return;
    }

    setProfile(updatedProfile);
    void persistProfile(db, updatedProfile).catch((error) =>
      console.error("Failed to persist milestone updates:", error)
    );
  }, [db, habits, profile, setProfile]);
  return (
    <ScreenContainer>
      <MainHeader
        totalCompletedXp={completedMilestones}
        totalXp={totalMilestones}
        title="MileStones"
      />
      <View style={{ gap: 15, marginVertical: 20 }}>
        <MilestonesComponent category="Faith" />
        <MilestonesComponent category="Discipline" />
        <MilestonesComponent category="Focus" />
        <MilestonesComponent category="Fitness" />
        <MilestonesComponent category="Wisdom" />
        <MilestonesComponent category="Finance" />
      </View>
    </ScreenContainer>
  );
}
