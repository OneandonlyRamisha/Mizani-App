import {
  Modal,
  Text,
  View,
  StyleSheet,
  Pressable,
  Alert,
  ScrollView,
} from "react-native";
import { BlurView } from "expo-blur";
import { GLOBAL_STYLES } from "../../lib/globalStyles";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { useHabits } from "../../store/habits";
import NameInput from "./inputs/nameInput";
import CategoryInput from "./inputs/categoryInput/categoryInput";
import RepeatInput from "./inputs/repeatInput/repeatInput";
import RepeatOnce from "./inputs/repeatInput/repeatOnce";
import RepeatCustom from "./inputs/repeatInput/reapeatCustom";
import PickerInput from "./inputs/pickerInput/pickerInput";
import ModalBtn from "./modalBtn/modalBtn";
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
  const initialForm = {
    id: Date.now().toString(),
    name: "",
    createDate: Date.now().toString(),
    completed: false,
    streak: 0,
    difficulty: "Medium",
    repeat: { type: "Daily", days: [] },
    category: "Faith",
  };
  const [form, setForm] = useState(initialForm);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const { habits, dispatch } = useHabits();
  const editing = editMode !== null;
  const [sliderValue, setSliderValue] = useState(1);

  useEffect(() => {
    if (editing) {
      const currectHabit = habits.find((item) => item.id === editMode);
      if (currectHabit) {
        setForm(currectHabit); // ← this is key
      }
    }
  }, [editing, habits, editMode]);

  function handleBtnClikc() {
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
    dispatch({ type: "ADD_HABIT", payload: form });
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
    setForm(initialForm);
    setSelectedDate(null);
    setSliderValue(1);
  }

  function handleChangeText(field: string, value: any) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }
  return (
    <Modal visible={visible} transparent animationType="slide">
      <BlurView
        intensity={100}
        tint="systemThinMaterialDark"
        style={styles.overlay}
      ></BlurView>
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Ionicons
              name="sparkles-sharp"
              size={24}
              color={GLOBAL_STYLES.accentColor}
            />
            <Text style={styles.title}>Create New Habit</Text>
          </View>
          <Pressable onPress={handleClick}>
            <AntDesign
              name="close"
              size={24}
              color={GLOBAL_STYLES.secondaryColor}
            />
          </Pressable>
        </View>
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
        <View style={styles.btnsContainer}>
          <ModalBtn
            title={!editing ? "Save" : "Update"}
            onPress={!editing ? handleBtnClikc : handleUpdate}
          />
          {editing && (
            <ModalBtn
              title={"Delete"}
              onPress={handleDelete}
              customStyle={{ backgroundColor: "#EF4444" }}
            />
          )}
        </View>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    right: 0,
    width: "100%",
    bottom: 0,
    height: "92%",
    backgroundColor: GLOBAL_STYLES.secondaryBg,
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    padding: 28,
    elevation: 3,
  },
  overlay: {
    flex: 1,
  },

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  title: {
    fontSize: GLOBAL_STYLES.header,
    fontWeight: 700,
    color: GLOBAL_STYLES.accentColor,
  },
  bodyContainer: {
    marginTop: 24,
    gap: 24,
  },

  btnsContainer: {
    marginTop: 34,
    marginBottom: 120,
    gap: 10,
  },
});
