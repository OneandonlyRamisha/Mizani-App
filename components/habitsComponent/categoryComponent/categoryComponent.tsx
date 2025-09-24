import { GLOBAL_STYLES } from "../../../lib/globalStyles";
import { ColorValue, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
export default function CategoryComponent({ category }: { category: string }) {
  let categoryBg: string[] = [];
  let categoryColor: string = "";

  if (category === "Faith") {
    categoryBg = GLOBAL_STYLES.faithCardBgColor;
    categoryColor = GLOBAL_STYLES.red;
  } else if (category === "Discipline") {
    categoryBg = GLOBAL_STYLES.disciplineCardBgColor;
    categoryColor = GLOBAL_STYLES.orange;
  } else if (category === "Focus") {
    categoryBg = GLOBAL_STYLES.focusCardBgColor;
    categoryColor = GLOBAL_STYLES.blue;
  } else if (category === "Fitness") {
    categoryBg = GLOBAL_STYLES.fitnessCardBgColor;
    categoryColor = GLOBAL_STYLES.green;
  } else if (category === "Wisdom") {
    categoryBg = GLOBAL_STYLES.wisdomCardBgColor;
    categoryColor = GLOBAL_STYLES.purple;
  } else {
    categoryBg = [GLOBAL_STYLES.card, GLOBAL_STYLES.card];
    categoryColor = GLOBAL_STYLES.primaryColor;
  }

  return (
    <LinearGradient
      style={styles.catContainer}
      colors={categoryBg as [ColorValue, ColorValue]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <Text style={[styles.category, { color: categoryColor }]}>
        {category}
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  catContainer: {
    borderRadius: 10000,
    paddingVertical: 3,
    paddingHorizontal: 12,
  },
  category: {
    // paddingVertical: 4,
    // paddingHorizontal: 9,
    fontSize: GLOBAL_STYLES.element,
  },
});
