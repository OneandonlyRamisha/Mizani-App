import { View, Pressable, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { GLOBAL_STYLES } from "../../../lib/globalStyles";
export default function ModalHeader({
  handleClick,
}: {
  handleClick: () => void;
}) {
  return (
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
  );
}

const styles = StyleSheet.create({
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
});
