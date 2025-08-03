import { View, StyleSheet, Text, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { GLOBAL_STYLES } from "../../lib/globalStyles";
import { LinearGradient } from "expo-linear-gradient";
import CategoryComponent from "./categoryComponent/categoryComponent";
import DifficultyComponent from "./difficultyComponent/difficultyComponent";
import { useHabits } from "../../store/habits";
import { useProfile } from "../../store/profile";
import calculateStatGain from "../../lib/statGainedCalculator";

type CategoryKey = "discipline" | "focus" | "wisdom" | "health" | "faith";

export default function HabitsComponent({
  id,
  name,
  completed,
  streak,
  difficulty,
  category,
  setEditMode,
  editMode,
  setModalVisible,
}: {
  id: string;
  name: string;
  completed: boolean;
  streak: number;
  difficulty: "Easy" | "Medium" | "Hard";
  category: "Faith" | "Discipline" | "Focus" | "Health" | "Wisdom";
  editMode: string | null;
  setEditMode: React.Dispatch<React.SetStateAction<string | null>>;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { habits, dispatch } = useHabits();
  const { profile, setProfile } = useProfile();

  // function handleComplete(id: string) {
  //   const habit = habits.find((item) => item.id === id);
  //   if (!habit) return;

  //   const categoryKey = habit.category.toLowerCase() as CategoryKey;
  //   const gain = calculateStatGain(
  //     profile.stats[categoryKey],
  //     habit.difficulty
  //   );

  //   const today = new Date();
  //   const todayStr = today.toLocaleDateString("en-CA").split("T")[0];

  //   const yesterday = new Date(today);
  //   yesterday.setDate(today.getDate() - 1);
  //   const yesterdayStr = yesterday.toLocaleDateString("en-CA").split("T")[0];

  //   const isTodayCompleted = habit.completed.includes(todayStr);
  //   const isYesterdayCompleted = habit.completed.includes(yesterdayStr);

  //   let newStreak = habit.streak;

  //   const addedOverall =
  //     (profile.stats.discipline +
  //       profile.stats.faith +
  //       profile.stats.focus +
  //       profile.stats.health +
  //       profile.stats.wisdom) /
  //     5;

  //   if (!isTodayCompleted) {
  //     // ADD XP
  //     setProfile((prev) => ({
  //       ...prev,
  //       stats: {
  //         ...prev.stats,
  //         [categoryKey]: prev.stats[categoryKey] + gain,
  //         overall: addedOverall,
  //       },
  //     }));

  //     // Update streak
  //     newStreak = isYesterdayCompleted ? habit.streak + 1 : 1;
  //   } else {
  //     // REMOVE XP
  //     setProfile((prev) => ({
  //       ...prev,
  //       stats: {
  //         ...prev.stats,
  //         [categoryKey]: Math.max(0, prev.stats[categoryKey] - gain),
  //         overall: addedOverall,
  //       },
  //     }));

  //     // Reset streak
  //     newStreak = 0;
  //   }

  //   dispatch({
  //     type: "TOGGLE_HABIT",
  //     payload: { id, date: todayStr, streak: newStreak },
  //   });

  //   console.log(habit.streak);
  // }

  function handleComplete(id: string) {
    const habit = habits.find((item) => item.id === id);
    if (!habit) return;

    const categoryKey = habit.category.toLowerCase() as CategoryKey;
    const gain = calculateStatGain(
      profile.stats[categoryKey],
      habit.difficulty
    );

    const today = new Date();
    const todayStr = today.toLocaleDateString("en-CA").split("T")[0];

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const yesterdayStr = yesterday.toLocaleDateString("en-CA").split("T")[0];

    const isTodayCompleted = habit.completed.includes(todayStr);
    // const isYesterdayCompleted = habit.completed.includes(yesterdayStr);
    const completedDates = habit.completed
      .filter((date) => date < todayStr)
      .sort();
    const lastCompletedDateStr = completedDates.length
      ? completedDates[completedDates.length - 1]
      : null;

    let newStreak = 1;
    if (lastCompletedDateStr) {
      const lastDate = new Date(lastCompletedDateStr);
      const todayDate = new Date(todayStr);
      const diffDays =
        (todayDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24);
      newStreak = diffDays === 1 ? habit.streak + 1 : 1;
    }

    // let newStreak = habit.streak;

    if (!isTodayCompleted) {
      // ADD XP

      // ======= START updated stats snippet =======
      setProfile((prev) => {
        const newCategoryValue = prev.stats[categoryKey] + gain;

        const updatedStats = {
          ...prev.stats,
          [categoryKey]: newCategoryValue,
        };

        const updatedOverall =
          (updatedStats.discipline +
            updatedStats.faith +
            updatedStats.focus +
            updatedStats.health +
            updatedStats.wisdom) /
          5;

        return {
          ...prev,
          stats: {
            ...updatedStats,
            overall: updatedOverall,
          },
        };
      });
      // ======= END updated stats snippet =======

      // Update streak
      // newStreak = isYesterdayCompleted ? habit.streak + 1 : 1;
    } else {
      // REMOVE XP

      // ======= START updated stats snippet =======
      setProfile((prev) => {
        const newCategoryValue = Math.max(0, prev.stats[categoryKey] - gain);

        const updatedStats = {
          ...prev.stats,
          [categoryKey]: newCategoryValue,
        };

        const updatedOverall =
          (updatedStats.discipline +
            updatedStats.faith +
            updatedStats.focus +
            updatedStats.health +
            updatedStats.wisdom) /
          5;

        return {
          ...prev,
          stats: {
            ...updatedStats,
            overall: updatedOverall,
          },
        };
      });
      // ======= END updated stats snippet =======

      // Reset streak
      newStreak = 0;
    }

    dispatch({
      type: "TOGGLE_HABIT",
      payload: { id, date: todayStr, streak: newStreak },
    });

    console.log(habit.streak);
  }

  function handleEditMode(id: string) {
    setEditMode(id);
    setModalVisible(true);
    console.log(id);
  }
  return (
    <Pressable
      key={id}
      style={[styles.container, completed ? styles.completed : undefined]}
      onPress={() => handleEditMode(id)}
    >
      <View style={styles.contentContainer}>
        <View style={styles.content}>
          <Text
            style={[
              styles.title,
              completed ? styles.completedTitle : undefined,
            ]}
          >
            {name}
          </Text>
          <View style={styles.desContainer}>
            <CategoryComponent category={category} />
            <DifficultyComponent difficulty={difficulty} />
          </View>
          <View style={styles.xpContainer}>
            <View style={styles.streakContainer}>
              <MaterialIcons
                name="local-fire-department"
                size={14}
                color="red"
              />
              <Text style={styles.steakText}>{streak} days streak</Text>
            </View>
          </View>
        </View>
      </View>
      <View>
        {completed ? (
          <Pressable>
            <MaterialIcons
              name="check-circle-outline"
              size={30}
              color={GLOBAL_STYLES.accentColor}
              style={{ zIndex: 100 }}
              onPress={() => handleComplete(id)}
            />
          </Pressable>
        ) : (
          <Pressable>
            <MaterialIcons
              name="radio-button-unchecked"
              size={30}
              color={GLOBAL_STYLES.secondaryColor}
              style={{ zIndex: 100 }}
              onPress={() => handleComplete(id)}
            />
          </Pressable>
        )}
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
    borderRadius: 16,
    padding: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  completed: {
    backgroundColor: GLOBAL_STYLES.accentColor10,
    borderColor: GLOBAL_STYLES.accentColor50,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    // flexWrap: "wrap"
  },
  desContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  xpContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  content: {
    flexDirection: "column",
    width: "75%",

    gap: 12,
  },
  title: {
    fontSize: GLOBAL_STYLES.header,
    fontWeight: 600,
    color: GLOBAL_STYLES.primaryColor,
    flexWrap: "wrap",
  },

  steakText: {
    fontSize: GLOBAL_STYLES.element,
    color: GLOBAL_STYLES.secondaryColor,
  },
  completedTitle: {
    color: GLOBAL_STYLES.secondaryColor,
    textDecorationLine: "line-through",
  },
});

// last tasks
// add sql
// add milestones to profile context so that we keep track of milestones
