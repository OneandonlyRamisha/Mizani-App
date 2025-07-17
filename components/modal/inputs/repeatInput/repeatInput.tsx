import { View, Pressable, Text, StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../../../../lib/globalStyles";

export default function RepeatInput({
  form,
  handleChangeText,
}: {
  form: { repeat: { type: string; days: string[] } };
  handleChangeText: (field: string, value: any) => void;
}) {
  const FREQUENCY_REPEAT = ["Daily", "Once", "Custom"];
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
            onPress={() => handleChangeText("repeat", { type: freq, days: [] })}
          >
            <Text style={styles.frequencyTitle}>{freq}</Text>
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
    color: GLOBAL_STYLES.secondaryColor,
    fontWeight: 500,
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
  frequencyTitle: { textAlign: "center", color: GLOBAL_STYLES.primaryColor },
  frequencyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  active: {
    backgroundColor: GLOBAL_STYLES.accentColor10,
    borderColor: GLOBAL_STYLES.accentColor50,
    borderWidth: 1,
  },
});
