import {
  Modal,
  Text,
  View,
  StyleSheet,
  Pressable,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { BlurView } from "expo-blur";
import { GLOBAL_STYLES } from "../../lib/globalStyles";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import Slider from "@react-native-community/slider";
import { useHabits } from "../../store/habits";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Habit } from "../../types/habit";
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
  const [dif, setDif] = useState(1);
  const label = ["Easy", "Medium", "Hard"];
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState<Habit | undefined>();

  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const { habits, dispatch } = useHabits();

  const editing = editMode !== null;
  const difficultyLabels = ["Easy", "Medium", "Hard"];
  const [sliderValue, setSliderValue] = useState(1);

  useEffect(() => {
    if (editing) {
      const currectHabit = habits.find((item) => item.id === editMode);
      if (currectHabit) {
        setSelectedHabit(currectHabit);
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
    setSliderValue(1); // ✅ reset slider to "Medium" every time
  }

  function handleChangeText(field: string, value: any) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }
  const categories = ["Faith", "Health", "Discipline", "Focus", "Wisdom"];
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
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
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Habit Name</Text>
            <TextInput
              placeholder="Enter your habit..."
              style={styles.input}
              value={form.name}
              onChangeText={(data) => handleChangeText("name", data)}
              placeholderTextColor={GLOBAL_STYLES.secondaryColor}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Category</Text>
            <View style={styles.categoryContainer}>
              {categories.map((cat) => (
                <Pressable
                  key={cat}
                  style={[
                    styles.category,
                    form.category === cat ? styles.active : undefined,
                  ]}
                  onPress={() => handleChangeText("category", cat)}
                >
                  <Text style={styles.catTitle}>{cat}</Text>
                </Pressable>
              ))}
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Repeat</Text>
            <View style={styles.frequencyContainer}>
              <Pressable
                style={[
                  styles.frequency,
                  form.repeat.type === "Daily" ? styles.active : undefined,
                ]}
                onPress={() =>
                  handleChangeText("repeat", { type: "Daily", days: [] })
                }
              >
                <Text style={styles.frequncyTitle}>Daily</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.frequency,
                  form.repeat.type === "Once" ? styles.active : undefined,
                ]}
                onPress={() =>
                  handleChangeText("repeat", {
                    type: "Once",
                    days: [],
                  })
                }
              >
                <Text style={styles.frequncyTitle}>Once</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.frequency,
                  form.repeat.type === "Custom" ? styles.active : undefined,
                ]}
                onPress={() =>
                  handleChangeText("repeat", {
                    type: "Custom",
                    days: form.repeat.days || [],
                  })
                }
              >
                <Text style={styles.frequncyTitle}>Custom</Text>
              </Pressable>
            </View>
          </View>
          {form.repeat.type === "Once" && (
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Select Date</Text>

              <Pressable
                style={styles.input}
                onPress={() => setShowCalendar(true)}
              >
                <Text style={{ color: GLOBAL_STYLES.primaryColor }}>
                  {form.repeat.selectedDate || "Pick your day"}
                </Text>
              </Pressable>

              {showCalendar && (
                <DateTimePicker
                  value={selectedDate ? new Date(selectedDate) : new Date()}
                  mode="date"
                  display="default"
                  onChange={(event, date) => {
                    setShowCalendar(false);
                    if (date) {
                      const dateString = date.toISOString().split("T")[0];
                      setSelectedDate(dateString);
                      handleChangeText("repeat", {
                        type: "Once",
                        days: [],
                        selectedDate: dateString,
                      });
                    }
                  }}
                  minimumDate={new Date()}
                />
              )}
            </View>
          )}

          {form.repeat.type === "Custom" && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",

                gap: "2%",
              }}
            >
              {weekDays.map((item) => (
                <Pressable
                  style={[
                    { width: "49%" },
                    form.repeat.days.includes(item)
                      ? styles.activae
                      : undefined,
                  ]}
                  onPress={() => {
                    const days = form.repeat.days.includes(item)
                      ? form.repeat.days.filter((d) => d !== item)
                      : [...form.repeat.days, item];
                    handleChangeText("repeat", { type: "Custom", days });
                  }}
                  key={item}
                >
                  <Text
                    style={[
                      styles.customDates,
                      form.repeat.days.includes(item)
                        ? styles.active
                        : undefined,
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
          <View>
            <Text style={styles.inputTitle}>{`Difficulty (XP: +${
              sliderValue === 0 ? 10 : sliderValue === 1 ? 25 : 50
            })`}</Text>

            <Slider
              minimumValue={0}
              maximumValue={2}
              step={1}
              value={sliderValue}
              onValueChange={(val) => {
                setSliderValue(val);
                handleChangeText("difficulty", difficultyLabels[val]);
              }}
              style={{ width: "100%", marginTop: 12 }}
              minimumTrackTintColor={GLOBAL_STYLES.accentColor}
              maximumTrackTintColor={GLOBAL_STYLES.secondaryColor}
              thumbTintColor={GLOBAL_STYLES.accentColor}
            />

            <Text style={styles.inputTitle}>
              {difficultyLabels[sliderValue]}
            </Text>
          </View>
        </View>
        <View style={styles.btnsContainer}>
          <Pressable
            style={styles.btnContainer}
            onPress={!editing ? handleBtnClikc : handleUpdate}
          >
            <Text style={styles.btn}>{!editing ? "Save" : "Update"}</Text>
          </Pressable>
          {editing && (
            <Pressable
              style={[styles.btnContainer, { backgroundColor: "#EF4444" }]}
              onPress={handleDelete}
            >
              <Text style={styles.btn}>Delete</Text>
            </Pressable>
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
  text: {
    color: "red",
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
  inputContainer: {
    alignItems: "flex-start",
    gap: 10,
  },
  inputTitle: {
    fontSize: GLOBAL_STYLES.subHeader,
    color: GLOBAL_STYLES.secondaryColor,
    fontWeight: 500,
  },
  input: {
    width: "100%",
    height: 55,
    padding: 20,
    backgroundColor: GLOBAL_STYLES.progressBarBg,
    borderRadius: 8,
    color: GLOBAL_STYLES.secondaryColor,
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  category: {
    textAlign: "center",
    width: "47%",
    borderRadius: 8,
    margin: 4,
    backgroundColor: GLOBAL_STYLES.progressBarBg,
    padding: 14,
    borderColor: GLOBAL_STYLES.progressBarBg,
    borderWidth: 1,
  },
  catTitle: {
    textAlign: "center",
    color: GLOBAL_STYLES.primaryColor,
  },
  active: {
    backgroundColor: GLOBAL_STYLES.accentColor10,
    borderColor: GLOBAL_STYLES.accentColor50,
    borderWidth: 1,
  },
  frequency: {
    textAlign: "center",
    borderRadius: 8,
    margin: 4,
    backgroundColor: GLOBAL_STYLES.progressBarBg,
    paddingVertical: 14,
    paddingHorizontal: "9%",
    borderColor: GLOBAL_STYLES.progressBarBg,
    borderWidth: 1,
  },
  frequncyTitle: { textAlign: "center", color: GLOBAL_STYLES.primaryColor },
  frequencyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  btnsContainer: { marginTop: 34, marginBottom: 120, gap: 10 },
  btnContainer: {
    width: "100%",
    backgroundColor: GLOBAL_STYLES.accentColor,
    alignItems: "center",

    borderRadius: 12,
  },
  btn: {
    paddingVertical: 14,
    fontSize: 16,
    fontWeight: 700,
  },
  customDates: {
    color: GLOBAL_STYLES.primaryColor,
    borderWidth: 1,
    paddingVertical: 20,
    textAlign: "center",

    borderRadius: 12,
    backgroundColor: GLOBAL_STYLES.progressBarBg,
  },
});
