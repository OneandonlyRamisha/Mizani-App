import { View, Text, StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../../../lib/globalStyles";

export default function QuestionHeader({ question }: { question: string }) {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.header}>{question}</Text>
      <Text style={styles.subHeader}>
        We'll use this to personalize your experience
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    gap: 20,
    marginTop: 20,
  },
  header: {
    fontSize: 24,
    color: GLOBAL_STYLES.primaryColor,
    fontWeight: 600,
    textAlign: "center",
  },
  subHeader: {
    color: GLOBAL_STYLES.secondaryColor,
    fontSize: 16,
    textAlign: "center",
  },
});
