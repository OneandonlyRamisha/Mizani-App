import {
  Modal,
  Text,
  View,
  StyleSheet,
  Pressable,
  Alert,
  ScrollView,
} from "react-native";
import { GLOBAL_STYLES } from "../../lib/globalStyles";
import { useEffect, useMemo, useState } from "react";
import { useHabits } from "../../store/habits";
import NameInput from "./inputs/nameInput";
import CategoryInput from "./inputs/categoryInput/categoryInput";
import RepeatInput from "./inputs/repeatInput/repeatInput";
import RepeatOnce from "./inputs/repeatInput/repeatOnce";
import RepeatCustom from "./inputs/repeatInput/reapeatCustom";
import PickerInput from "./inputs/pickerInput/pickerInput";
import ModalBtn from "./modalBtn/modalBtn";
import ModalHeader from "./modalHeader/modalHeader";
import { Habit } from "../../types/habit";
import { formatDateKey } from "../../lib/dateUtils";

function buildInitialForm(): Habit {
  return {
    id: Date.now().toString(),
    name: "",
    createDate: formatDateKey(new Date()),
    completed: [],
    streak: 0,
    difficulty: "Medium",
    repeat: { type: "Daily", days: [] },
    category: "Faith",
  };
}
export default function ModalHabit({
  setModalVisible,
  visible,
  editMode,
  setEditMode,
}: {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  visible: boolean;
  editMode: string | null;
  setEditMode: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const [form, setForm] = useState<Habit>(() => buildInitialForm());
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const { habits, dispatch } = useHabits();
  const editing = editMode !== null;
  const [sliderValue, setSliderValue] = useState(1);

  const difficultyLabels = useMemo(() => ["Easy", "Medium", "Hard"], []);

  useEffect(() => {
    if (!editing) {
      setForm(buildInitialForm());
      setSliderValue(1);
      setSelectedDate(null);
      return;
    }

    const currentHabit = habits.find((item) => item.id === editMode);
    if (!currentHabit) {
      return;
    }

    setForm(currentHabit);
    setSliderValue(
      Math.max(
        0,
        difficultyLabels.indexOf(currentHabit.difficulty ?? "Medium")
      )
    );

    if (currentHabit.repeat.type === "Once") {
      setSelectedDate(currentHabit.repeat.selectedDate ?? null);
    } else {
      setSelectedDate(null);
    }
  }, [difficultyLabels, editMode, editing, habits]);

  function handleAdd() {
    if (!form.name) {
      Alert.alert(
        "Fill The Form",
        "You are missing some fields, you must fill out every field!"
      );
      return;
    }
    if (form.repeat.type === "Custom" && form.repeat.days.length === 0) {
      Alert.alert(
        "Select Days",
        "You must pick at least one day for custom repeat"
      );
      return;
    }
    const difficulty = (difficultyLabels[sliderValue] ?? "Medium") as Habit["difficulty"];

    dispatch({
      type: "ADD_HABIT",
      payload: {
        ...form,
        id: Date.now().toString(),
        createDate: formatDateKey(new Date()),
        difficulty,
      },
    });
    handleClick();
  }

  function handleUpdate() {
    if (!form.name) {
      Alert.alert(
        "Fill The Form",
        "You are missing some fields, you must fill out every field!"
      );
      return;
    }
    if (form.repeat.type === "Custom" && form.repeat.days.length === 0) {
      Alert.alert(
        "Select Days",
        "You must pick at least one day for custom repeat"
      );
      return;
    }

    dispatch({ type: "UPDATE_HABIT", payload: form });
    handleClick();
  }

  function handleDelete() {
    Alert.alert(
      "Delete Habit",
      "Are you sure you want to delete this habit?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            dispatch({ type: "DELETE_HABIT", payload: form.id });
            handleClick();
          },
        },
      ],
      { cancelable: true }
    );
  }

  function handleClick() {
    setModalVisible((prev) => !prev);
    setEditMode(null);
    setForm(buildInitialForm());
    setSelectedDate(null);
    setSliderValue(1);
  }

  function handleChangeText<K extends keyof Habit>(field: K, value: Habit[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.container}>
        <ScrollView style={{ zIndex: 2 }} showsVerticalScrollIndicator={false}>
          <ModalHeader handleClick={handleClick} />
          <View style={styles.bodyContainer}>
            <NameInput handleChangeText={handleChangeText} form={form} />
            <CategoryInput form={form} handleChangeText={handleChangeText} />
            <RepeatInput handleChangeText={handleChangeText} form={form} />
            {form.repeat.type === "Once" && (
              <RepeatOnce
                showCalendar={showCalendar}
                setShowCalendar={setShowCalendar}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                handleChangeText={handleChangeText}
                form={form}
              />
            )}

            {form.repeat.type === "Custom" && (
              <RepeatCustom form={form} handleChangeText={handleChangeText} />
            )}
            <PickerInput
              sliderValue={sliderValue}
              setSliderValue={setSliderValue}
              handleChangeText={handleChangeText}
            />
          </View>
        </ScrollView>
        <View style={styles.btnsContainer}>
          <ModalBtn
            title={!editing ? "Save" : "Update"}
            onPress={!editing ? handleAdd : handleUpdate}
          />
          {editing && (
            <ModalBtn
              title={"Delete"}
              onPress={handleDelete}
              customStyle={{ backgroundColor: "#EF4444" }}
            />
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // position: "absolute",
    right: 0,
    width: "100%",
    bottom: 0,
    // height: "100%",
    backgroundColor: GLOBAL_STYLES.bg,

    paddingVertical: 24,
    paddingHorizontal: 14,

    elevation: 3,
  },

  overlay: {
    flex: 1,
  },

  bodyContainer: {
    marginTop: 32,
    gap: 32,
    marginBottom: 40,
  },

  btnsContainer: {
    bottom: 0,
    // marginTop: 34,
    // marginBottom: 120,
    gap: 10,
    zIndex: 11,
  },
});
