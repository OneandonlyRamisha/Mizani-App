import React from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { GLOBAL_STYLES } from "../../../../lib/globalStyles";
export default function RepeatOnce({
  showCalendar,
  setShowCalendar,
  form,
  selectedDate,
  setSelectedDate,
  handleChangeText,
}: {
  showCalendar: boolean;
  setShowCalendar: React.Dispatch<React.SetStateAction<boolean>>;
  form: {};
  selectedDate: string | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<string | null>>;
  handleChangeText: (field: string, value: any) => void;
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputTitle}>Select Date</Text>

      <Pressable style={styles.input} onPress={() => setShowCalendar(true)}>
        <Text style={{ color: GLOBAL_STYLES.primaryColor }}>
          {form.repeat.selectedDate || "Pick your day"}
        </Text>
      </Pressable>

      {showCalendar && (
        <DateTimePicker
          value={selectedDate ? new Date(selectedDate) : new Date()}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowCalendar(false);
            if (date) {
              const dateString = date.toISOString().split("T")[0];
              setSelectedDate(dateString);
              handleChangeText("repeat", {
                type: "Once",
                days: [],
                selectedDate: dateString,
              });
            }
          }}
          minimumDate={new Date()}
        />
      )}
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
  input: {
    width: "100%",
    padding: 20,
    backgroundColor: GLOBAL_STYLES.progressBarBg,
    borderRadius: 12,
    color: GLOBAL_STYLES.secondaryColor,
  },
});
