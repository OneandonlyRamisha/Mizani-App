import { Text, View, StyleSheet } from "react-native";
import ScreenContainer from "../../components/screenContainer/screenContainer";
import MainHeader from "../../components/mainHeader/mainHeader";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { GLOBAL_STYLES } from "../../lib/globalStyles";
import { MOCK_DATA } from "../../lib/mockData";
import HabitsComponent from "../../components/habitsComponent/habitsComponent";
import AddHabitBtn from "../../components/addHabitBtn/addHabitBtn";
import { useMemo, useState } from "react";
import ModalHabit from "../../components/modal/modal";
import { useHabits } from "../../store/habits";

export default function DashboardScreen() {
  const { habits } = useHabits();

  const today = new Date();
  const dayName = today.toLocaleDateString("en-US", { weekday: "short" });
  const todayStr = today.toISOString().split("T")[0];

  const todayHabits = useMemo(() => {
    return habits.filter((habit) => {
      const { type, days, selectedDate } = habit.repeat;

      if (type === "Daily") return true;

      if (type === "Once" && selectedDate === todayStr) return true;

      if (type === "Custom" && days.includes(dayName)) return true;

      return false;
    });
  }, [habits]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(null);
  return (
    <>
      <ScreenContainer>
        <MainHeader />
        <View style={styles.sectionHeaderContainer}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons
              name="lightning-bolt"
              size={24}
              color={GLOBAL_STYLES.accentColor}
            />
            <Text style={styles.title}>Daily Quest Board</Text>
            <MaterialCommunityIcons
              name="lightning-bolt"
              size={24}
              color={GLOBAL_STYLES.accentColor}
            />
          </View>
          <Text style={styles.subTitle}>
            Level up your life, one quest at a time!
          </Text>
        </View>
        <View style={styles.bodyContainer}>
          {todayHabits.map((data) => (
            <HabitsComponent
              setModalVisible={setModalVisible}
              editMode={editMode}
              setEditMode={setEditMode}
              key={data.id}
              name={data.name}
              completed={data.completed}
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
      <AddHabitBtn setModalVisible={setModalVisible} />
    </>
  );
}

const styles = StyleSheet.create({
  sectionHeaderContainer: {
    alignItems: "center",
    marginTop: 40,
    gap: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: GLOBAL_STYLES.header,
    color: GLOBAL_STYLES.accentColor,
    fontWeight: 700,
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
