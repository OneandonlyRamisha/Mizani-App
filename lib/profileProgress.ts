import { Habit } from "../types/habit";
import { Profile } from "../types/profile";
import { mapUniqueCompletionDaysByPillar } from "./habitSelectors";
import { formatDateKey, getYesterday } from "./dateUtils";

const DISCIPLINE_DECAY_RATE = 0.05;
const DISCIPLINE_REWARD = 0.15;
const MAX_STAT_VALUE = 100;

type DailyProgressInput = {
  completedCount: number;
  totalHabits: number;
  today: Date;
  todayIso: string;
};

export function applyDailyProgress(
  previous: Profile,
  { completedCount, totalHabits, today, todayIso }: DailyProgressInput
): Profile {
  if (totalHabits === 0) {
    return previous;
  }

  const streak = previous.streak ?? [];
  const lastStreakDate = streak[streak.length - 1] ?? null;
  const yesterdayIso = formatDateKey(getYesterday(today));

  let updatedStreak = streak;

  if (completedCount === totalHabits) {
    if (lastStreakDate === todayIso) {
      updatedStreak = streak;
    } else if (lastStreakDate === yesterdayIso) {
      updatedStreak = [...streak, todayIso];
    } else {
      updatedStreak = [todayIso];
    }
  } else {
    if (lastStreakDate === todayIso) {
      updatedStreak = streak.slice(0, -1);
    } else if (
      lastStreakDate &&
      lastStreakDate !== yesterdayIso &&
      lastStreakDate !== todayIso
    ) {
      updatedStreak = [];
    }
  }

  const lastUpdateStr = previous.lastDisciplineUpdate ?? previous.lastUpdateDate ?? "";
  const lastUpdateDate = lastUpdateStr ? new Date(lastUpdateStr) : undefined;

  let daysMissed = 0;
  if (lastUpdateDate) {
    const diffTime = today.getTime() - lastUpdateDate.getTime();
    daysMissed = Math.max(Math.floor(diffTime / (1000 * 60 * 60 * 24)) - 1, 0);
  }

  let newDiscipline = previous.stats.discipline ?? 0;
  if (daysMissed > 0) {
    newDiscipline *= Math.pow(1 - DISCIPLINE_DECAY_RATE, daysMissed);
  }

  const awardedDates = previous.pointsAwardedDates ?? [];
  const hasAwardedToday = awardedDates.includes(todayIso);
  let updatedAwardedDates = awardedDates;

  if (completedCount === totalHabits && !hasAwardedToday) {
    newDiscipline = Math.min(MAX_STAT_VALUE, newDiscipline + DISCIPLINE_REWARD);
    updatedAwardedDates = [...awardedDates, todayIso];
  } else if (completedCount !== totalHabits && hasAwardedToday) {
    newDiscipline = Math.max(0, newDiscipline - DISCIPLINE_REWARD);
    updatedAwardedDates = awardedDates.filter((date) => date !== todayIso);
  }

  const updatedStats = {
    ...previous.stats,
    discipline: newDiscipline,
  };

  const {
    discipline = 0,
    faith = 0,
    finance = 0,
    fitness = 0,
    focus = 0,
    wisdom = 0,
  } = updatedStats;

  const newOverall =
    (discipline + faith + finance + fitness + focus + wisdom) / 6;

  const statsChanged =
    updatedStats.discipline !== previous.stats.discipline ||
    newOverall !== previous.stats.overall;

  const streakChanged = updatedStreak !== streak;
  const awardsChanged = updatedAwardedDates !== awardedDates;
  const lastUpdateChanged = previous.lastDisciplineUpdate !== todayIso;

  if (!statsChanged && !streakChanged && !awardsChanged && !lastUpdateChanged) {
    return previous;
  }

  return {
    ...previous,
    streak: updatedStreak,
    stats: {
      ...updatedStats,
      overall: newOverall,
    },
    pointsAwardedDates: updatedAwardedDates,
    lastDisciplineUpdate: todayIso,
  };
}

export function updateMilestonesFromHabits(
  profile: Profile,
  habits: Habit[]
): Profile {
  if (!profile.milestones.length) {
    return profile;
  }

  const uniqueCompletions = mapUniqueCompletionDaysByPillar(habits);

  const updatedMilestones = profile.milestones.map((milestone) => ({
    ...milestone,
    completed:
      (uniqueCompletions[milestone.pillar] ?? 0) >= milestone.daysRequired,
  }));

  const hasChanged = profile.milestones.some((milestone, index) => {
    return milestone.completed !== updatedMilestones[index]?.completed;
  });

  if (!hasChanged) {
    return profile;
  }

  return {
    ...profile,
    milestones: updatedMilestones,
  };
}
