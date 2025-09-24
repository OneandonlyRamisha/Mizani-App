import { View, Text, Pressable, StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../../../../lib/globalStyles";
import { Habit } from "../../../../types/habit";

export default function RepeatCustom({
  form,
  handleChangeText,
}: {
  form: Habit;
  handleChangeText: (field: string, value: any) => void;
}) {
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <View style={styles.container}>
      {weekDays.map((item) => (
        <Pressable
          style={[{ width: "32.6%" }]}
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
              form.repeat.days.includes(item) ? styles.active : undefined,
            ]}
          >
            {item}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "1%",
  },
  customDates: {
    color: GLOBAL_STYLES.primaryColor,
    paddingVertical: 20,
    textAlign: "center",
    fontFamily: "Cinzel-Medium",
    backgroundColor: GLOBAL_STYLES.progressBarBg,
  },
  active: {
    backgroundColor: GLOBAL_STYLES.accentColor,
    color: GLOBAL_STYLES.bg,
    // borderWidth: 1,
  },
});
