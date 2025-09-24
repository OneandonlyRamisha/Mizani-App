import { AntDesign } from "@expo/vector-icons";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Pressable,
} from "react-native";
import { GLOBAL_STYLES } from "../../../lib/globalStyles";

export default function NextBtn({
  onPress,
  selected,
}: {
  onPress: () => void;
  selected?: boolean;
}) {
  return (
    <Pressable
      style={[styles.btn, selected ? styles.activeContainer : null]}
      onPress={selected ? onPress : () => {}}
    >
      <Text style={[styles.btnText, selected ? styles.activeText : null]}>
        Continue
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderWidth: 1,
    borderColor: GLOBAL_STYLES.progressBarBg,
    padding: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: GLOBAL_STYLES.secondaryColor,
    fontSize: 18,
    fontFamily: "Cinzel-Medium",
  },
  activeContainer: {
    borderColor: GLOBAL_STYLES.accentColor20,
    backgroundColor: GLOBAL_STYLES.card,
  },
  activeText: {
    color: GLOBAL_STYLES.accentColor75,
  },
});
