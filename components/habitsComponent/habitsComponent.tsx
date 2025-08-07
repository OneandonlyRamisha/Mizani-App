import { View, StyleSheet, Text, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { GLOBAL_STYLES } from "../../lib/globalStyles";
import { LinearGradient } from "expo-linear-gradient";
import CategoryComponent from "./categoryComponent/categoryComponent";
import DifficultyComponent from "./difficultyComponent/difficultyComponent";
import { useHabits } from "../../store/habits";
import { useProfile } from "../../store/profile";
import calculateStatGain from "../../lib/statGainedCalculator";
import calculateStreak from "../../lib/calcStreak";
import { Profile } from "../../types/profile";

type CategoryKey = "discipline" | "focus" | "wisdom" | "fitness" | "faith";

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
  category: "Faith" | "Discipline" | "Focus" | "Fitness" | "Wisdom";
  editMode: string | null;
  setEditMode: React.Dispatch<React.SetStateAction<string | null>>;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { habits, dispatch } = useHabits();
  const { profile, setProfile } = useProfile();

  function handleComplete(id: string) {
    const habit = habits.find((item) => item.id === id);
    if (!habit) return;

    const categoryKey = habit.category.toLowerCase() as CategoryKey;
    const gain = calculateStatGain(
      profile.stats[categoryKey],
      habit.difficulty
    );
    const todayStr = new Date().toLocaleDateString("en-CA").split("T")[0];
    const isCompleted = habit.completed.includes(todayStr);

    let updatedCompleted = [...habit.completed];

    if (isCompleted) {
      // uncheck - remove date
      updatedCompleted = updatedCompleted.filter((d) => d !== todayStr);
    } else {
      // check - add date
      updatedCompleted.push(todayStr);
    }

    // Recalculate streak based on new list
    const newStreak = calculateStreak(updatedCompleted, habit.repeat);

    // Update XP
    setProfile((prev) => {
      const newStatValue = Math.max(
        0,
        prev.stats[categoryKey] + (isCompleted ? -gain : gain)
      );

      const updatedStats = {
        ...prev.stats,
        [categoryKey]: newStatValue,
      };

      const updatedOverall =
        (updatedStats.discipline +
          updatedStats.faith +
          updatedStats.focus +
          updatedStats.fitness +
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

    dispatch({
      type: "TOGGLE_HABIT",
      payload: { id, date: todayStr, streak: newStreak },
    });
  }
  // const db = useSQLiteContext();
  // async function updateProfileInDB(updatedProfile: Profile) {
  //   await db.runAsync(`UPDATE profiles SET stats = ? WHERE name = ?`, [
  //     JSON.stringify(updatedProfile.stats),
  //     profile.name,
  //   ]);
  // }

  // function handleComplete(id: string) {
  //   const habit = habits.find((item) => item.id === id);
  //   if (!habit) return;

  //   const categoryKey = habit.category.toLowerCase() as CategoryKey;
  //   const gain = calculateStatGain(
  //     profile.stats[categoryKey],
  //     habit.difficulty
  //   );
  //   const todayStr = new Date().toISOString().split("T")[0];
  //   const isCompleted = habit.completed.includes(todayStr);

  //   let updatedCompleted = [...habit.completed];

  //   if (isCompleted) {
  //     updatedCompleted = updatedCompleted.filter((d) => d !== todayStr);
  //   } else {
  //     updatedCompleted.push(todayStr);
  //   }

  //   const newStreak = calculateStreak(updatedCompleted, habit.repeat);

  //   setProfile((prev) => {
  //     const newStatValue = Math.max(
  //       0,
  //       prev.stats[categoryKey] + (isCompleted ? -gain : gain)
  //     );

  //     const updatedStats = {
  //       ...prev.stats,
  //       [categoryKey]: newStatValue,
  //     };

  //     const updatedOverall =
  //       (updatedStats.discipline +
  //         updatedStats.faith +
  //         updatedStats.focus +
  //         updatedStats.fitness +
  //         updatedStats.wisdom) /
  //       5;

  //     const updatedProfile = {
  //       ...prev,
  //       stats: {
  //         ...updatedStats,
  //         overall: updatedOverall,
  //       },
  //     };

  //     updateProfileInDB(updatedProfile); // async call, no await here

  //     return updatedProfile;
  //   });

  //   dispatch({
  //     type: "TOGGLE_HABIT",
  //     payload: { id, date: todayStr, streak: newStreak },
  //   });
  // }

  function handleEditMode(id: string) {
    setEditMode(id);
    setModalVisible(true);
    console.log(id);
    console.log(completed);
  }
  return (
    // <Pressable
    //   key={id}
    //   style={[styles.container, completed ? styles.completed : undefined]}
    //   onPress={() => handleEditMode(id)}
    // >
    //   <View style={styles.contentContainer}>
    //     <View style={styles.content}>
    //       <Text
    //         style={[
    //           styles.title,
    //           completed ? styles.completedTitle : undefined,
    //         ]}
    //       >
    //         {name}
    //       </Text>
    //       <View style={styles.desContainer}>
    //         {/* <CategoryComponent category={category} /> */}
    //         {/* <DifficultyComponent difficulty={difficulty} /> */}
    //         <Text style={styles.desText}>{category}</Text>
    //         <Text style={styles.desText}>&#183;</Text>
    //         <Text style={styles.desText}>{difficulty}</Text>
    //       </View>
    //       <View style={styles.xpContainer}>
    //         <View style={styles.streakContainer}>
    //           <MaterialIcons
    //             name="local-fire-department"
    //             size={14}
    //             color="red"
    //           />
    //           <Text style={styles.steakText}>{streak} days streak</Text>
    //         </View>
    //       </View>
    //     </View>
    //   </View>
    //   <View>
    //     {completed ? (
    //       <Pressable
    //         style={{
    //           flex: 1,
    //           alignItems: "center",
    //           justifyContent: "center",
    //         }}
    //         onPress={() => handleComplete(id)}
    //       >
    //         <MaterialIcons
    //           name="check-circle-outline"
    //           size={34}
    //           color={GLOBAL_STYLES.accentColor}
    //           style={{ zIndex: 100 }}
    //         />
    //       </Pressable>
    //     ) : (
    //       <Pressable
    //         style={{
    //           flex: 1,
    //           alignItems: "center",
    //           justifyContent: "center",
    //         }}
    //         onPress={() => handleComplete(id)}
    //       >
    //         <MaterialIcons
    //           name="radio-button-unchecked"
    //           size={34}
    //           color={GLOBAL_STYLES.secondaryColor}
    //           style={{ zIndex: 100 }}
    //         />
    //       </Pressable>
    //     )}
    //   </View>
    // </Pressable>
    <Pressable
      key={id}
      style={[styles.container, completed ? styles.completed : undefined]}
      onPress={() => handleEditMode(id)}
    >
      <View style={styles.contentContainer}>
        <View style={{ flexDirection: "row", gap: 9 }}>
          <View>
            {completed ? (
              <Pressable
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => handleComplete(id)}
              >
                <MaterialIcons
                  name="check-circle-outline"
                  size={34}
                  color={GLOBAL_STYLES.accentColor}
                  style={{ zIndex: 100 }}
                />
              </Pressable>
            ) : (
              <Pressable
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => handleComplete(id)}
              >
                <MaterialIcons
                  name="radio-button-unchecked"
                  size={34}
                  color={GLOBAL_STYLES.secondaryColor}
                  style={{ zIndex: 100 }}
                />
              </Pressable>
            )}
          </View>
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
              {/* <CategoryComponent category={category} /> */}
              {/* <DifficultyComponent difficulty={difficulty} /> */}
              <Text style={styles.desText}>{category}</Text>
              <Text style={styles.desText}>&#183;</Text>
              <Text
                style={[
                  styles.desText,
                  {
                    color:
                      difficulty === "Easy"
                        ? GLOBAL_STYLES.green
                        : difficulty === "Medium"
                        ? GLOBAL_STYLES.orange
                        : GLOBAL_STYLES.red,
                  },
                ]}
              >
                {difficulty}
              </Text>
            </View>
            {/* <View style={styles.xpContainer}>
            <View style={styles.streakContainer}>
              <MaterialIcons
                name="local-fire-department"
                size={14}
                color="red"
              />
              <Text style={styles.steakText}>{streak} days streak</Text>
            </View>
          </View> */}
          </View>
        </View>

        <View style={styles.xpContainer}>
          <View style={styles.streakContainer}>
            <MaterialIcons
              name="local-fire-department"
              size={20}
              color={GLOBAL_STYLES.accentColor}
            />
            <Text style={styles.steakText}>{streak}</Text>
          </View>
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
    // borderRadius: 7,
    paddingHorizontal: 12,
    paddingVertical: 16,
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
    // gap: 10,
    width: "100%",
    justifyContent: "space-between",
    // flexWrap: "wrap"
  },
  desContainer: {
    flexDirection: "row",
    gap: 7,
    alignItems: "center",
  },
  xpContainer: {
    flexDirection: "row",
    alignItems: "center",

    // gap: 10,
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  content: {
    flexDirection: "column",
    width: "78%",
    // maxWidth: "76%",
    gap: 2,
  },
  desText: {
    color: GLOBAL_STYLES.secondaryColor,
    textTransform: "uppercase",
    fontFamily: "Cinzel-Medium",
  },
  title: {
    fontSize: 18,
    // fontWeight: 600,
    fontFamily: "Cinzel-Medium",
    color: GLOBAL_STYLES.primaryColor,
    flexWrap: "wrap",
  },

  steakText: {
    fontSize: 18,
    color: GLOBAL_STYLES.accentColor,
  },
  completedTitle: {
    color: GLOBAL_STYLES.secondaryColor,
    textDecorationLine: "line-through",
  },
});

// last tasks
// add sql
// add milestones to profile context so that we keep track of milestones
