import { View, Text, Pressable, StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../../../../lib/globalStyles";

export default function CategoryInput({
  handleChangeText,
  form,
}: {
  handleChangeText: (field: string, value: any) => void;
  form: { category: string };
}) {
  const categories = ["Faith", "Health", "Discipline", "Focus", "Wisdom"];

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputTitle}>Category</Text>
      <View style={styles.categoryContainer}>
        {categories.map((cat) => (
          <Pressable
            key={cat}
            style={[
              styles.category,
              form.category === cat ? styles.active : undefined,
            ]}
            onPress={() => handleChangeText("category", cat)}
          >
            <Text style={styles.catTitle}>{cat}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: "flex-start",
    gap: 10,
  },
  inputTitle: {
    fontSize: GLOBAL_STYLES.subHeader,
    color: GLOBAL_STYLES.secondaryColor,
    fontWeight: 500,
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  category: {
    textAlign: "center",
    width: "47%",
    borderRadius: 8,
    margin: 4,
    backgroundColor: GLOBAL_STYLES.progressBarBg,
    padding: 14,
    borderColor: GLOBAL_STYLES.progressBarBg,
    borderWidth: 1,
  },
  catTitle: {
    textAlign: "center",
    color: GLOBAL_STYLES.primaryColor,
  },
  active: {
    backgroundColor: GLOBAL_STYLES.accentColor10,
    borderColor: GLOBAL_STYLES.accentColor50,
    borderWidth: 1,
  },
});
