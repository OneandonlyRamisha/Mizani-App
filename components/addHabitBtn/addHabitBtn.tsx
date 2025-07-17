import { LinearGradient } from "expo-linear-gradient";
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
    position: "absolute",
    zIndex: 1000,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10000,
    bottom: 4,
    backgroundColor: GLOBAL_STYLES.accentColor50,
    // left: "50%",
    alignSelf: "center",
  },
  title: {
    fontSize: 37,

    color: GLOBAL_STYLES.accentColor,
  },
});
