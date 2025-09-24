import { View, Pressable, Text, StyleSheet, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { GLOBAL_STYLES } from "../../../lib/globalStyles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
export default function ModalHeader({
  handleClick,
}: {
  handleClick: () => void;
}) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Image
            source={require("../../../assets/modalIcon.png")}
            style={styles.image}
          />
        </View>
        <Text style={styles.title}>Create New Habit</Text>
      </View>
      <Pressable style={styles.btn} onPress={handleClick}>
        <AntDesign name="close" size={20} color={GLOBAL_STYLES.primaryColor} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "center",
    borderBottomColor: GLOBAL_STYLES.secondaryColor,
    paddingBottom: 35,
    borderBottomWidth: 1,
  },
  header: {
    gap: 15,
    alignItems: "center",
  },

  image: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 24,
    fontFamily: "Cinzel-Semi-Bold",
    // fontWeight: 700,
    color: GLOBAL_STYLES.accentColor,
  },
  btn: {
    position: "absolute",
    right: 0,
  },
  iconContainer: {
    padding: 12,
    borderRadius: "50%",
    borderWidth: 2,
    borderColor: GLOBAL_STYLES.accentColor50,
  },
});
