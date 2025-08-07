import { Pressable, Text, StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../../lib/globalStyles";

export default function AddHabitBtn({
  setModalVisible,
}: {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  function handleClick() {
    setModalVisible((prev) => !prev);
  }
  return (
    <Pressable style={styles.container} onPress={handleClick}>
      <Text style={styles.title}>+</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 35,
    height: 35,
    borderRadius: 17.5, // half of width/height = perfect circle
    backgroundColor: GLOBAL_STYLES.secondaryBg,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: GLOBAL_STYLES.accentColor20,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    color: GLOBAL_STYLES.accentColor75,
    textAlign: "center",
    textAlignVertical: "center", // for Android
  },
});
