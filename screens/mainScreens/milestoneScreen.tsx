import { Text, View } from "react-native";
import ScreenContainer from "../../components/screenContainer/screenContainer";
import MainHeader from "../../components/mainHeader/mainHeader";
import MilestonesComponent from "../../components/milestonesComponent/milestonesComponent";
import { useProfile } from "../../store/profile";
import { useEffect } from "react";
import { useHabits } from "../../store/habits";
import { useSQLiteContext } from "expo-sqlite";

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
    const uniqueDaysPerPillar: Record<string, Set<string>> = {};

    habits.forEach((habit) => {
      const pillar = habit.category;
      if (!uniqueDaysPerPillar[pillar]) uniqueDaysPerPillar[pillar] = new Set();
      habit.completed.forEach((date) => uniqueDaysPerPillar[pillar].add(date));
    });

    const updatedMilestones = profile.milestones.map((m) => {
      const completed = uniqueDaysPerPillar[m.pillar]?.size >= m.daysRequired;
      return { ...m, completed };
    });

    const newProfile = { ...profile, milestones: updatedMilestones };

    // 1. Save to context
    setProfile(newProfile);

    // 2. Save to SQLite
    db.runAsync(
      `INSERT OR REPLACE INTO profile 
       (id, name, level, currentXP, totalXP, age, paid, streak, stats, milestones)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        1,
        newProfile.name,
        newProfile.level,
        newProfile.currentXP,
        newProfile.totalXP,
        newProfile.age,
        newProfile.paid ? 1 : 0,
        JSON.stringify(newProfile.streak),
        JSON.stringify(newProfile.stats),
        JSON.stringify(newProfile.milestones),
      ]
    )
      .then(() => console.log("Milestones updated in SQLite"))
      .catch((err) => console.error("SQLite update error:", err));
  }, [habits]);
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
