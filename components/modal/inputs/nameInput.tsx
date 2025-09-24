import { View, Text, TextInput, StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../../../lib/globalStyles";
import { Habit } from "../../../types/habit";

type Props = {
  form: Pick<Habit, "name">;
  handleChangeText: <K extends keyof Habit>(field: K, value: Habit[K]) => void;
};

export default function NameInput({ form, handleChangeText }: Props) {
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
    color: GLOBAL_STYLES.primaryColor,
    fontFamily: "Cinzel-Medium",
  },
  input: {
    width: "100%",
    // height: 55,
    padding: 20,
    backgroundColor: GLOBAL_STYLES.card,
    borderWidth: 1,
    borderColor: "#333",

    color: GLOBAL_STYLES.secondaryColor,
    fontSize: 14,
    fontFamily: "Cinzel-Regular",
  },
});
