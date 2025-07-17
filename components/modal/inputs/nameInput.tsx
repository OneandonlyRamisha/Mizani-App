import { View, Text, TextInput, StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../../../lib/globalStyles";

export default function NameInput({
  form,
  handleChangeText,
}: {
  form: { name: string };
  handleChangeText: (field: string, value: any) => void;
}) {
  return (
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
  input: {
    width: "100%",
    height: 55,
    padding: 20,
    backgroundColor: GLOBAL_STYLES.progressBarBg,
    borderRadius: 8,
    color: GLOBAL_STYLES.secondaryColor,
  },
});
