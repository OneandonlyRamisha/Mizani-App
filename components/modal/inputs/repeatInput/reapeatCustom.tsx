import { View, Text, Pressable, StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../../../../lib/globalStyles";

export default function RepeatCustom({
  form,
  handleChangeText,
}: {
  form: {};
  handleChangeText: (field: string, value: any) => void;
}) {
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <View style={styles.container}>
      {weekDays.map((item) => (
        <Pressable
          style={[{ width: "49%" }]}
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
    gap: "2%",
  },
  customDates: {
    color: GLOBAL_STYLES.primaryColor,
    borderWidth: 1,
    paddingVertical: 20,
    textAlign: "center",

    borderRadius: 12,
    backgroundColor: GLOBAL_STYLES.progressBarBg,
  },
  active: {
    backgroundColor: GLOBAL_STYLES.accentColor10,
    borderColor: GLOBAL_STYLES.accentColor50,
    borderWidth: 1,
  },
});
