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
      <Text style={styles.title}>Add New Habit</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",

    // position: "absolute",
    // zIndex: 1000,

    // width: 60,
    // height: 60,
    alignItems: "center",
    justifyContent: "center",
    // borderRadius: 10000,
    // bottom: 4,
    backgroundColor: GLOBAL_STYLES.secondaryBg,
    borderWidth: 1,
    borderColor: GLOBAL_STYLES.accentColor20,
    borderRadius: 9,
    paddingVertical: 12,
    marginTop: 20,
    // left: "50%",
    alignSelf: "center",
  },
  title: {
    fontSize: 15,

    color: GLOBAL_STYLES.accentColor75,
  },
});
