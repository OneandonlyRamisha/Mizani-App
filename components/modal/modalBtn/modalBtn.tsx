import { Pressable, Text, StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../../../lib/globalStyles";
export default function ModalBtn({
  onPress,
  title,
  customStyle,
}: {
  title: string;
  onPress: () => void;
  customStyle?: {};
}) {
  return (
    <Pressable style={[styles.btnContainer, customStyle]} onPress={onPress}>
      <Text style={styles.btn}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    width: "100%",
    backgroundColor: GLOBAL_STYLES.accentColor,
    alignItems: "center",

    borderRadius: 12,
  },
  btn: {
    paddingVertical: 14,
    fontSize: 16,
    fontWeight: 700,
  },
});
