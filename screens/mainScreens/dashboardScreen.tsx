import { Text, View, StyleSheet } from "react-native";
import ScreenContainer from "../../components/screenContainer/screenContainer";
import MainHeader from "../../components/mainHeader/mainHeader";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { GLOBAL_STYLES } from "../../lib/globalStyles";
import HabitsComponent from "../../components/habitsComponent/habitsComponent";
import AddHabitBtn from "../../components/addHabitBtn/addHabitBtn";
import { useMemo, useState } from "react";
import ModalHabit from "../../components/modal/modal";
import { useHabits } from "../../store/habits";
import { DIFFICULTY_POINTS } from "../../lib/xp";

export default function DashboardScreen() {
  const { habits } = useHabits();

  const today = new Date();
  const dayName = today.toLocaleDateString("en-US", { weekday: "short" });
  const todayStr = today.toLocaleDateString("en-CA").split("T")[0];

  const todayHabits = useMemo(() => {
    return habits.filter((habit) => {
      const { type, days, selectedDate } = habit.repeat;

      if (type === "Daily") return true;

      if (type === "Once" && selectedDate === todayStr) return true;

      if (type === "Custom" && days.includes(dayName)) return true;

      return false;
    });
  }, [habits]);

  const completedTodaysTasks = todayHabits.filter((item) =>
    item.completed.includes(todayStr)
  ).length;

  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState<null | string>(null);

  return (
    <>
      <ScreenContainer>
        <MainHeader
          title="Today's Progress"
          totalCompletedXp={completedTodaysTasks}
          totalXp={todayHabits.length}
        />
        <AddHabitBtn setModalVisible={setModalVisible} />

        <Text style={styles.title}>TODAY'S BATTLES</Text>

        <View style={styles.bodyContainer}>
          {todayHabits.map((data) => (
            <HabitsComponent
              setModalVisible={setModalVisible}
              editMode={editMode}
              setEditMode={setEditMode}
              key={data.id}
              name={data.name}
              completed={data.completed?.includes(todayStr) ?? false}
              category={data.category}
              id={data.id}
              difficulty={data.difficulty}
              streak={data.streak}
            />
          ))}
        </View>
      </ScreenContainer>
      <ModalHabit
        setModalVisible={setModalVisible}
        visible={modalVisible}
        setEditMode={setEditMode}
        editMode={editMode}
      />
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 30,
    fontSize: 20,
    color: GLOBAL_STYLES.accentColor,
    fontFamily: "Cinzel-Regular",
    letterSpacing: 2.5,
  },
  subTitle: {
    textAlign: "center",
    color: GLOBAL_STYLES.secondaryColor,
    fontSize: GLOBAL_STYLES.subHeader,
    letterSpacing: 0.8,
  },
  bodyContainer: {
    marginVertical: 24,
    gap: 14,
  },
});
