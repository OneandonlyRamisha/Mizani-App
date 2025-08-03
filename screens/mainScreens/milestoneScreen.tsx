import { Text, View } from "react-native";
import ScreenContainer from "../../components/screenContainer/screenContainer";
import MainHeader from "../../components/mainHeader/mainHeader";
import MilestonesComponent from "../../components/milestonesComponent/milestonesComponent";
import { useProfile } from "../../store/profile";
import { useEffect } from "react";
import { useHabits } from "../../store/habits";

export default function MilestoneScreen() {
  const { profile, setProfile } = useProfile();
  const { habits } = useHabits();
  const totalMilestones = profile.milestones.length;
  const completedMilestones = profile.milestones.filter(
    (milestone) => milestone.completed
  ).length;

  useEffect(() => {
    const uniqueDaysPerPillar: Record<string, Set<string>> = {};

    habits.forEach((habit) => {
      const pillar = habit.category;

      if (!uniqueDaysPerPillar[pillar]) {
        uniqueDaysPerPillar[pillar] = new Set();
      }

      habit.completed.forEach((date) => {
        uniqueDaysPerPillar[pillar].add(date);
      });
    });

    setProfile((prev) => ({
      ...prev,
      milestones: prev.milestones.map((m) => ({
        ...m,
        completed: uniqueDaysPerPillar[m.pillar]?.size >= m.daysRequired,
      })),
    }));
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
        <MilestonesComponent category="Health" />
        <MilestonesComponent category="Wisdom" />
      </View>
    </ScreenContainer>
  );
}
