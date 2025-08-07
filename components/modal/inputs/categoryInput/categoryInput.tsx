import { View, Text, StyleSheet, Platform } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { GLOBAL_STYLES } from "../../../../lib/globalStyles";

export default function CategoryInput({
  handleChangeText,
  form,
}: {
  handleChangeText: (field: string, value: any) => void;
  form: { category: string };
}) {
  const categories = [
    "Faith",
    "Fitness",
    "Discipline",
    "Focus",
    "Wisdom",
    "Finance",
  ];

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputTitle}>Category</Text>

      {/* Wrapper ensures full width */}
      <View style={styles.dropdownWrapper}>
        <RNPickerSelect
          // dropdownItemStyle

          onValueChange={(value) => handleChangeText("category", value)}
          items={categories.map((cat) => ({ label: cat, value: cat }))}
          value={form.category}
          placeholder={{}} // ✅ No placeholder text at all
          style={{
            inputIOS: {
              ...styles.dropdownBase,
              fontFamily: "Cinzel-Medium",
            },
            inputAndroid: {
              ...styles.dropdownBase,
              fontFamily: "Cinzel-Medium",
              textAlignVertical: "center",
            },
            iconContainer: {
              top: Platform.OS === "android" ? 18 : 15,
              right: 15,
            },
          }}
          useNativeAndroidPickerStyle={false}
          Icon={() => (
            <Text style={{ color: GLOBAL_STYLES.accentColor50, fontSize: 18 }}>
              ▼
            </Text>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: "flex-start",
    gap: 10,
    width: "100%", // ✅ ensures children can be 100% wide
  },
  inputTitle: {
    fontSize: GLOBAL_STYLES.subHeader,
    color: GLOBAL_STYLES.primaryColor,
    fontFamily: "Cinzel-Medium",
  },
  dropdownWrapper: {
    width: "100%", // ✅ makes RNPickerSelect fill space
  },
  dropdownBase: {
    width: "100%",
    backgroundColor: GLOBAL_STYLES.card,
    borderWidth: 1,
    borderColor: "#333",
    paddingVertical: 20,
    paddingHorizontal: 20,
    color: GLOBAL_STYLES.secondaryColor,
    fontSize: 14,
  },
});
