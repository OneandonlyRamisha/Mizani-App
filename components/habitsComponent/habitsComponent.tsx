import { useCallback, useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { GLOBAL_STYLES } from "../../lib/globalStyles";
import { useHabits } from "../../store/habits";
import { useProfile } from "../../store/profile";
import calculateStatGain from "../../lib/statGainedCalculator";
import calculateStreak from "../../lib/calcStreak";
import { HabitCategory, HabitDifficulty } from "../../types/habit";
import { Profile } from "../../types/profile";
import { useSQLiteContext } from "expo-sqlite";
import { persistProfile } from "../../lib/profileStorage";
import { formatDateKey } from "../../lib/dateUtils";

type CategoryKey =
  | "discipline"
  | "focus"
  | "wisdom"
  | "fitness"
  | "faith"
  | "finance";

type HabitComponentProps = {
  id: string;
  name: string;
  completed: boolean;
  streak: number;
  difficulty: HabitDifficulty;
  category: HabitCategory;
  editMode: string | null;
  setEditMode: React.Dispatch<React.SetStateAction<string | null>>;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  calendar?: boolean;
};

function CompletionToggle({
  completed,
  onPress,
  disabled,
}: {
  completed: boolean;
  onPress: () => void;
  disabled: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      style={styles.toggle}
      onPress={disabled ? undefined : onPress}
    >
      <MaterialIcons
        name={completed ? "check-circle-outline" : "radio-button-unchecked"}
        size={34}
        color={
          completed ? GLOBAL_STYLES.accentColor : GLOBAL_STYLES.secondaryColor
        }
      />
    </Pressable>
  );
}

export default function HabitsComponent({
  id,
  name,
  completed,
  streak,
  difficulty,
  category,
  setEditMode,
  setModalVisible,
  calendar,
  editMode: _editMode,
}: HabitComponentProps) {
  const { habits, dispatch } = useHabits();
  const { setProfile } = useProfile();
  const db = useSQLiteContext();

  const isReadOnly = Boolean(calendar);

  const difficultyColor = useMemo(() => {
    switch (difficulty) {
      case "Easy":
        return GLOBAL_STYLES.green;
      case "Medium":
        return GLOBAL_STYLES.orange;
      case "Hard":
      default:
        return GLOBAL_STYLES.red;
    }
  }, [difficulty]);

  const handleComplete = useCallback(
    (habitId: string) => {
      const habit = habits.find((item) => item.id === habitId);
      if (!habit) {
        return;
      }

      const todayIso = formatDateKey(new Date());
      const isCompleted = habit.completed?.includes(todayIso) ?? false;

      const updatedCompleted = isCompleted
        ? habit.completed.filter((date) => date !== todayIso)
        : [...habit.completed, todayIso];

      const newStreak = calculateStreak(updatedCompleted, habit.repeat);

      setProfile((previousProfile) => {
        const categoryKey = habit.category.toLowerCase() as CategoryKey;
        const previousStat = previousProfile.stats[categoryKey] ?? 0;
        const gain = calculateStatGain(previousStat, habit.difficulty);

        const nextStatValue = Math.max(
          0,
          previousStat + (isCompleted ? -gain : gain)
        );

        const updatedStats = {
          ...previousProfile.stats,
          [categoryKey]: nextStatValue,
        };

        const {
          discipline = 0,
          faith = 0,
          finance = 0,
          fitness = 0,
          focus = 0,
          wisdom = 0,
        } = updatedStats;

        const nextProfile: Profile = {
          ...previousProfile,
          stats: {
            ...updatedStats,
            overall:
              (discipline + faith + finance + fitness + focus + wisdom) / 6,
          },
        };

        void persistProfile(db, nextProfile).catch((error) => {
          console.error(
            "Failed to persist profile after habit toggle:",
            error
          );
        });

        return nextProfile;
      });

      dispatch({
        type: "TOGGLE_HABIT",
        payload: { id: habitId, date: todayIso, streak: newStreak },
      });
    },
    [db, dispatch, habits, setProfile]
  );

  const handleToggle = useCallback(() => {
    if (isReadOnly) {
      return;
    }
    handleComplete(id);
  }, [handleComplete, id, isReadOnly]);

  const handleEditMode = useCallback(() => {
    setEditMode(id);
    setModalVisible(true);
  }, [id, setEditMode, setModalVisible]);

  return (
    <Pressable
      style={[styles.container, completed && styles.completed]}
      onPress={handleEditMode}
    >
      <View style={styles.contentContainer}>
        <View style={styles.titleRow}>
          <CompletionToggle
            completed={completed}
            onPress={handleToggle}
            disabled={isReadOnly}
          />

          <View style={styles.content}>
            <Text
              style={[styles.title, completed && styles.completedTitle]}
              numberOfLines={2}
            >
              {name}
            </Text>
            <View style={styles.desContainer}>
              <Text style={styles.desText}>{category}</Text>
              <Text style={styles.desText}>&#183;</Text>
              <Text style={[styles.desText, { color: difficultyColor }]}>
                {difficulty}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.streakContainer}>
          <MaterialIcons
            name="local-fire-department"
            size={20}
            color={GLOBAL_STYLES.accentColor}
          />
          <Text style={styles.streakText}>{streak}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: GLOBAL_STYLES.card,
    borderWidth: 1,
    borderColor: GLOBAL_STYLES.progressBarBg,
    elevation: 2,
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  completed: {
    backgroundColor: GLOBAL_STYLES.accentColor10,
    borderColor: GLOBAL_STYLES.accentColor50,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    flex: 1,
  },
  content: {
    flexDirection: "column",
    flex: 1,
    gap: 2,
  },
  toggle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  desContainer: {
    flexDirection: "row",
    gap: 7,
    alignItems: "center",
  },
  desText: {
    color: GLOBAL_STYLES.secondaryColor,
    textTransform: "uppercase",
    fontFamily: "Cinzel-Medium",
  },
  title: {
    fontSize: 18,
    fontFamily: "Cinzel-Medium",
    color: GLOBAL_STYLES.primaryColor,
    flexWrap: "wrap",
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  streakText: {
    fontSize: 18,
    color: GLOBAL_STYLES.accentColor,
  },
  completedTitle: {
    color: GLOBAL_STYLES.secondaryColor,
    textDecorationLine: "line-through",
  },
});
