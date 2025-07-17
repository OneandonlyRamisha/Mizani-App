import { GLOBAL_STYLES } from "../../../lib/globalStyles";
import { StyleSheet, Text } from "react-native";
export default function DifficultyComponent({
  difficulty,
}: {
  difficulty: string;
}) {
  let difColor = "";

  if (difficulty === "Easy") {
    difColor = GLOBAL_STYLES.green;
  } else if (difficulty === "Medium") {
    difColor = GLOBAL_STYLES.accentColor;
  } else if (difficulty === "Hard") {
    difColor = GLOBAL_STYLES.red;
  } else {
    difColor = GLOBAL_STYLES.primaryColor;
  }
  return (
    <Text
      style={[styles.difContainer, { borderColor: difColor, color: difColor }]}
    >
      {difficulty}
    </Text>
  );
}

const styles = StyleSheet.create({
  difContainer: {
    borderRadius: 10000,
    borderWidth: 1,
    paddingVertical: 3,
    paddingHorizontal: 12,
    fontSize: GLOBAL_STYLES.element,
  },
});
