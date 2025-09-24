import { View, Pressable, Text, StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../../../../lib/globalStyles";
import { Habit, HabitRepeat } from "../../../../types/habit";

export default function RepeatInput({
  form,
  handleChangeText,
}: {
  form: Pick<Habit, "repeat">;
  handleChangeText: <K extends keyof Habit>(field: K, value: Habit[K]) => void;
}) {
  const FREQUENCY_REPEAT: HabitRepeat["type"][] = [
    "Daily",
    "Once",
    "Custom",
  ];

  const handleFrequencyPress = (frequency: HabitRepeat["type"]) => {
    switch (frequency) {
      case "Once":
        handleChangeText("repeat", {
          type: "Once",
          days: [],
          selectedDate:
            form.repeat.type === "Once" ? form.repeat.selectedDate : undefined,
        });
        break;
      case "Custom":
        handleChangeText("repeat", { type: "Custom", days: [] });
        break;
      default:
        handleChangeText("repeat", { type: "Daily", days: [] });
        break;
    }
  };
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputTitle}>Repeat</Text>
      <View style={styles.frequencyContainer}>
        {FREQUENCY_REPEAT.map((freq) => (
          <Pressable
            key={freq}
            style={[
              styles.frequency,
              form.repeat.type === freq ? styles.active : undefined,
            ]}
            onPress={() => handleFrequencyPress(freq)}
          >
            <Text
              style={[
                styles.frequencyTitle,
                {
                  color:
                    form.repeat.type === freq
                      ? GLOBAL_STYLES.bg
                      : GLOBAL_STYLES.primaryColor,
                },
              ]}
            >
              {freq}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: "flex-start",
    gap: 10,
  },
  inputTitle: {
    fontSize: GLOBAL_STYLES.subHeader,
    color: GLOBAL_STYLES.primaryColor,
    // fontWeight: 500,
    fontFamily: "Cinzel-Medium",
  },
  frequency: {
    textAlign: "center",
    borderRadius: 1008,
    width: "32%",
    marginVertical: 4,
    backgroundColor: GLOBAL_STYLES.progressBarBg,
    paddingVertical: 9,

    // paddingHorizontal: "9%",
    borderColor: GLOBAL_STYLES.progressBarBg,
    borderWidth: 1,
  },
  frequencyTitle: {
    textAlign: "center",
    color: GLOBAL_STYLES.primaryColor,
    fontFamily: "Cinzel-Medium",
  },
  frequencyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  active: {
    backgroundColor: GLOBAL_STYLES.accentColor,
    borderColor: GLOBAL_STYLES.accentColor50,
    borderWidth: 1,
  },
});
