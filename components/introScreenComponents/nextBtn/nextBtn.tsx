import { AntDesign } from "@expo/vector-icons";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { GLOBAL_STYLES } from "../../../lib/globalStyles";

export default function NextBtn({
  onPress,
  customStyles,
}: {
  onPress: () => void;
  customStyles?: StyleProp<ViewStyle>;
}) {
  return (
    <TouchableOpacity style={[styles.btn, customStyles]} onPress={onPress}>
      <Text style={styles.btnText}>Continue</Text>
      <AntDesign
        name="arrowright"
        size={24}
        color={GLOBAL_STYLES.primaryColor}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: GLOBAL_STYLES.accentColor75,
    flexDirection: "row",
    gap: 10,
    padding: 12,
    width: "100%",
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: GLOBAL_STYLES.primaryColor,
    fontSize: 18,
    fontWeight: 600,
  },
});
