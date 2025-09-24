import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Svg, { Polygon } from "react-native-svg";
import { MaterialIcons } from "@expo/vector-icons";
import { useSQLiteContext } from "expo-sqlite";

import ScreenContainer from "../../components/screenContainer/screenContainer";
import AddHabitBtn from "../../components/addHabitBtn/addHabitBtn";
import HabitsComponent from "../../components/habitsComponent/habitsComponent";
import ModalHabit from "../../components/modal/modal";
import { GLOBAL_STYLES } from "../../lib/globalStyles";
import { useHabits } from "../../store/habits";
import { useProfile } from "../../store/profile";
import { formatDateKey, getHeaderLabel } from "../../lib/dateUtils";
import {
  countCompletedHabits,
  selectHabitsForDate,
} from "../../lib/habitSelectors";
import { applyDailyProgress } from "../../lib/profileProgress";
import { persistProfile } from "../../lib/profileStorage";
import { Profile } from "../../types/profile";

export default function DashboardScreen() {
  const { habits } = useHabits();
  const { profile, setProfile } = useProfile();
  const db = useSQLiteContext();

  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState<string | null>(null);
  const floatAnim = useRef(new Animated.Value(0)).current;

  const today = new Date();
  const todayIso = formatDateKey(today);
  const headerLabel = getHeaderLabel(today);
  const normalizedToday = useMemo(() => new Date(todayIso), [todayIso]);

  const todayHabits = useMemo(
    () => selectHabitsForDate(habits, todayIso),
    [habits, todayIso]
  );

  const completedCount = useMemo(
    () => countCompletedHabits(todayHabits, todayIso),
    [todayHabits, todayIso]
  );

  const persistProfileMutation = useCallback(
    async (nextProfile: Profile) => {
      try {
        await persistProfile(db, nextProfile);
      } catch (error) {
        console.error("Failed to persist profile:", error);
      }
    },
    [db]
  );

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -9,
          duration: 2700,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2700,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [floatAnim]);

  useEffect(() => {
    if (!todayHabits.length) {
      return;
    }

    setProfile((previousProfile) => {
      const updatedProfile = applyDailyProgress(previousProfile, {
        completedCount,
        totalHabits: todayHabits.length,
        today: normalizedToday,
        todayIso,
      });

      if (updatedProfile === previousProfile) {
        return previousProfile;
      }

      void persistProfileMutation(updatedProfile);
      return updatedProfile;
    });
  }, [
    completedCount,
    normalizedToday,
    persistProfileMutation,
    setProfile,
    todayHabits.length,
    todayIso,
  ]);

  return (
    <>
      <ScreenContainer>
        <View style={styles.headerRow}>
          <Text style={styles.headerDate}>{headerLabel}</Text>
          <AddHabitBtn setModalVisible={setModalVisible} />
        </View>

        <Animated.View
          style={[styles.imgContainer, { transform: [{ translateY: floatAnim }] }]}
        >
          <Image
            source={require("../../assets/dashboardImg.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </Animated.View>

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
            <Text style={styles.streakText}>
              {profile.streak.length}-DAY STREAK
            </Text>
          </View>
        </View>

        <Text style={styles.title}>TODAY'S BATTLES</Text>

        <View style={styles.bodyContainer}>
          {todayHabits.map((habit) => (
            <HabitsComponent
              key={habit.id}
              setModalVisible={setModalVisible}
              editMode={editMode}
              setEditMode={setEditMode}
              name={habit.name}
              completed={habit.completed.includes(todayIso)}
              category={habit.category}
              id={habit.id}
              difficulty={habit.difficulty}
              streak={habit.streak}
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
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    marginTop: 30,
    fontSize: 20,
    color: GLOBAL_STYLES.accentColor,
    fontFamily: "Cinzel-Regular",
    letterSpacing: 2.5,
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
    marginTop: 10,
    alignSelf: "center",
  },
  image: {
    width: 300,
    height: 300,
    alignSelf: "center",
  },
});
