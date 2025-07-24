import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { GLOBAL_STYLES } from "../../../lib/globalStyles";
import { Profile } from "../../../types/profile";
import { useState } from "react";

export default function IntroInput({
  options,
  setForm,
  setActive,
  active,
  fieldKey,
}: {
  options?: any[];
  fieldKey: string;
  setForm: React.Dispatch<React.SetStateAction<Profile>>;
  form: Profile;
  setActive: React.Dispatch<React.SetStateAction<string | null>>;
  active: string | null;
}) {
  const [input, setInput] = useState("");

  const handleInputChange = (text: string) => {
    setInput(text);
    setForm((prev) => ({
      ...prev,
      [fieldKey]: text, // for name and age
    }));
  };

  const handleOptionPress = (option: any) => {
    const value = typeof option === "string" ? option : option.option;
    setActive(value); // 🔥 track active option
    setForm((prev) => {
      const updated = { ...prev };

      // Update name/age directly
      if (fieldKey === "name" || fieldKey === "age") {
        updated[fieldKey] = typeof option === "string" ? option : option.option;
      } else {
        // Update stat field
        const value = typeof option === "string" ? 50 : option.stat;
        updated.stats[fieldKey as keyof Profile["stats"]] = value;
      }

      return updated;
    });
  };
  return (
    <View style={styles.questionContainer}>
      {!options ? (
        <TextInput
          placeholder="Enter your name"
          style={styles.input}
          value={input}
          onChangeText={handleInputChange}
          placeholderTextColor={GLOBAL_STYLES.secondaryColor}
        />
      ) : (
        options?.map((option, index) => (
          <TouchableOpacity
            onPress={() => handleOptionPress(option)}
            style={[
              styles.optionBtn,
              active ===
                (typeof option === "string" ? option : option.option) &&
                styles.activeOptionBtn,
            ]}
            key={index}
          >
            <Text style={styles.optionsText}>
              {typeof option === "string" ? option : option.option}
            </Text>
          </TouchableOpacity>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  questionContainer: {
    width: "100%",
    marginTop: 20,
    gap: 15,
  },
  input: {
    backgroundColor: GLOBAL_STYLES.secondaryBg,
    width: "100%",
    height: 55,
    borderRadius: 8,
    paddingHorizontal: 30,
    color: GLOBAL_STYLES.primaryColor,
  },
  optionBtn: {
    backgroundColor: GLOBAL_STYLES.secondaryBg,
    width: "100%",
    paddingVertical: 14,
    borderWidth: 1,

    borderRadius: 8,
  },
  optionsText: {
    color: GLOBAL_STYLES.primaryColor,
    fontSize: 15,
    fontWeight: 500,
    paddingHorizontal: 20,
  },
  activeOptionBtn: {
    backgroundColor: GLOBAL_STYLES.accentColor20,
    borderColor: GLOBAL_STYLES.accentColor50,
    borderWidth: 1,
  },
});
