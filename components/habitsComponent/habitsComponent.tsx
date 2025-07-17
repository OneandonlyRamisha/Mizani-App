import { View, StyleSheet, Text, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { GLOBAL_STYLES } from "../../lib/globalStyles";
import { LinearGradient } from "expo-linear-gradient";
import CategoryComponent from "./categoryComponent/categoryComponent";
import DifficultyComponent from "./difficultyComponent/difficultyComponent";
import { useHabits } from "../../store/habits";

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
  const { dispatch } = useHabits();

  function handleComplete(id: string) {
    dispatch({ type: "TOGGLE_HABIT", payload: id });
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
            <Text style={styles.steakText}>
              + {difficulty === "Easy" ? 10 : difficulty === "Medium" ? 25 : 50}{" "}
              XP
            </Text>
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
