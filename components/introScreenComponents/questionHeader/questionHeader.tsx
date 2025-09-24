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
    gap: 5,
  },
  header: {
    fontSize: 24,
    fontFamily: "Cinzel-Semi-Bold",
    color: GLOBAL_STYLES.primaryColor,

    textAlign: "center",
  },
  subHeader: {
    color: GLOBAL_STYLES.secondaryColor,
    fontSize: 14,
    fontFamily: "Cinzel-Medium",
    textAlign: "center",
  },
});
