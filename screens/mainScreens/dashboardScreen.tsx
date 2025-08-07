import { Text, View, StyleSheet, Image } from "react-native";
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
import Svg, { Polygon } from "react-native-svg";
import { MaterialIcons } from "@expo/vector-icons";

export default function DashboardScreen() {
  const { habits } = useHabits();

  const today = new Date();
  const dayName = today.toLocaleDateString("en-US", { weekday: "short" });
  const todayStr = today.toLocaleDateString("en-CA").split("T")[0];

  const headerDayName = today
    .toLocaleDateString("en-US", { weekday: "long" })
    .toLowerCase(); // e.g., "thursday"
  const day = today.getDate(); // e.g., 7
  const monthName = today
    .toLocaleDateString("en-US", { month: "long" })
    .toLowerCase(); // e.g., "august"

  const HeaderDates = `${headerDayName}, ${day} ${monthName}`;

  const todayHabits = useMemo(() => {
    return habits.filter((habit) => {
      const { type, days, selectedDate } = habit.repeat;

      if (type === "Daily") return true;

      if (type === "Once" && selectedDate === todayStr) return true;

      if (type === "Custom" && days.includes(dayName)) return true;

      return false;
    });
  }, [habits]);
  const thisShit = todayHabits.map((item) => item.completed);
  console.log(todayStr + "awdawdad" + " " + thisShit);

  const completedTodaysTasks = todayHabits.filter((item) =>
    item.completed.includes(todayStr)
  ).length;

  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState<null | string>(null);

  return (
    <>
      <ScreenContainer>
        {/* <MainHeader
          title="Today's Progress"
          totalCompletedXp={completedTodaysTasks}
          totalXp={todayHabits.length}
        /> */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.headerDate}>{HeaderDates}</Text>
          <AddHabitBtn setModalVisible={setModalVisible} />
        </View>

        {/* 
        <View
          style={{
            width: 150,
            height: 150,
            borderRadius: "50%",
            borderWidth: 9,
            borderColor: GLOBAL_STYLES.accentColor,
            alignSelf: "center",
            marginTop: 40,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {" "}
          <Text
            style={{
              fontSize: 42,
              fontWeight: 800,
              color: GLOBAL_STYLES.accentColor,
            }}
          >
            40%
          </Text>
        </View> */}

        <View style={styles.imgContainer}>
          <Image
            source={require("../../assets/dashboardImg.png")} // local image
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.streakWrapper}>
          <Svg width={250} height={50}>
            <Polygon
              points="20,0 250,0 230,50 0,50"
              fill={GLOBAL_STYLES.accentColor20}
              stroke={GLOBAL_STYLES.accentColor50}
              strokeWidth="1"
            />
          </Svg>
          <View style={styles.streakContent}>
            <MaterialIcons
              name="local-fire-department"
              size={18}
              color={GLOBAL_STYLES.accentColor}
            />
            <Text style={styles.streakText}>12-DAY STREAK</Text>
          </View>
        </View>

        {/* <AddHabitBtn setModalVisible={setModalVisible} /> */}

        <Text style={styles.title}>TODAY'S BATTLES</Text>

        <View style={styles.bodyContainer}>
          {todayHabits.map((data) => (
            <HabitsComponent
              setModalVisible={setModalVisible}
              editMode={editMode}
              setEditMode={setEditMode}
              key={data.id}
              name={data.name}
              completed={data.completed.includes(todayStr) ? true : false}
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
  headerDate: {
    color: GLOBAL_STYLES.primaryColor,
    fontSize: 16,
    fontFamily: "Cinzel-Regular",
  },
  streakContainer: {
    marginTop: 20,
    flexDirection: "row",
    gap: 5,
    backgroundColor: GLOBAL_STYLES.accentColor20,
    alignSelf: "center",
    paddingVertical: 9,
    paddingHorizontal: 30,
    borderTopColor: GLOBAL_STYLES.accentColor50,
    borderBottomColor: GLOBAL_STYLES.accentColor50,
    borderWidth: 1,
    // border-left: 3px solid transparent,

    // clipPath: polygon(3px 0%, 297px 0%, 100% 100%, 0% 100%);
  },
  streakWrapper: {
    alignSelf: "center",
    marginTop: 20,
    position: "relative",
    width: 250,
    height: 50,
    alignItems: "center",
  },
  streakContent: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 250,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  streakText: {
    fontFamily: "Cinzel-Regular",
    color: GLOBAL_STYLES.accentColor,
    fontSize: 16,
  },
  imgContainer: {
    marginTop: 30,
    alignSelf: "center",
  },
  image: {
    width: 300,
    height: 300,
    // backgroundColor: "red",
    // height: "50%",

    // aspectRatio: 1,

    alignSelf: "center",
  },
});
