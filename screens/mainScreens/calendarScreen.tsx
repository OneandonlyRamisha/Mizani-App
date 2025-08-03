import { Text, View, StyleSheet } from "react-native";
import ScreenContainer from "../../components/screenContainer/screenContainer";
import { useMemo, useState } from "react";
import { Calendar } from "react-native-calendars";
import { GLOBAL_STYLES } from "../../lib/globalStyles";
import { useHabits } from "../../store/habits";
import moment from "moment";
import HabitsComponent from "../../components/habitsComponent/habitsComponent";
import MainHeader from "../../components/mainHeader/mainHeader";

export default function CalendarScreen() {
  const today = new Date();
  const todayStr = today.toLocaleDateString("en-CA").split("T")[0];

  const [selectedDate, setSelectedDate] = useState<string>(todayStr);
  const { habits } = useHabits();

  const displayDate = useMemo(() => {
    if (!selectedDate) return [];

    const dayName = new Date(selectedDate).toLocaleDateString("en-US", {
      weekday: "short",
    });

    return habits.filter((habit) => {
      const { type, days, selectedDate: habitDate } = habit.repeat;

      const habitCreatedAt = habit.createDate; // depends on what you used
      if (habitCreatedAt > selectedDate) return false;

      if (type === "Daily") return true;

      if (type === "Once" && habitDate === selectedDate) return true;

      if (type === "Custom" && days.includes(dayName)) return true;

      return false;
    });
  }, [habits, selectedDate]);

  const completedArray = displayDate.filter((item) =>
    item.completed.includes(selectedDate)
  ).length;

  return (
    <ScreenContainer>
      <View style={{ marginBottom: 15 }}>
        <MainHeader
          title="Completed Stat"
          totalXp={displayDate.length}
          totalCompletedXp={completedArray}
        />
      </View>

      <View
        style={{
          backgroundColor: GLOBAL_STYLES.secondaryBg,
          borderRadius: 12,
          padding: 10,
        }}
      >
        <Calendar
          theme={{
            backgroundColor: "#000",
            calendarBackground: GLOBAL_STYLES.secondaryBg,
            textSectionTitleColor: GLOBAL_STYLES.accentColor, // gold
            selectedDayBackgroundColor: GLOBAL_STYLES.accentColor,
            selectedDayTextColor: "#0d0d0d",
            todayTextColor: GLOBAL_STYLES.accentColor,
            dayTextColor: "#e5e7eb",
            textDisabledColor: "#555",
            monthTextColor: "#facc15",
            arrowColor: "#facc15",
            textDayFontFamily: "System",
            textMonthFontFamily: "System",
            textDayHeaderFontFamily: "System",
            textDayFontSize: 16,
            textMonthFontSize: 20,
            textDayHeaderFontSize: 14,
          }}
          markedDates={{
            [selectedDate]: {
              selected: true,
              selectedColor: "#facc15",
              selectedTextColor: "#0d0d0d",
            },
          }}
          onDayPress={(day) => {
            setSelectedDate(day.dateString);
          }}
        />
      </View>
      <View style={styles.bodyContainer}>
        {displayDate.map((data) => (
          <HabitsComponent
            setModalVisible={() => null}
            editMode={null}
            setEditMode={() => null}
            key={data.id}
            name={data.name}
            completed={data.completed?.includes(selectedDate) ?? false}
            category={data.category}
            id={data.id}
            difficulty={data.difficulty}
            streak={data.streak}
          />
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  bodyContainer: {
    marginVertical: 24,
    gap: 14,
  },
  statsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    gap: 20,
  },
  stat: {
    flex: 1,

    backgroundColor: GLOBAL_STYLES.secondaryBg,
    // width: "49%",
    alignItems: "center",
    gap: 10,
    paddingVertical: 20,
    paddingHorizontal: 4,
    borderRadius: 9,
  },
  statText: {
    fontSize: 16,
    color: GLOBAL_STYLES.primaryColor,
    fontWeight: 600,
  },
});

// tasks make stats logic work so when we click on compeltted tasks make stats update
// Implement streak logic
